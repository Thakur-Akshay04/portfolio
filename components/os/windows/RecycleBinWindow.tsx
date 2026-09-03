"use client";

import React, { useState } from "react";
import { Trash2, RefreshCw, FileCode, CheckCircle2 } from "lucide-react";
import { Win11RecycleBin } from "@/components/icons/Win11Icons";

export default function RecycleBinWindow() {
  const [items, setItems] = useState([
    { id: 1, name: "legacy_jquery_code.js", size: "48 KB", date: "2024-01-12", reason: "Replaced with modern Next.js 16 & React 19" },
    { id: 2, name: "cors_headache_bug.log", size: "12 KB", date: "2024-06-20", reason: "Squashed and resolved with reverse proxy" },
    { id: 3, name: "overcomplicated_state_machine.ts", size: "94 KB", date: "2024-11-05", reason: "Refactored into clean modular hooks" },
    { id: 4, name: "slow_unindexed_sql_queries.sql", size: "8 KB", date: "2025-02-14", reason: "Optimized with PostgreSQL indices and pgvector" },
  ]);

  const [restoredCount, setRestoredCount] = useState(0);

  const handleEmpty = () => {
    setItems([]);
  };

  const handleRestore = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setRestoredCount((prev) => prev + 1);
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto text-xs text-zinc-300 select-none">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-[#121217] border border-white/10">
        <div className="flex items-center gap-2.5">
          <Win11RecycleBin className="w-5 h-5" isFull={items.length > 0} />
          <span className="font-semibold text-white">Recycle Bin ({items.length} items)</span>
        </div>

        <div className="flex items-center gap-2">
          {items.length > 0 && (
            <button
              onClick={handleEmpty}
              className="px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 font-medium transition-colors"
            >
              Empty Recycle Bin
            </button>
          )}
        </div>
      </div>

      {restoredCount > 0 && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Restored item back to active repository history!</span>
        </div>
      )}

      {/* Items list */}
      {items.length === 0 ? (
        <div className="p-12 text-center text-zinc-500 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
          <Trash2 className="w-8 h-8 mx-auto text-zinc-600 opacity-50" />
          <p className="text-zinc-300 font-medium">The Recycle Bin is empty.</p>
          <p className="text-[11px] text-zinc-500">All bugs, legacy code, and technical debt have been cleaned up!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <FileCode className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                <div className="space-y-0.5">
                  <div className="font-mono font-semibold text-zinc-200">{item.name}</div>
                  <div className="text-[11px] text-zinc-400 flex items-center gap-2">
                    <span className="text-[#0078D4]">{item.reason}</span>
                    <span>•</span>
                    <span>{item.size}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleRestore(item.id)}
                className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] border border-white/10 flex items-center gap-1.5 transition-colors"
                title="Restore item"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Restore</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
