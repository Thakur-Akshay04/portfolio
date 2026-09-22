"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useSafeReducedMotion } from "@/lib/hooks";

export default function NotFound() {
  const shouldReduceMotion = useSafeReducedMotion();

  return (
    <main className="w-full flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 text-center">
      <title>404: Page Not Found | Akshay Singh Thakur</title>
      <meta name="robots" content="noindex, follow" />

      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl mx-auto flex flex-col items-center"
      >
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider text-neutral-400 bg-white/[0.04] border border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.3)] mb-6 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
          <span>404 NOT FOUND</span>
        </div>

        {/* Large Typographic 404 */}
        <div className="relative mb-2 select-none">
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-display font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500/25 leading-none">
            404
          </h1>
        </div>

        {/* Headline & Description */}
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight mb-2.5">
          Page not found
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 font-sans max-w-md mx-auto leading-relaxed mb-8">
          The page you are looking for doesn’t exist, has been removed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-10">
          <Link
            href="/"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-white text-black hover:bg-neutral-100 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-4px_rgba(255,255,255,0.25)] active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 ease-out group-hover:-translate-x-0.5" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/projects"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-neutral-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <span>Explore Projects</span>
            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Quick Directory Links */}
        <div className="pt-7 border-t border-white/[0.06] w-full max-w-md">
          <p className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-3 select-none">
            Quick Navigation
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-mono text-neutral-400">
            <Link
              href="/about"
              className="hover:text-white transition-colors duration-150 py-0.5"
            >
              About
            </Link>
            <span className="text-neutral-700 select-none">•</span>
            <Link
              href="/skills"
              className="hover:text-white transition-colors duration-150 py-0.5"
            >
              Skills
            </Link>
            <span className="text-neutral-700 select-none">•</span>
            <Link
              href="/experience"
              className="hover:text-white transition-colors duration-150 py-0.5"
            >
              Experience
            </Link>
            <span className="text-neutral-700 select-none">•</span>
            <Link
              href="/contact"
              className="hover:text-white transition-colors duration-150 py-0.5"
            >
              Contact
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
