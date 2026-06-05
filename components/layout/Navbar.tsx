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
  const shouldReduceMotion = useSafeReducedMotion();
  const lenis = useLenis();

  // Scroll-spy: track which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate target threshold (e.g., 25% from top of viewport)
      const targetLine = scrollPosition + windowHeight * 0.25;

      let currentActive = "home";

      for (let i = 0; i < navItems.length; i++) {
        const id = navItems[i].href.slice(1);
        const element = document.getElementById(id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          // If the target line is within the bounds of this section
          if (targetLine >= offsetTop && targetLine < offsetTop + offsetHeight) {
            currentActive = id;
            break;
          }
        }
      }

      // Special case: if scrolled near the bottom, force "contact" to be active
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
      if (isAtBottom) {
        currentActive = "contact";
      }

      setActiveSection(currentActive);
    };

    // Run once on mount to set initial section
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const id = href.slice(1);
    const element = document.getElementById(id);
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, { offset: -100 });
      } else {
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const offsetPosition = elementRect - bodyRect - 100;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
      setActiveSection(id);
    }
  };

  const isVisible = activeSection !== "home";

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.95 }}
        animate={
          isVisible
            ? { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" as const }
            : { opacity: 0, y: 20, scale: 0.95, pointerEvents: "none" as const }
        }
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="navbar-dock"
      >
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
              {/* Active background pill */}
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
      </motion.div>
    </nav>
  );
}
