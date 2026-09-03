"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, MapPin, Trash2, Paperclip, Clock } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { PORTFOLIO_DATA } from "@/constants/data";
import { Win11Mail } from "@/components/icons/Win11Icons";

export default function ContactWindow() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send email message.");
      }

      setStatus("success");
      setStatusMessage("Message delivered directly to Akshay's inbox! He will reply within 24 hours.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setStatusMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  const github = PORTFOLIO_DATA.socials.find((s) => s.name === "GitHub")?.url || "https://github.com/Thakur-Akshay04";
  const linkedin = PORTFOLIO_DATA.socials.find((s) => s.name === "LinkedIn")?.url || "https://www.linkedin.com/in/akshaythakur04/";

  return (
    <div className="space-y-4 max-w-2xl mx-auto select-none text-zinc-300">
      {/* Outlook Command Header */}
      <div className="p-3 rounded-2xl bg-[#121217] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Win11Mail className="w-5 h-5" />
          <span className="font-semibold text-white">Outlook / New Message</span>
        </div>

        {/* Quick Social Badges */}
        <div className="flex items-center gap-2">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-lg bg-black/40 hover:bg-white/10 text-zinc-300 border border-white/10 text-xs flex items-center gap-1.5 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-lg bg-[#0078D4]/20 hover:bg-[#0078D4]/30 text-blue-300 border border-[#0078D4]/30 text-xs flex items-center gap-1.5 transition-colors"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Mail Form */}
      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
        {/* Recipient Badge */}
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5 text-xs font-mono">
          <span className="text-zinc-500">To:</span>
          <span className="text-white font-semibold">Akshay Singh Thakur</span>
          <span className="text-[#0078D4] hidden sm:inline">&lt;akshaysinghthakur0004@gmail.com&gt;</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400 font-mono">Your Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alex Doe"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#0078D4] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400 font-mono">Your Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@company.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#0078D4] transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400 font-mono">Subject *</label>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Project Opportunity / Engineering Collaboration / Inquiries"
            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#0078D4] transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400 font-mono">Message Content *</label>
          <textarea
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Write your message here..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#0078D4] transition-colors resize-none leading-relaxed"
          />
        </div>

        {/* Feedback Banners */}
        {status === "success" && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {status === "error" && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Submit Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-[11px] text-zinc-500 font-mono flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-emerald-400" />
            <span>Typical reply time: &lt; 24h</span>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-2.5 rounded-xl bg-[#0078D4] hover:bg-[#1084D8] disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-[#0078D4]/30 transition-all"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Send Mail</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
