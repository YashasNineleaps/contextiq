"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Check, ArrowRight, X, Layers } from "lucide-react";

export function OnboardingBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950/80 via-[#0E162B] to-[#121B33] border border-indigo-500/30 p-5 sm:p-6 mb-8 shadow-xl shadow-indigo-950/20">
      {/* Background glow circle */}
      <div className="absolute -right-10 -top-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      <button
        onClick={() => setDismissed(true)}
        className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800/40 transition-colors"
        title="Dismiss onboarding banner"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Your engineering context, reconstructed.</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Stop context switching between Jira, GitHub, Slack, and code.
        </h2>

        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          ContextIQ connects scattered signals across your development stack into an actionable engineering story: what happened, what failed previously, which files matter, and what to do next.
        </p>

        {/* Pre-connected tools status */}
        <div className="mt-4 flex items-center flex-wrap gap-2 text-xs text-slate-300">
          <span className="text-slate-400 font-medium">Tools Connected:</span>
          {["GitHub", "Slack", "Jira", "Confluence"].map((tool) => (
            <span
              key={tool}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#131F3A] border border-[#22355F] text-slate-200 text-[11px]"
            >
              <Check className="w-3 h-3 text-emerald-400" />
              <span>{tool}</span>
            </span>
          ))}
        </div>

        {/* Quick Start Action */}
        <div className="mt-5 flex items-center flex-wrap gap-3">
          <Link
            href="/context/VOL-142?reconstruct=true"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            <span>Try Demo Task: Fix volunteer registration bug</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-[#131F3A] hover:bg-[#1C2C54] text-slate-300 hover:text-white border border-[#22355F] transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Search Signals</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

