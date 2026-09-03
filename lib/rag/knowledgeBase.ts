import { PORTFOLIO_DATA } from "@/constants/data";
import { TECH_CATEGORIES } from "@/constants/skills";

export interface KnowledgeChunk {
  id: string;
  category: "bio" | "project" | "skill" | "experience" | "contact" | "system";
  title: string;
  content: string;
  keywords: string[];
  windowId: "about" | "skills" | "projects" | "experience" | "contact" | "resume" | "terminal";
  targetId?: string; // ID for scrolling / focusing element
  actionLabel: string;
}

export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  // Bio & Personal
  {
    id: "bio-general",
    category: "bio",
    title: "About Akshay Singh Thakur",
    content: `${PORTFOLIO_DATA.personal.name} is a ${PORTFOLIO_DATA.personal.title} based in ${PORTFOLIO_DATA.personal.location}. ${PORTFOLIO_DATA.personal.bio.join(" ")} Specializing in: ${PORTFOLIO_DATA.personal.subtitle}.`,
    keywords: ["who is akshay", "bio", "about", "developer", "experience", "location", "india", "himachal pradesh", "background", "summary", "full stack", "mern"],
    windowId: "about",
    targetId: "about-bio",
    actionLabel: "Open About Me",
  },
  {
    id: "bio-stats",
    category: "bio",
    title: "Stats & Metrics",
    content: `Akshay has completed 5+ projects, 1 software development internship at Worisgo, and earned 3 technical certifications.`,
    keywords: ["stats", "metrics", "projects completed", "internship", "certifications", "achievements", "numbers"],
    windowId: "about",
    targetId: "about-stats",
    actionLabel: "View Stats in About Me",
  },

  // Projects
  ...PORTFOLIO_DATA.projects.map((proj) => ({
    id: `project-${proj.id}`,
    category: "project" as const,
    title: `Project: ${proj.title}`,
    content: `Project Title: ${proj.title}. Category: ${proj.category}. Overview: ${proj.description} In-Depth Details: ${proj.fullDescription || ""} ${proj.challenge ? `Challenge faced: ${proj.challenge}.` : ""} ${proj.solution ? `Solution: ${proj.solution}.` : ""} Key Features: ${proj.features?.join(", ") || ""}. Tech Stack used: ${proj.techStack?.join(", ") || ""}. GitHub: ${proj.githubUrl || ""}. Live Demo: ${proj.liveUrl || ""}.`,
    keywords: [
      proj.title.toLowerCase(),
      proj.category.toLowerCase(),
      ...(proj.techStack || []).map((t) => t.toLowerCase()),
      ...(proj.features || []).map((f) => f.toLowerCase()),
      "project",
      "portfolio project",
      "code",
      "demo",
      "github",
      "app"
    ],
    windowId: "projects" as const,
    targetId: proj.id,
    actionLabel: `Open ${proj.title} in Projects Explorer`,
  })),

  // Skills
  ...TECH_CATEGORIES.map((cat, idx) => ({
    id: `skill-cat-${idx}`,
    category: "skill" as const,
    title: `Skills: ${cat.title}`,
    content: `Category: ${cat.title}. Technologies & Tools mastered: ${cat.items.map((i) => i.name).join(", ")}.`,
    keywords: [
      cat.title.toLowerCase(),
      ...cat.items.map((i) => i.name.toLowerCase()),
      "skills",
      "technologies",
      "languages",
      "frameworks",
      "tech stack"
    ],
    windowId: "skills" as const,
    targetId: `cat-${cat.title.replace(/\s+/g, "-").toLowerCase()}`,
    actionLabel: `Open ${cat.title} in Skills Explorer`,
  })),

  // Experience
  ...PORTFOLIO_DATA.experience.map((exp) => ({
    id: `exp-${exp.id}`,
    category: "experience" as const,
    title: `Experience: ${exp.role} at ${exp.company}`,
    content: `Role: ${exp.role} at ${exp.company} (${exp.period}), Location: ${exp.location || "Remote"}. Description: ${exp.description}. Key Achievements & Responsibilities: ${exp.achievements?.join("; ") || ""}. Tech Stack: ${exp.techStack?.join(", ") || ""}.`,
    keywords: [
      exp.role.toLowerCase(),
      exp.company.toLowerCase(),
      "internship",
      "experience",
      "job",
      "work history",
      "career",
      ...(exp.techStack || []).map((t) => t.toLowerCase()),
      ...(exp.achievements || []).map((a) => a.toLowerCase()),
    ],
    windowId: "experience" as const,
    targetId: exp.id,
    actionLabel: `Open Experience Log (${exp.company})`,
  })),

  // Contact & Socials
  {
    id: "contact-info",
    category: "contact",
    title: "Contact & Communication Channels",
    content: `You can contact Akshay Singh Thakur directly via the Contact/Mail form, or via Email: akshaysinghthakur0004@gmail.com. GitHub: ${PORTFOLIO_DATA.socials.find((s) => s.name === "GitHub")?.url || "https://github.com/Thakur-Akshay04"}. LinkedIn: ${PORTFOLIO_DATA.socials.find((s) => s.name === "LinkedIn")?.url || "https://www.linkedin.com/in/akshaythakur04/"}.`,
    keywords: ["contact", "email", "hire", "reach out", "send message", "linkedin", "github", "socials", "phone", "location", "connect", "mail"],
    windowId: "contact",
    targetId: "contact-form",
    actionLabel: "Open Mail / Contact Window",
  },

  // Resume
  {
    id: "resume-doc",
    category: "bio",
    title: "Resume / Curriculum Vitae",
    content: `Akshay Singh Thakur's Resume / CV includes full-stack web development projects (Luminote, AI Resume Tailor, CredVault), skills in React, Next.js, Node.js, FastAPI, PostgreSQL, and software development internship experience at Worisgo.`,
    keywords: ["resume", "cv", "curriculum vitae", "download resume", "pdf", "qualifications", "hire akshay"],
    windowId: "resume",
    targetId: "resume-preview",
    actionLabel: "Preview / Download Resume",
  },

  // Terminal & CLI
  {
    id: "terminal-cli",
    category: "system",
    title: "Interactive Windows Command Prompt / Terminal",
    content: `Run interactive CLI commands to inspect Akshay's portfolio: 'help', 'about', 'skills', 'projects', 'contact', 'matrix', 'clear', 'sudo'.`,
    keywords: ["terminal", "cmd", "powershell", "cli", "command prompt", "bash", "console", "easter egg"],
    windowId: "terminal",
    targetId: "terminal-input",
    actionLabel: "Open Terminal Prompt",
  },
];
