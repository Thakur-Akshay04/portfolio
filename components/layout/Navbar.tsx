"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/hooks";
import {
  Home,
  User,
  Wrench,
  FolderOpen,
  Briefcase,
  MessageSquare,
} from "lucide-react";

export const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: User },
  { label: "Skills", href: "/skills", icon: Wrench },
  { label: "Projects", href: "/projects", icon: FolderOpen },
  { label: "Experience", href: "/experience", icon: Briefcase },
  { label: "Contact", href: "/contact", icon: MessageSquare },
];

export default function Navbar() {
  const pathname = usePathname();
  const shouldReduceMotion = useSafeReducedMotion();

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <nav aria-label="Main Navigation" className="pointer-events-auto">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="navbar-dock"
        >
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname?.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`navbar-dock-item ${isActive ? "active" : ""}`}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Smooth Animated Active Capsule Pill */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-capsule-active"
                    className="navbar-dock-active-bg"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 30 }
                    }
                  />
                )}

                <span className="navbar-dock-icon">
                  <Icon className="w-4 h-4" strokeWidth={1.9} />
                </span>
                <span className="navbar-dock-label">{item.label}</span>
              </Link>
            );
          })}
        </motion.div>
      </nav>
    </header>
  );
}
