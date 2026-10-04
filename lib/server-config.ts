import { getCloudflareContext } from "@opennextjs/cloudflare";

export interface ResolvedConfig {
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
}

// Clean strings: removes surrounding quotes, whitespace, newlines
function clean(val: unknown): string {
  if (typeof val !== "string") return "";
  return val.trim().replace(/^["']|["']$/g, "").trim();
}

function resolveGithubUrl(raw: string): string {
  const cleaned = clean(raw);
  if (!cleaned) return "";
  if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) return cleaned;
  if (cleaned.startsWith("github.com/")) return `https://${cleaned}`;
  return `https://github.com/${cleaned.replace(/^@/, "")}`;
}

function resolveLinkedinUrl(raw: string): string {
  const cleaned = clean(raw);
  if (!cleaned) return "";
  if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) return cleaned;
  if (cleaned.startsWith("linkedin.com/")) return `https://${cleaned}`;
  if (cleaned.startsWith("in/")) return `https://linkedin.com/${cleaned}`;
  return `https://linkedin.com/in/${cleaned}`;
}

function resolveResumeUrl(raw: string): string {
  const cleaned = clean(raw);
  if (!cleaned) return "";
  if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) return cleaned;
  return `https://${cleaned}`;
}

function resolveEmail(raw: string): string {
  const cleaned = clean(raw);
  if (!cleaned) return "";
  const withoutMailto = cleaned.replace(/^mailto:/i, "").trim();
  if (withoutMailto.includes("@")) return withoutMailto;
  return "";
}

/**
 * Collects all environment variables and secrets available in the runtime,
 * merging Cloudflare Worker bindings (env) and process.env.
 */
export async function getAllEnv(): Promise<Record<string, string>> {
  const allEnv: Record<string, string> = {};

  // 1. Check process.env
  if (typeof process !== "undefined" && process.env) {
    for (const [k, v] of Object.entries(process.env)) {
      if (typeof v === "string" && v.trim().length > 0) {
        allEnv[k] = clean(v);
      }
    }
  }

  // 2. Check globalThis symbols and standard bindings objects
  const globalAny = globalThis as any;
  if (globalAny) {
    const symbolKey = Symbol.for("__cloudflare-context__");
    if (globalAny[symbolKey]?.env && typeof globalAny[symbolKey].env === "object") {
      for (const [k, v] of Object.entries(globalAny[symbolKey].env)) {
        if (typeof v === "string" && v.trim().length > 0) {
          allEnv[k] = clean(v);
        }
      }
    }
    if (globalAny.env && typeof globalAny.env === "object") {
      for (const [k, v] of Object.entries(globalAny.env)) {
        if (typeof v === "string" && v.trim().length > 0) {
          allEnv[k] = clean(v);
        }
      }
    }
    if (globalAny.__env__ && typeof globalAny.__env__ === "object") {
      for (const [k, v] of Object.entries(globalAny.__env__)) {
        if (typeof v === "string" && v.trim().length > 0) {
          allEnv[k] = clean(v);
        }
      }
    }
  }

  // 3. Check OpenNext Cloudflare Context (Async)
  try {
    const ctx = await getCloudflareContext({ async: true });
    if (ctx?.env && typeof ctx.env === "object") {
      for (const [k, v] of Object.entries(ctx.env)) {
        if (typeof v === "string" && v.trim().length > 0) {
          allEnv[k] = clean(v);
        }
      }
    }
  } catch {
    // Non-worker environment or dev fallback
  }

  // 4. Check OpenNext Cloudflare Context (Sync)
  try {
    const ctxSync = getCloudflareContext({ async: false });
    if (ctxSync?.env && typeof ctxSync.env === "object") {
      for (const [k, v] of Object.entries(ctxSync.env)) {
        if (typeof v === "string" && v.trim().length > 0) {
          allEnv[k] = clean(v);
        }
      }
    }
  } catch {
    // Expected in SSG or unsupported contexts
  }

  return allEnv;
}

/**
 * Searches for a value matching priority keys, case-insensitive variants,
 * or a fallback predicate against all available runtime keys.
 */
