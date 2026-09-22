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
        className={`absolute left-4 top-3 font-mono text-xs pointer-events-none transition-all duration-200 ${
          isFloating
            ? "-translate-y-5 text-white scale-90"
            : "text-neutral-500"
        } ${focused ? "text-white" : ""}`}
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
          className={`w-full min-h-[110px] sm:min-h-[130px] px-4 py-3.5 rounded-xl bg-white/[0.03] border font-sans text-sm text-white focus:outline-none transition-all duration-200 resize-none ${
            error
              ? "border-red-500 focus:border-red-500"
              : focused
                ? "border-white/30 bg-white/[0.05] shadow-[0_0_12px_rgba(255,255,255,0.05)]"
                : "border-white/[0.1] hover:border-white/[0.18]"
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
          className={`w-full h-11 sm:h-12 px-4 rounded-xl bg-white/[0.03] border font-sans text-sm text-white focus:outline-none transition-all duration-200 ${
            error
              ? "border-red-500 focus:border-red-500"
              : focused
                ? "border-white/30 bg-white/[0.05] shadow-[0_0_12px_rgba(255,255,255,0.05)]"
                : "border-white/[0.1] hover:border-white/[0.18]"
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
            className="text-xs font-mono text-red-400 pl-2.5 flex items-center gap-1"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
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
  const [emailStr, setEmailStr] = useState(PORTFOLIO_DATA.personal.email || "");
  const [socialLinks, setSocialLinks] = useState(PORTFOLIO_DATA.socials);

  useEffect(() => {
    fetch("/api/config")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          if (data.email) setEmailStr(data.email.trim());
          setSocialLinks([
            { name: "GitHub", url: (data.githubUrl || "").trim(), iconName: "Github" },
            { name: "LinkedIn", url: (data.linkedinUrl || "").trim(), iconName: "Linkedin" },
            { name: "Resume", url: (data.resumeUrl || "").trim(), iconName: "Resume" },
          ]);
        }
      })
      .catch(() => {});
  }, []);


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

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
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

      // Hide Toast after 4 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to transmit message.";
      setSubmitError(errorMessage);
      
      // Hide Error Toast after 5 seconds
      setTimeout(() => {
        setSubmitError(null);
      }, 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageFoldWrapper id="contact" className="pt-6 sm:pt-10 pb-16 sm:pb-24 px-6 sm:px-10 max-w-6xl mx-auto relative overflow-hidden flex-1 flex flex-col justify-center w-full">

      {/* Reusable Section Heading */}
      <SectionHeading
        title="Get In Touch"
        subtitle="Have an idea, project, or opportunity? Feel free to reach out anytime."
      />

      <motion.div
        whileHover={{
          y: -2,
          boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.7)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="grid grid-cols-1 lg:grid-cols-12 border border-white/[0.08] divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08] bg-[#0d0d11]/80 rounded-2xl overflow-hidden shadow-2xl relative z-10 group/card"
      >
        {/* Left Column - Contact Info */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6 sm:space-y-8 bg-black/40 backdrop-blur-md relative z-10"
        >
          <div className="space-y-3">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white">Let&apos;s Create something together... </h3>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-sans">
              I&apos;m currently open to new opportunities, freelance contracts, or Full-time roles. If you have any projects, ideas, questions, or any niche topic you&apos;d like to discuss, I&apos;d love to hear from you.
            </p>
          </div>

          <div className="space-y-4 font-mono text-sm border-t border-white/[0.08] pt-6">
            {emailStr ? (
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-neutral-300 gap-2">
                <span className="text-neutral-500 text-xs">EMAIL:</span>
                <motion.a
                  href={`mailto:${emailStr}`}
                  className="px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.2] text-neutral-200 font-medium relative overflow-hidden group text-xs sm:text-sm max-w-full transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <span className="relative z-10 inline-block break-all">
                    {emailStr}
                  </span>
                </motion.a>
              </div>
            ) : null}

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-300 gap-2">
              <span className="text-gray-500 text-xs">LOCATION:</span>
              <span className="flex items-center gap-2 text-gray-400 font-sans font-medium text-left sm:text-right text-sm">
                <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                {PORTFOLIO_DATA.personal.location}
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3 border-t border-white/[0.08] pt-6">
            <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                let Icon: React.ComponentType<{ className?: string }> = Mail;
                const nameLower = social.name.toLowerCase();
                if (nameLower.includes("github")) Icon = GithubIcon;
                else if (nameLower.includes("linkedin")) Icon = LinkedinIcon;
                else if (nameLower.includes("resume")) Icon = FileText;

                const rawUrl = (social.url || "").trim();
                const normalizedUrl = rawUrl
                  ? rawUrl.startsWith("http://") || rawUrl.startsWith("https://")
                    ? rawUrl
                    : `https://${rawUrl}`
                  : "";
                const hasValidUrl = Boolean(normalizedUrl && (normalizedUrl.startsWith("http://") || normalizedUrl.startsWith("https://")));

                return (
                  <div key={social.name} className="relative group/btn">
                    {/* Hover Animated Tooltip Text */}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-[#14141a] border border-white/[0.1] text-xs font-mono text-neutral-200 whitespace-nowrap transition-all duration-200 ease-out origin-bottom z-20 opacity-0 translate-y-1 scale-95 pointer-events-none group-hover/btn:opacity-100 group-hover/btn:translate-y-0 group-hover/btn:scale-100 shadow-lg">
                      {social.name}
                      <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#14141a]" />
                    </span>

                    <motion.a
                      href={hasValidUrl ? normalizedUrl : "#"}
                      onClick={(e) => {
                        if (!hasValidUrl) {
                          e.preventDefault();
                        }
                      }}
                      target={hasValidUrl ? "_blank" : undefined}
                      rel={hasValidUrl ? "noopener noreferrer" : undefined}
                      className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl bg-white/[0.03] border text-neutral-400 hover:text-white transition-all border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.06] ${
                        !hasValidUrl ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                      }`}
                      whileHover={{
                        scale: hasValidUrl ? 1.05 : 1,
                      }}
                      whileTap={{ scale: hasValidUrl ? 0.96 : 1 }}
                    >
                      <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
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
          className="lg:col-span-7 p-6 sm:p-8 md:p-10 bg-[#0d0d11]/40 backdrop-blur-md relative z-10"
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={submitting ? {} : { scale: 1.01 }}
              whileTap={submitting ? {} : { scale: 0.99 }}
              className="w-full h-11 sm:h-12 bg-white hover:bg-neutral-200 text-black font-semibold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-white/5"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>
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
            className="fixed bottom-6 right-6 z-50 p-4 rounded-xl border border-white/10 bg-black flex items-center gap-3 shadow-2xl"
          >
            <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
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
