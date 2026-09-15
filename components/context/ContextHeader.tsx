"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  MessageSquare,
  Share2,
  Check,
  Radio,
  ArrowLeft,
} from "lucide-react";
import { ReconstructedContext } from "@/types";

interface ContextHeaderProps {
  context: ReconstructedContext;
  onReconstruct: () => void;
  onOpenAssistant: (initialQuestion?: string) => void;
}

export function ContextHeader({
  context,
  onReconstruct,
  onOpenAssistant,
}: ContextHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(
      `ContextIQ Brief: [${context.taskId}] ${context.taskTitle} - ${context.heroSummary}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 pb-6 border-b border-[#1A2645]">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 hover:text-white transition-colors text-slate-400"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <span>/</span>
          <span className="font-mono text-slate-400">Volunteer Hub</span>
          <span>/</span>
          <span className="font-mono text-indigo-400 font-semibold">{context.taskId}</span>
        </div>

        {/* Live Reconstructed Indicator */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-300 font-mono">
          <Radio className="w-3 h-3 text-indigo-400 animate-pulse" />
          <span>Context reconstructed: {context.signalsFound} signals across {context.sourcesAnalyzed} sources</span>
        </div>
      </div>

      {/* Main Title & Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-mono text-sm font-bold text-slate-300 px-2.5 py-0.5 rounded bg-[#131D33] border border-[#1E2E52]">
              {context.taskId}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
              Backend
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
              High Priority
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
            {context.taskTitle}
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Reconstruct Context */}
          <button
            onClick={onReconstruct}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#131E38] hover:bg-indigo-600/80 text-indigo-200 hover:text-white border border-indigo-500/30 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Reconstruct Context</span>
          </button>

          {/* Ask ContextIQ */}
          <button
            onClick={() => onOpenAssistant()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ask ContextIQ</span>
          </button>

          {/* Share Context */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-[#111A2E] hover:bg-[#182542] text-slate-300 hover:text-white border border-[#1E2E52] transition-colors"
            title="Copy engineering brief to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

