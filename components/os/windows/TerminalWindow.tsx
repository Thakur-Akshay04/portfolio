"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, CornerDownLeft, Plus, ChevronDown } from "lucide-react";
import { PORTFOLIO_DATA } from "@/constants/data";
import { useWindowManager } from "@/context/WindowManagerContext";
import { Win11Terminal } from "@/components/icons/Win11Icons";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export default function TerminalWindow() {
  const { openWindow } = useWindowManager();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "winfetch",
      output: (
        <div className="space-y-2 text-zinc-300 font-mono text-xs">
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <pre className="text-[#0078D4] text-[10px] leading-tight font-bold hidden sm:block">
{`
   ████████  ████████
   ████████  ████████
   ████████  ████████
   
   ████████  ████████
   ████████  ████████
   ████████  ████████
`}
            </pre>
            <div className="space-y-1">
              <p className="text-white font-bold">akshay@WINDOWS-11-PRO</p>
              <p className="text-zinc-500">----------------------</p>
              <p><span className="text-purple-400 font-semibold">OS:</span> Windows 11 Pro Portfolio Edition</p>
              <p><span className="text-purple-400 font-semibold">Host:</span> {PORTFOLIO_DATA.personal.name}</p>
              <p><span className="text-purple-400 font-semibold">Role:</span> {PORTFOLIO_DATA.personal.title}</p>
              <p><span className="text-purple-400 font-semibold">Stack:</span> React 19, Next.js, Node.js, FastAPI, pgvector</p>
              <p><span className="text-purple-400 font-semibold">Location:</span> {PORTFOLIO_DATA.personal.location}</p>
              <p><span className="text-purple-400 font-semibold">Uptime:</span> Production Ready</p>
            </div>
          </div>
          <p className="text-zinc-400 pt-1">
            Type <span className="text-emerald-400 font-semibold">&apos;help&apos;</span> to see all available commands.
          </p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const parts = trimmed.split(" ");
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    let output: React.ReactNode = null;

    switch (mainCmd) {
      case "help":
        output = (
          <div className="space-y-1 text-xs text-zinc-300 font-mono">
            <p className="text-purple-400 font-semibold">Windows PowerShell Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1">
              <p><span className="text-emerald-400 font-semibold">help</span> - Display this command index</p>
              <p><span className="text-emerald-400 font-semibold">winfetch</span> - System architecture overview</p>
              <p><span className="text-emerald-400 font-semibold">about</span> - Open &amp; inspect bio specifications</p>
              <p><span className="text-emerald-400 font-semibold">skills</span> - Explore all engineering skills</p>
              <p><span className="text-emerald-400 font-semibold">projects</span> - View all shipped applications</p>
              <p><span className="text-emerald-400 font-semibold">experience</span> - View internship logs at Worisgo</p>
              <p><span className="text-emerald-400 font-semibold">contact</span> - Open Outlook Mail composer</p>
              <p><span className="text-emerald-400 font-semibold">resume</span> - Open Resume in Notepad</p>
              <p><span className="text-emerald-400 font-semibold">matrix</span> - Digital cyber rain</p>
              <p><span className="text-emerald-400 font-semibold">clear</span> - Clear terminal screen</p>
            </div>
          </div>
        );
        break;

      case "about":
        openWindow("about");
        output = <p className="text-emerald-400">Opening System Specifications (About Me)...</p>;
        break;

      case "skills":
        openWindow("skills");
        output = <p className="text-emerald-400">Opening Skills Directory (File Explorer)...</p>;
        break;

      case "projects":
        openWindow("projects");
        output = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-purple-400 font-semibold">Opening Edge Projects Explorer:</p>
            {PORTFOLIO_DATA.projects.map((p, i) => (
              <p key={p.id} className="text-zinc-300">
                {i + 1}. <span className="text-white font-bold">{p.title}</span> - {p.category}
              </p>
            ))}
          </div>
        );
        break;

      case "experience":
        openWindow("experience");
        output = <p className="text-emerald-400">Opening Work History &amp; Settings...</p>;
        break;

      case "contact":
        openWindow("contact");
        output = <p className="text-emerald-400">Opening Outlook Mail client...</p>;
        break;

      case "resume":
        openWindow("resume");
        output = <p className="text-emerald-400">Opening Resume in Notepad...</p>;
        break;

      case "winfetch":
      case "neofetch":
        output = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-white font-bold">akshay@WINDOWS-11-PRO</p>
            <p><span className="text-purple-400">OS:</span> Windows 11 WebOS Pro</p>
            <p><span className="text-purple-400">Shell:</span> PowerShell v7.4 (Turbopack)</p>
            <p><span className="text-purple-400">Experience:</span> Software Development Intern @ Worisgo</p>
          </div>
        );
        break;

      case "whoami":
        output = <p className="text-zinc-300 font-mono">guest@WINDOWS-11-PRO (Developer / Hiring Manager)</p>;
        break;

      case "matrix":
        output = (
          <p className="text-emerald-400 font-mono animate-pulse">
            01000001 01101011 01110011 01101000 01100001 01111001 &gt; Welcome to the Matrix. Engineering high-performance full-stack web applications.
          </p>
        );
        break;

      case "clear":
      case "cls":
        setHistory([]);
        return;

      default:
        output = (
          <p className="text-rose-400">
            Command not recognized: &apos;{trimmed}&apos;. Type <span className="underline font-bold">help</span> to view commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: trimmed, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="h-full min-h-[380px] flex flex-col justify-between font-mono text-xs text-zinc-300 select-text cursor-text"
    >
      {/* Windows Terminal Top Tab Bar */}
      <div className="flex items-center gap-1 border-b border-white/10 pb-2 mb-2 select-none">
        <div className="flex items-center gap-2 px-3 py-1 rounded-t-lg bg-black/60 border-t-2 border-t-[#0078D4] text-white text-xs font-mono">
          <Win11Terminal className="w-3.5 h-3.5" />
          <span>PowerShell</span>
        </div>
        <button className="p-1 rounded hover:bg-white/10 text-zinc-400" title="New Tab">
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Output Stream */}
      <div className="space-y-3 flex-1 overflow-y-auto pr-1 custom-os-scrollbar">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-[#0078D4] font-bold">PS C:\Users\Akshay&gt;</span>
              <span className="text-white font-medium">{item.command}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Interactive Input Prompt */}
      <div className="flex items-center gap-2 pt-3 border-t border-white/10 mt-2 select-none">
        <span className="text-[#0078D4] font-bold whitespace-nowrap">PS C:\Users\Akshay&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          placeholder="Type command ('help', 'projects', 'skills')..."
          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs placeholder-zinc-600"
        />
        <button
          onClick={() => {
            handleCommand(input);
            setInput("");
          }}
          className="p-1 text-zinc-400 hover:text-white transition-colors"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
