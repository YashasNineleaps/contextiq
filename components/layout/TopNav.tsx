"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Sparkles,
  Maximize2,
  Minimize2,
  GitBranch,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface TopNavProps {
  isPresentationMode: boolean;
  onTogglePresentationMode: () => void;
}

export function TopNav({
  isPresentationMode,
  onTogglePresentationMode,
}: TopNavProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/search");
    }
  };

  const handleLoadDemo = () => {
    router.push("/context/VOL-142?reconstruct=true");
  };

  return (
    <header className="h-14 border-b border-[#1B2742] bg-[#090E1B]/90 backdrop-blur-md sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Project & Branch Indicator */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#131E35] border border-[#1E2E52] text-xs font-medium text-slate-200">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-semibold text-slate-100">Volunteer Hub</span>
          <span className="text-slate-400">/</span>
          <div className="flex items-center gap-1 text-slate-300 font-mono text-[11px]">
            <GitBranch className="w-3 h-3 text-indigo-400" />
            <span>main</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20">
          <Zap className="w-3 h-3 text-indigo-400" />
          <span>Cross-Source Synthesizer</span>
        </div>
      </div>

      {/* Middle: Quick Search Input */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex-1 max-w-md hidden sm:block relative"
      >
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search engineering context across Jira, PRs, Slack, files... (e.g. 'registration null')"
          className="w-full bg-[#111A2E] border border-[#1E2E52] focus:border-indigo-500 rounded-lg pl-9 pr-12 py-1.5 text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none transition-all shadow-inner"
        />
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
          ↵
        </span>
      </form>

      {/* Right: Demo Actions & Presentation Mode */}
      <div className="flex items-center gap-2.5">
        {/* Load Demo Scenario Button */}
        <button
          onClick={handleLoadDemo}
          title="Instantly load the Volunteer Registration Bug scenario"
          className="relative group flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-500/25 border border-indigo-400/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span className="font-semibold">Load Demo Scenario</span>
          <span className="hidden lg:inline text-[10px] bg-white/20 px-1 rounded font-mono text-white">
            VOL-142
          </span>
        </button>

        {/* Presentation Mode Toggle Button */}
        <button
          onClick={onTogglePresentationMode}
          title={isPresentationMode ? "Exit Presentation Mode" : "Enter Presentation Mode (Widescreen, hide sidebar)"}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border ${isPresentationMode
              ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm"
              : "bg-[#111A2E] text-slate-300 hover:text-white border-[#1E2E52] hover:bg-[#16233F]"
            }`}
        >
          {isPresentationMode ? (
            <>
              <Minimize2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Exit Focus</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline">Presentation Mode</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}

