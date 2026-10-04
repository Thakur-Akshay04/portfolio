"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Copy, Check, Mail } from "lucide-react";
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

interface QuickLinkItem {
  title: string;
  subtitle: string;
  href: string;
}

function ExploreCard({ item }: { item: QuickLinkItem }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setIsHovered(true);
  };

  return (
    <Link
      ref={cardRef}
      href={item.href}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between text-left h-full min-h-[96px] sm:min-h-[102px] p-4 sm:p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.045] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.06)] active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    >
      {/* Precision spotlight illumination following mouse cursor */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.08), transparent 80%)`,
        }}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-2 w-full relative z-10">
        <div className="text-sm sm:text-base font-semibold text-white group-hover:text-white transition-colors duration-200">
          {item.title}
        </div>
        <ArrowUpRight className="w-4 h-4 text-neutral-500 transition-all duration-200 ease-out group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0 mt-0.5" />
      </div>
      <div className="text-xs text-neutral-400 font-sans mt-2 leading-relaxed group-hover:text-neutral-300 transition-colors duration-200 relative z-10">
        {item.subtitle}
      </div>
    </Link>
  );
}

function normalizeUrl(raw?: string): string {
  if (!raw) return "";
  const trimmed = raw.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return `https://${trimmed}`;
}

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

  const resumeItem = PORTFOLIO_DATA.socials.find((s) => s.name.toLowerCase() === "resume");
  const githubItem = PORTFOLIO_DATA.socials.find((s) => s.name.toLowerCase() === "github");
  const linkedinItem = PORTFOLIO_DATA.socials.find((s) => s.name.toLowerCase() === "linkedin");

  const normalizedResumeUrl = normalizeUrl(resumeUrl || process.env.NEXT_PUBLIC_RESUME_URL || resumeItem?.url);
  const normalizedGithubUrl = normalizeUrl(githubUrl || process.env.NEXT_PUBLIC_GITHUB_URL || githubItem?.url);
  const normalizedLinkedinUrl = normalizeUrl(linkedinUrl || process.env.NEXT_PUBLIC_LINKEDIN_URL || linkedinItem?.url);

  const effectiveResumeUrl = normalizedResumeUrl || "/resume";
  const effectiveGithubUrl = normalizedGithubUrl || "/github";
  const effectiveLinkedinUrl = normalizedLinkedinUrl || "/linkedin";
  const effectiveEmailUrl = emailAddress ? `mailto:${emailAddress}` : "/email";

  const hasValidEmail = Boolean(emailAddress && emailAddress.includes("@"));

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!hasValidEmail) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .writeText(emailAddress)
        .then(() => {
          setCopiedEmail(true);
          setTimeout(() => setCopiedEmail(false), 2000);
        })
        .catch((error) => {
          console.error("Failed to copy email to clipboard:", error);
        });
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 sm:pt-10 md:pt-12 pb-8 sm:pb-12 flex-1 flex flex-col justify-center items-center text-center my-auto">

      {/* Name Headline */}
      <motion.h1
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.06] mb-3.5 text-center max-w-4xl"
      >
        {PORTFOLIO_DATA.personal.name}
      </motion.h1>

      {/* Concise Personal Introduction (Reduced, No Bloat/Ethos) */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-2 mb-6 text-center max-w-2xl lg:max-w-3xl mx-auto"
      >
        <p className="text-lg sm:text-xl lg:text-2xl text-neutral-200 font-display font-medium leading-snug">
          Full-stack developer building scalable web systems, clean APIs, and
          reliable digital products.
        </p>
        <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed max-w-2xl mx-auto">
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
        className="flex flex-wrap items-center justify-center gap-3 mb-8 sm:mb-9"
      >
        {/* Resume Button */}
        <a
          href={effectiveResumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-white text-black hover:bg-neutral-100 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-4px_rgba(255,255,255,0.3)] active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070709] cursor-pointer"
          title="View Resume"
        >
          <FileText className="w-4 h-4 transition-transform duration-200 ease-out group-hover:scale-110 group-hover:-rotate-3" />
          <span>Resume</span>
        </a>

        {/* Email Pill: Click text to redirect / email client, click copy icon to copy */}
        <div className="group relative inline-flex items-stretch rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/25 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(0,0,0,0.5)] active:translate-y-0">
          <a
            href={effectiveEmailUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-neutral-300 hover:text-white text-xs font-mono transition-colors focus-visible:outline-none cursor-pointer"
            title={emailAddress ? `Send email to ${emailAddress}` : "Send Email"}
          >
            <Mail className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors shrink-0" />
            <span>{emailAddress || "Email"}</span>
          </a>

          {hasValidEmail ? (
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center px-2.5 border-l border-white/[0.08] hover:bg-white/[0.08] text-neutral-400 hover:text-white transition-colors rounded-r-xl focus-visible:outline-none cursor-pointer"
              title="Copy email address"
              aria-label="Copy email address"
            >
              {copiedEmail ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 scale-110 transition-transform" />
              ) : (
                <Copy className="w-3.5 h-3.5 transition-transform hover:scale-110" />
              )}
            </button>
          ) : null}
        </div>

        <div className="h-4 w-px bg-white/10 hidden sm:block mx-1" />

        <div className="flex items-center gap-2">
          {/* GitHub Button */}
          <a
            href={effectiveGithubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="group inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/[0.03] text-neutral-300 border border-white/[0.08] text-xs font-mono transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 hover:bg-white/[0.08] hover:border-white/25 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.4)] active:scale-[0.98] cursor-pointer"
            title="GitHub Profile"
          >
            <GithubIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 group-hover:text-white" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* LinkedIn Button */}
          <a
            href={effectiveLinkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="group inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/[0.03] text-neutral-300 border border-white/[0.08] text-xs font-mono transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 hover:bg-white/[0.08] hover:border-white/25 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.4)] active:scale-[0.98] cursor-pointer"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 group-hover:text-white" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
        </div>
      </motion.div>

      {/* Minimal Explore Cards (Reduced, Fast Overview) */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="w-full pt-6 border-t border-white/[0.08]"
      >
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4 text-center">
          Explore Portfolio
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {QUICK_LINKS.map((item) => (
            <ExploreCard key={item.href} item={item} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

