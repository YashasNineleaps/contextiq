"use client";

import { Sparkles, X, Eye } from "lucide-react";

interface PresentationBannerProps {
  onExit: () => void;
}

export function PresentationBanner({ onExit }: PresentationBannerProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-500/30 px-4 py-1.5 flex items-center justify-between text-xs text-indigo-200">
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        <span className="font-semibold text-white tracking-wide flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-indigo-400" />
          Hackathon / Presentation Mode Active
        </span>
        <span className="hidden sm:inline text-slate-400 text-[11px]">
          — Sidebar hidden, full width layout enabled for live demos.
        </span>
      </div>

      <button
        onClick={onExit}
        className="flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 hover:text-white border border-indigo-500/30 text-[11px] transition-colors"
      >
        <span>Exit Presentation</span>
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}

