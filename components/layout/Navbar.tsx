"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/hooks";
import { useLenis } from "lenis/react";
import {
  Home,
  User,
  Wrench,
  FolderOpen,
  Briefcase,
  MessageSquare,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Wrench },
  { label: "Projects", href: "#projects", icon: FolderOpen },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Contact", href: "#contact", icon: MessageSquare },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useSafeReducedMotion();
  const lenis = useLenis();

  // Screen size check to determine mobile threshold
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 960);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll spy & scrolled check
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      setIsScrolled(scrollPosition > 80);

      // Scroll spy logic
      const targetLine = scrollPosition + windowHeight * 0.25;
      let currentActive = "home";

      for (let i = 0; i < navItems.length; i++) {
        const id = navItems[i].href.slice(1);
        const element = document.getElementById(id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (targetLine >= offsetTop && targetLine < offsetTop + offsetHeight) {
            currentActive = id;
            break;
          }
        }
      }

      // Handle bottom edge cases
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
      if (isAtBottom) {
        currentActive = "contact";
      }

      setActiveSection(currentActive);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    href: string
  ) => {
    e.preventDefault();
    const id = href.slice(1);
    const element = document.getElementById(id);
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, { offset: -80 });
      } else {
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const offsetPosition = elementRect - bodyRect - 80;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
      setActiveSection(id);
    }
  };

  const showScrolled = isScrolled || isMobile;

  return (
    <nav className={`fixed z-50 transition-all duration-300 ${
      showScrolled 
        ? "top-6 left-1/2 -translate-x-1/2 w-auto" 
        : "top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl"
    }`}>
      <motion.div
        layout
        className={showScrolled ? "navbar-dock" : "navbar-header-wide"}
        transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 350, damping: 32 }}
      >
        {/* WIDE DESTRUCTURING HEADER (Desktop, not scrolled) */}
        {!showScrolled && (
          <>
            {/* Logo Group */}
            <motion.div 
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 select-none pointer-events-none"
            >
              <div className="w-8 h-8 rounded-lg bg-accent-purple flex items-center justify-center font-display font-black text-white text-lg drop-shadow-[0_0_8px_var(--accent-neon-glow)]">
                A
              </div>
              <span className="font-display font-extrabold text-white tracking-wider text-sm">
                AKSHAY
              </span>
            </motion.div>

            {/* Main Menu Links */}
            <motion.div layout className="flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`navbar-wide-item ${isActive ? "active" : ""}`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="navActiveIndicatorWide"
                        className="navbar-wide-active-indicator"
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 350, damping: 30 }
                        }
                      />
                    )}
                  </a>
                );
              })}
            </motion.div>

            {/* CTA Talk Button */}
            <motion.button
              layout
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={(e) => handleNavClick(e, "#contact")}
              className="px-4 py-2 text-[10px] font-mono font-bold tracking-widest text-white border border-white/20 rounded-xl hover:border-accent-purple/50 hover:bg-accent-purple/10 hover:shadow-[0_0_15px_rgba(157,78,221,0.25)] transition-all duration-300"
            >
              LET&apos;S TALK
            </motion.button>
          </>
        )}

        {/* SCROLLED OR MOBILE FLOATING ISLAND DOCK */}
        {showScrolled && (
          <>
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              const Icon = item.icon;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`navbar-dock-item ${isActive ? "active" : ""}`}
                  aria-label={item.label}
                >
                  {/* Active Indication pill */}
                  {isActive && (
                    <motion.div
                      layoutId="navActiveIndicator"
                      className="navbar-dock-active-bg"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 350, damping: 30 }
                      }
                    />
                  )}

                  <span className="navbar-dock-icon">
                    <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
                  </span>
                  <span className="navbar-dock-label">{item.label}</span>
                </a>
              );
            })}
          </>
        )}
      </motion.div>
    </nav>
  );
}
