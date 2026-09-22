import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/data";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#070709]/90 backdrop-blur-md py-2.5 sm:py-3 px-4 sm:px-8 mt-auto shrink-0 z-20">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-sans">
        <div className="flex items-center text-left">
          <span className="font-medium text-white tracking-tight text-xs sm:text-sm">
            {PORTFOLIO_DATA.personal.name}
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-5 text-[11px] sm:text-xs font-mono">
          <Link
            href="/about"
            className="hover:text-white transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/projects"
            className="hover:text-white transition-colors duration-200"
          >
            Projects
          </Link>
          <Link
            href="/skills"
            className="hover:text-white transition-colors duration-200"
          >
            Skills
          </Link>
          <Link
            href="/experience"
            className="hover:text-white transition-colors duration-200"
          >
            Experience
          </Link>
          <Link
            href="/contact"
            className="group text-accent-purple hover:text-accent-purple-hover transition-colors duration-200 flex items-center gap-1 font-semibold"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
