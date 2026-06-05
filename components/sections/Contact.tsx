"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertTriangle, Mail, FileText, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { PORTFOLIO_DATA } from "@/constants/data";
import { getFadeIn, getScaleIn } from "@/lib/variants";
import { useSafeReducedMotion } from "@/lib/hooks";
import PageFoldWrapper from "@/components/layout/PageFoldWrapper";
import SectionHeading from "@/components/layout/SectionHeading";
import Script from "next/script";

interface TurnstileWindow extends Window {
  turnstile?: {
    render: (container: HTMLElement, options: Record<string, unknown>) => string;
    reset: (widgetId: string) => void;
    remove: (widgetId: string) => void;
  };
}

interface FormFieldProps {
  label: string;
  id: string;
  type?: "text" | "email";
  value: string;
  onChange: (val: string) => void;
  error?: string;
  isTextArea?: boolean;
}

function FormField({ label, id, type = "text", value, onChange, error, isTextArea = false }: FormFieldProps) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value.length > 0;

  return (
    <div className="relative flex flex-col space-y-1 w-full">
      {/* Label */}
      <label
        htmlFor={id}
        className={`absolute left-4 top-4 font-mono text-xs pointer-events-none transition-all duration-300 ${isFloating
            ? "-translate-y-8 text-accent-purple scale-90"
            : "text-gray-400"
          } ${focused ? "text-accent-purple drop-shadow-[0_0_4px_var(--accent-neon-glow)]" : ""}`}
      >
        {label}
      </label>

      {isTextArea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full min-h-[140px] px-4 py-4 rounded-xl bg-black border font-sans text-sm text-white focus:outline-none transition-all duration-300 ${error
              ? "border-red-500 focus:border-red-500"
              : focused
                ? "border-accent-purple shadow-[0_0_15px_rgba(157,78,221,0.25)]"
                : "border-white/20 hover:border-white/40"
            }`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full h-12 px-4 rounded-xl bg-black border font-sans text-sm text-white focus:outline-none transition-all duration-300 ${error
              ? "border-red-500 focus:border-red-500"
              : focused
                ? "border-accent-purple shadow-[0_0_15px_rgba(157,78,221,0.25)]"
                : "border-white/20 hover:border-white/40"
            }`}
        />
      )}

      {/* Error text */}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-[10px] font-mono text-red-400 pl-2 flex items-center gap-1"
          >
            <AlertTriangle className="w-3 h-3" />
            <span>{error}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const shouldReduceMotion = useSafeReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [linkedinBanned, setLinkedinBanned] = useState(false);

  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Turnstile integration
  const turnstileRef = useRef<HTMLDivElement>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [widgetId, setWidgetId] = useState<string | null>(null);

  useEffect(() => {
    let checkTurnstile: NodeJS.Timeout;
    if (typeof window !== "undefined") {
      checkTurnstile = setInterval(() => {
        if ((window as unknown as TurnstileWindow).turnstile && turnstileRef.current && !widgetId) {
          clearInterval(checkTurnstile);
          const id = (window as unknown as TurnstileWindow).turnstile!.render(turnstileRef.current, {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA",
            callback: (token: string) => {
              setTurnstileToken(token);
            },
            "expired-callback": () => {
              setTurnstileToken(null);
            },
            "error-callback": () => {
              setTurnstileToken(null);
            },
          });
          setWidgetId(id);
        }
      }, 100);
    }

    return () => {
      if (checkTurnstile) clearInterval(checkTurnstile);
      if (widgetId && typeof window !== "undefined" && (window as unknown as TurnstileWindow).turnstile) {
        try {
          (window as unknown as TurnstileWindow).turnstile!.remove(widgetId);
        } catch (e) {
          console.error("Failed to remove turnstile widget:", e);
        }
      }
    };
  }, [widgetId]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - left,
      y: e.clientY - top,
    });
  };

  const fadeInLeft = getFadeIn("left", 40)(shouldReduceMotion);
  const fadeInRight = getFadeIn("right", 40)(shouldReduceMotion);
  const scaleIn = getScaleIn(shouldReduceMotion);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!name.trim()) tempErrors.name = "Name is required";
    if (!email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tempErrors.email = "Please provide a valid email address";
    }
    if (!subject.trim()) tempErrors.subject = "Subject is required";
    if (!message.trim()) {
      tempErrors.message = "Message is required";
    } else if (message.trim().length < 10) {
      tempErrors.message = "Message should be at least 10 characters";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!turnstileToken) {
      setSubmitError("Please complete the security check.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message, turnstileToken }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setSuccess(true);

      // Reset Form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");

      // Reset Turnstile
      if (widgetId && typeof window !== "undefined" && (window as unknown as TurnstileWindow).turnstile) {
        (window as unknown as TurnstileWindow).turnstile!.reset(widgetId);
        setTurnstileToken(null);
      }

      // Hide Toast after 4 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to transmit message.";
      setSubmitError(errorMessage);
      
      // Reset Turnstile on error so they can solve it again
      if (widgetId && typeof window !== "undefined" && (window as unknown as TurnstileWindow).turnstile) {
        (window as unknown as TurnstileWindow).turnstile!.reset(widgetId);
        setTurnstileToken(null);
      }

      // Hide Error Toast after 5 seconds
      setTimeout(() => {
        setSubmitError(null);
      }, 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageFoldWrapper id="contact" className="py-24 md:py-32 px-6 max-w-7xl mx-auto relative overflow-hidden">

      {/* Floating background neon gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-accent-purple opacity-[0.03] blur-[90px]"
        />
        <motion.div
          animate={{
            x: [0, -70, 50, 0],
            y: [0, 80, -30, 0],
            scale: [1, 1.2, 0.95, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-accent-purple opacity-[0.03] blur-[100px]"
        />
      </div>

      {/* Reusable Section Heading */}
      <SectionHeading title="Get In Touch" subtitle="// Connection" />

      <motion.div
        onMouseMove={handleMouseMove}
        whileHover={{
          y: -4,
          borderColor: "rgba(157, 78, 221, 0.4)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(157, 78, 221, 0.15)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="grid grid-cols-1 lg:grid-cols-12 border-2 border-white/20 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-white/20 bg-[#0a0a0a]/50 rounded-2xl overflow-hidden shadow-2xl relative z-10 group/card"
      >
        {/* Spotlight background lighting effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(800px circle at ${coords.x}px ${coords.y}px, rgba(157, 78, 221, 0.15), transparent 80%)`
          }}
        />

        {/* Left Column - Contact Info */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-5 p-8 flex flex-col justify-between space-y-10 bg-black/60 backdrop-blur-md relative z-10"
        >
          <div className="space-y-4">
            <h4 className="text-2xl font-display font-extrabold text-white">Let&apos;s get close to each other!</h4>
            <p className="text-sm text-gray-400 leading-relaxed font-sans">
              I&apos;m currently open to new opportunities, freelance contracts, or technical advising. If you have any projects, ideas, or any type of niche to talk about, I&apos;d love to hear from you.
            </p>
          </div>

          <div className="space-y-4 font-mono text-sm border-t-2 border-white/20 pt-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-300 gap-2">
              <span className="text-gray-500">EMAIL:</span>
              <motion.a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="px-4 py-2.5 rounded-xl border border-white/20 bg-black/60 text-gray-300 font-semibold relative overflow-hidden group text-[11px] sm:text-sm max-w-full"
                whileHover="hover"
                whileTap="tap"
                variants={{
                  hover: {
                    scale: 1.03,
                    borderColor: "rgba(157, 78, 221, 0.5)",
                    boxShadow: "0 0 15px rgba(157, 78, 221, 0.25)",
                  },
                  tap: {
                    scale: 0.98,
                  }
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Shiny gradient overlay sweeping across the button on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-purple/10 to-transparent -translate-x-full"
                  variants={{
                    hover: {
                      x: "100%",
                      transition: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 1.5,
                        ease: "linear",
                      },
                    },
                  }}
                />

                {/* Email text animation */}
                <motion.span
                  className="relative z-10 inline-block break-all"
                  variants={{
                    hover: {
                      color: "#ffffff",
                      textShadow: "0 0 8px rgba(157, 78, 221, 0.6)",
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    },
                  }}
                >
                  {PORTFOLIO_DATA.personal.email}
                </motion.span>
              </motion.a>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-300 gap-2">
              <span className="text-gray-500">LOCATION:</span>
              <span className="flex items-center gap-1.5 text-gray-400 font-sans font-medium text-left sm:text-right">
                <MapPin className="w-4 h-4 text-accent-purple shrink-0" />
                {PORTFOLIO_DATA.personal.location}
              </span>
            </div>
          </div>

          {/* Social Links with Pulsing Glow on Hover */}
          <div className="space-y-4 border-t-2 border-white/20 pt-6">
            <h5 className="text-xs font-mono text-gray-500 uppercase tracking-widest">{"// Find Me"}</h5>
            <div className="flex gap-4">
              {PORTFOLIO_DATA.socials.map((social) => {
                let Icon: React.ComponentType<{ className?: string }> = Mail;
                const nameLower = social.name.toLowerCase();
                if (nameLower.includes("github")) Icon = GithubIcon;
                else if (nameLower.includes("linkedin")) Icon = LinkedinIcon;
                else if (nameLower.includes("resume")) Icon = FileText;

                const isLinkedin = nameLower.includes("linkedin");
                const isResume = nameLower.includes("resume");
                const showBanned = isLinkedin && linkedinBanned;

                return (
                  <div key={social.name} className="relative group/btn">
                    {/* Hover Animated Tooltip Text */}
                    <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded bg-[#0a0a0a] border text-[10px] font-mono whitespace-nowrap transition-all duration-200 ease-out origin-bottom z-20 ${
                      showBanned 
                        ? "opacity-100 translate-y-0 scale-100 border-red-500 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.25)]"
                        : "opacity-0 translate-y-1 scale-95 pointer-events-none group-hover/btn:opacity-100 group-hover/btn:translate-y-0 group-hover/btn:scale-100 border-accent-purple/30 text-white shadow-[0_0_10px_rgba(157,78,221,0.15)]"
                    }`}>
                      {showBanned ? "currently banned!" : social.name}
                      <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#0a0a0a]" />
                    </span>

                    <motion.a
                      href={isLinkedin || isResume ? "#" : social.url}
                      onClick={(e) => {
                        if (isLinkedin) {
                          e.preventDefault();
                          setLinkedinBanned(true);
                          setTimeout(() => setLinkedinBanned(false), 3000);
                        } else if (isResume) {
                          e.preventDefault();
                        }
                      }}
                      target={isLinkedin || isResume ? undefined : "_blank"}
                      rel={isLinkedin || isResume ? undefined : "noopener noreferrer"}
                      className={`w-12 h-12 flex items-center justify-center rounded-xl bg-[#0a0a0a] border text-gray-400 hover:text-white transition-colors shadow-lg ${
                        showBanned 
                          ? "border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.35)]" 
                          : "border-white/10 hover:border-accent-purple/50 hover:shadow-[0_0_15px_rgba(157,78,221,0.35)]"
                      }`}
                      whileHover={{
                        scale: 1.08,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Right Column - Contact Form */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-7 p-8 bg-[#0a0a0a]/30 backdrop-blur-md relative z-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                label="NAME"
                id="name"
                value={name}
                onChange={(val) => {
                  setName(val);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                error={errors.name}
              />
              <FormField
                label="EMAIL"
                id="email"
                type="email"
                value={email}
                onChange={(val) => {
                  setEmail(val);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                error={errors.email}
              />
            </div>

            <FormField
              label="SUBJECT"
              id="subject"
              value={subject}
              onChange={(val) => {
                setSubject(val);
                if (errors.subject) setErrors((prev) => ({ ...prev, subject: "" }));
              }}
              error={errors.subject}
            />

            <FormField
              label="MESSAGE"
              id="message"
              isTextArea
              value={message}
              onChange={(val) => {
                setMessage(val);
                if (errors.message) setErrors((prev) => ({ ...prev, message: "" }));
              }}
              error={errors.message}
            />

            {/* Cloudflare Turnstile CAPTCHA */}
            <div className="flex justify-center py-2" data-lenis-prevent>
              <div ref={turnstileRef} />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={submitting || !turnstileToken}
              whileHover={!turnstileToken || submitting ? {} : { scale: 1.01, boxShadow: "0 0 20px rgba(157, 78, 221, 0.4)" }}
              whileTap={!turnstileToken || submitting ? {} : { scale: 0.99 }}
              className="w-full h-12 bg-accent-purple hover:bg-accent-purple-hover text-black font-extrabold text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>

            {/* Load Turnstile explicit script */}
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
              strategy="afterInteractive"
            />
          </form>
        </motion.div>
      </motion.div>

      {/* Floating Success Toast Alert Notification */}
      <AnimatePresence>
        {success && (
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed bottom-6 right-6 z-50 p-4 rounded-xl border border-accent-purple/30 bg-black flex items-center gap-3 shadow-2xl"
          >
            <CheckCircle className="w-6 h-6 text-accent-purple shrink-0 drop-shadow-[0_0_4px_var(--accent-neon-glow)]" />
            <div className="font-sans text-left">
              <p className="text-sm font-bold text-white">Message Sent</p>
              <p className="text-xs text-gray-400">Thank you! I will get back to you as soon as possible.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Error Toast Alert Notification */}
      <AnimatePresence>
        {submitError && (
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed bottom-6 right-6 z-50 p-4 rounded-xl border border-red-500/30 bg-black flex items-center gap-3 shadow-2xl"
          >
            <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 drop-shadow-[0_0_4px_rgba(239,68,68,0.5)]" />
            <div className="font-sans text-left">
              <p className="text-sm font-bold text-white">Transmission Failed</p>
              <p className="text-xs text-red-400 font-medium">{submitError}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageFoldWrapper>
  );
}