function findValue(
  envMap: Record<string, string>,
  priorityKeys: string[],
  predicate: (normalizedKey: string, val: string) => boolean
): string {
  // 1. Exact priority keys
  for (const key of priorityKeys) {
    if (envMap[key] && envMap[key].length > 0) {
      return envMap[key];
    }
  }

  // 2. Case-insensitive & normalized priority keys
  const lowerMap = new Map<string, string>();
  for (const [k, v] of Object.entries(envMap)) {
    lowerMap.set(k.toLowerCase().replace(/[-_]/g, ""), v);
  }

  for (const key of priorityKeys) {
    const norm = key.toLowerCase().replace(/[-_]/g, "");
    const val = lowerMap.get(norm);
    if (val && val.length > 0) {
      return val;
    }
  }

  // 3. Dynamic scan across all keys with predicate
  for (const [k, v] of Object.entries(envMap)) {
    const norm = k.toLowerCase().replace(/[-_]/g, "");
    if (predicate(norm, v) && v.length > 0) {
      return v;
    }
  }

  return "";
}

/**
 * Resolves the configuration dynamically from Cloudflare Worker settings / secrets.
 * Zero hardcoding.
 */
export async function getResolvedConfig(): Promise<ResolvedConfig> {
  const envMap = await getAllEnv();

  // 1. Email Resolution
  const rawEmail = findValue(
    envMap,
    [
      "NEXT_PUBLIC_PERSONAL_EMAIL",
      "PERSONAL_EMAIL",
      "NEXT_PUBLIC_EMAIL",
      "EMAIL",
      "CONTACT_EMAIL",
      "MY_EMAIL",
      "USER_EMAIL",
      "TO_EMAIL",
      "RECIPIENT_EMAIL",
      "MAIL",
      "MAILTO",
      "NEXT_PUBLIC_MAIL",
    ],
    (norm, val) =>
      (norm.includes("email") || norm.includes("mail") || norm.includes("personal")) &&
      !norm.includes("resend") &&
      !norm.includes("from") &&
      !norm.includes("sender") &&
      !norm.includes("service") &&
      val.includes("@")
  );
  const email = resolveEmail(rawEmail);

  // 2. GitHub Resolution
  const rawGithub = findValue(
    envMap,
    [
      "NEXT_PUBLIC_GITHUB_URL",
      "GITHUB_URL",
      "NEXT_PUBLIC_GITHUB",
      "GITHUB",
      "GITHUB_LINK",
      "GITHUB_URI",
      "GITHUB_PROFILE",
      "GITHUB_PROFILE_URL",
      "GITHUB_USERNAME",
      "GITHUB_USER",
      "GITHUB_ID",
      "GH_URL",
      "GH_LINK",
      "GH",
      "GIT_URL",
      "GIT",
    ],
    (norm, val) =>
      norm.includes("github") ||
      norm === "gh" ||
      norm.startsWith("ghurl") ||
      norm.startsWith("ghlink") ||
      val.includes("github.com")
  );
  const githubUrl = resolveGithubUrl(rawGithub);

  // 3. LinkedIn Resolution
  const rawLinkedin = findValue(
    envMap,
    [
      "NEXT_PUBLIC_LINKEDIN_URL",
      "LINKEDIN_URL",
      "NEXT_PUBLIC_LINKEDIN",
      "LINKEDIN",
      "LINKEDIN_LINK",
      "LINKEDIN_URI",
      "LINKEDIN_PROFILE",
      "LINKEDIN_PROFILE_URL",
      "LINKEDIN_USERNAME",
      "LINKEDIN_USER",
      "LINKEDIN_ID",
      "LI_URL",
      "LI_LINK",
      "LI",
    ],
    (norm, val) =>
      norm.includes("linkedin") ||
      norm === "li" ||
      norm.startsWith("liurl") ||
      norm.startsWith("lilink") ||
      val.includes("linkedin.com")
  );
  const linkedinUrl = resolveLinkedinUrl(rawLinkedin);

  // 4. Resume Resolution
  const rawResume = findValue(
    envMap,
    [
      "NEXT_PUBLIC_RESUME_URL",
      "RESUME_URL",
      "NEXT_PUBLIC_RESUME",
      "RESUME",
      "NEXT_PUBLIC_RESUME_LINK",
      "RESUME_LINK",
      "RESUME_URI",
      "CV_URL",
      "CV",
      "CV_LINK",
      "MY_RESUME",
      "MY_CV",
      "DRIVE_RESUME",
      "GOOGLE_DRIVE_RESUME",
      "RESUME_PDF",
      "PDF_RESUME",
    ],
    (norm, val) =>
      norm.includes("resume") ||
      norm === "cv" ||
      norm.startsWith("cv") ||
      norm.endsWith("cv") ||
      val.includes("drive.google.com") ||
      val.endsWith(".pdf")
  );
  const resumeUrl = resolveResumeUrl(rawResume);

  return {
    email,
    githubUrl,
    linkedinUrl,
    resumeUrl,
  };
}
