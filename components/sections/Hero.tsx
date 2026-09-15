"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Copy, Check } from "lucide-react";
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

  const emailAddress =
    PORTFOLIO_DATA.personal.email || "akshaythakur481@gmail.com";
  const githubUrl =
    (process.env.NEXT_PUBLIC_GITHUB_URL || "").trim() ||
    "https://github.com/Thakur-Akshay04";
  const linkedinUrl =
    (process.env.NEXT_PUBLIC_LINKEDIN_URL || "").trim() ||
    "https://linkedin.com/in/akshay-singh-thakur-446738289";

  const handleCopyEmail = () => {
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
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all duration-200 shadow-sm"
        >
          <Mail className="w-4 h-4" />
          <span>Contact Me</span>
        </Link>

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

        <div className="flex items-center gap-2">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] text-neutral-300 hover:text-white border border-white/[0.08] text-xs font-mono transition-all duration-200"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] text-neutral-300 hover:text-white border border-white/[0.08] text-xs font-mono transition-all duration-200"
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

