import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#070709]/80 backdrop-blur-md py-12 px-6 sm:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-neutral-400 font-sans">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
          <span className="font-medium text-white tracking-tight">
            {PORTFOLIO_DATA.personal.name}
          </span>
          <span className="hidden sm:inline text-neutral-600">•</span>
          <span className="text-xs font-mono text-neutral-500">
            © {currentYear} All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono">
          <Link
            href="/about"
            className="hover:text-white transition-all duration-200 hover:-translate-y-0.5"
          >
            About
          </Link>
          <Link
            href="/projects"
            className="hover:text-white transition-all duration-200 hover:-translate-y-0.5"
          >
            Projects
          </Link>
          <Link
            href="/skills"
            className="hover:text-white transition-all duration-200 hover:-translate-y-0.5"
          >
            Skills
          </Link>
          <Link
            href="/experience"
            className="hover:text-white transition-all duration-200 hover:-translate-y-0.5"
          >
            Experience
          </Link>
          <Link
            href="/contact"
            className="group text-accent-purple hover:text-accent-purple-hover transition-all duration-200 flex items-center gap-1 font-semibold hover:-translate-y-0.5"
          >
            <span>Get In Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
