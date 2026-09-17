"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { useSafeReducedMotion } from "@/lib/hooks";
import { PORTFOLIO_DATA } from "@/constants/data";

const QUICK_LINKS = [
  {
    title: "Projects",
    subtitle: "Full-stack apps & systems",
    href: "/projects",
  },
  {
    title: "About",
    subtitle: "Background & journey",
    href: "/about",
  },
  {
    title: "Skills",
    subtitle: "Stack, tools & databases",
    href: "/skills",
  },
  {
    title: "Experience",
    subtitle: "Worisgo internship & impact",
    href: "/experience",
  },
];

export default function Hero() {
  const shouldReduceMotion = useSafeReducedMotion();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [emailAddress, setEmailAddress] = useState(
    PORTFOLIO_DATA.personal.email || ""
  );
  const [githubUrl, setGithubUrl] = useState(
    (process.env.NEXT_PUBLIC_GITHUB_URL || "").trim()
  );
  const [linkedinUrl, setLinkedinUrl] = useState(
    (process.env.NEXT_PUBLIC_LINKEDIN_URL || "").trim()
  );
  const [resumeUrl, setResumeUrl] = useState(
    (process.env.NEXT_PUBLIC_RESUME_URL || "").trim()
  );

  useEffect(() => {
    fetch("/api/config")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          if (data.email) setEmailAddress(data.email.trim());
          if (data.githubUrl) setGithubUrl(data.githubUrl.trim());
          if (data.linkedinUrl) setLinkedinUrl(data.linkedinUrl.trim());
          if (data.resumeUrl) setResumeUrl(data.resumeUrl.trim());
        }
      })
      .catch(() => {});
  }, []);

  const rawResumeUrl = (resumeUrl || "").trim();
  const normalizedResumeUrl = rawResumeUrl
    ? rawResumeUrl.startsWith("http://") || rawResumeUrl.startsWith("https://")
      ? rawResumeUrl
      : `https://${rawResumeUrl}`
    : "";
  const hasValidResumeUrl = Boolean(
    normalizedResumeUrl &&
      (normalizedResumeUrl.startsWith("http://") ||
        normalizedResumeUrl.startsWith("https://"))
  );

  const rawGithubUrl = (githubUrl || "").trim();
  const normalizedGithubUrl = rawGithubUrl
    ? rawGithubUrl.startsWith("http://") || rawGithubUrl.startsWith("https://")
      ? rawGithubUrl
      : `https://${rawGithubUrl}`
    : "";
  const hasValidGithubUrl = Boolean(
    normalizedGithubUrl &&
      (normalizedGithubUrl.startsWith("http://") ||
        normalizedGithubUrl.startsWith("https://"))
  );

  const rawLinkedinUrl = (linkedinUrl || "").trim();
  const normalizedLinkedinUrl = rawLinkedinUrl
    ? rawLinkedinUrl.startsWith("http://") || rawLinkedinUrl.startsWith("https://")
      ? rawLinkedinUrl
      : `https://${rawLinkedinUrl}`
    : "";
  const hasValidLinkedinUrl = Boolean(
    normalizedLinkedinUrl &&
      (normalizedLinkedinUrl.startsWith("http://") ||
        normalizedLinkedinUrl.startsWith("https://"))
  );

  const hasValidEmail = Boolean(emailAddress && emailAddress.includes("@"));

  const handleCopyEmail = () => {
    if (!hasValidEmail) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(emailAddress);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <section className="w-full max-w-3xl mx-auto px-6 sm:px-8 pt-28 sm:pt-36 pb-20 flex flex-col items-start">
      {/* Location & Status Line */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2.5 text-xs font-mono text-neutral-400 uppercase tracking-wider mb-6"
      >
        <span>Himachal Pradesh, India</span>
        <span className="text-neutral-600">•</span>
        <span className="text-neutral-300">Software Engineer</span>
      </motion.div>

      {/* Name Headline */}
      <motion.h1
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.08] mb-5"
      >
        {PORTFOLIO_DATA.personal.name}
      </motion.h1>

      {/* Concise Personal Introduction (Reduced, No Bloat/Ethos) */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-3 mb-8"
      >
        <p className="text-lg sm:text-xl text-neutral-200 font-display font-medium leading-snug">
          Full-stack developer building scalable web systems, clean APIs, and
          reliable digital products.
        </p>
        <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
          I work across the modern TypeScript ecosystem—specializing in Next.js,
          Node.js, and PostgreSQL. Focused on crafting fast, intuitive
          interfaces backed by resilient architecture.
        </p>
      </motion.div>

      {/* Quick Actions & Socials */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center gap-3 mb-12"
      >
        <a
          href={hasValidResumeUrl ? normalizedResumeUrl : "#"}
          onClick={(e) => {
            if (!hasValidResumeUrl) {
              e.preventDefault();
            }
          }}
          target={hasValidResumeUrl ? "_blank" : undefined}
          rel={hasValidResumeUrl ? "noopener noreferrer" : undefined}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm transition-all duration-200 shadow-sm ${
            !hasValidResumeUrl
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-neutral-200 cursor-pointer"
          }`}
          title={hasValidResumeUrl ? "View Resume" : "Resume not available"}
        >
          <FileText className="w-4 h-4" />
          <span>Resume</span>
        </a>

        {hasValidEmail ? (
          <>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white text-xs font-mono border border-white/[0.08] transition-all duration-200"
              title="Click to copy email"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{emailAddress}</span>
                </>
              )}
            </button>

            <div className="h-4 w-px bg-white/10 hidden sm:block mx-1" />
          </>
        ) : null}

        <div className="flex items-center gap-2">
          <a
            href={hasValidGithubUrl ? normalizedGithubUrl : "#"}
            onClick={(e) => {
              if (!hasValidGithubUrl) {
                e.preventDefault();
              }
            }}
            target={hasValidGithubUrl ? "_blank" : undefined}
            rel={hasValidGithubUrl ? "noopener noreferrer" : undefined}
            aria-label="GitHub Profile"
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] text-neutral-300 border border-white/[0.08] text-xs font-mono transition-all duration-200 ${
              hasValidGithubUrl
                ? "hover:bg-white/[0.07] hover:text-white cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }`}
            title={hasValidGithubUrl ? "GitHub Profile" : "GitHub profile not configured"}
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <a
            href={hasValidLinkedinUrl ? normalizedLinkedinUrl : "#"}
            onClick={(e) => {
              if (!hasValidLinkedinUrl) {
                e.preventDefault();
              }
            }}
            target={hasValidLinkedinUrl ? "_blank" : undefined}
            rel={hasValidLinkedinUrl ? "noopener noreferrer" : undefined}
            aria-label="LinkedIn Profile"
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] text-neutral-300 border border-white/[0.08] text-xs font-mono transition-all duration-200 ${
              hasValidLinkedinUrl
                ? "hover:bg-white/[0.07] hover:text-white cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }`}
            title={hasValidLinkedinUrl ? "LinkedIn Profile" : "LinkedIn profile not configured"}
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
        </div>
      </motion.div>

      {/* Minimal Explore Cards (Reduced, Fast Overview) */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="w-full pt-8 border-t border-white/[0.08]"
      >
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4">
          Explore Portfolio
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {QUICK_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.16] transition-all duration-200 group flex items-center justify-between"
            >
              <div>
                <div className="text-sm font-semibold text-white group-hover:text-neutral-200 transition-colors">
                  {item.title}
                </div>
                <div className="text-xs text-neutral-400 font-sans mt-0.5">
                  {item.subtitle}
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

