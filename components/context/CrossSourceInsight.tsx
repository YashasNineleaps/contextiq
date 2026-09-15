import { Sparkles, GitPullRequest, MessageSquare, FileCode, ArrowRight } from "lucide-react";

interface CrossSourceInsightProps {
  insight: string;
}

export function CrossSourceInsight({ insight }: CrossSourceInsightProps) {
  return (
    <div className="rounded-xl bg-gradient-to-r from-purple-950/40 via-indigo-950/50 to-slate-900 border border-purple-500/30 p-5 relative overflow-hidden shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Left icon pillar */}
        <div className="flex sm:flex-col items-center gap-1.5 p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 self-start">
          <GitPullRequest className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-[10px] sm:hidden">+</span>
          <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px] sm:hidden">+</span>
          <FileCode className="w-3.5 h-3.5 text-emerald-400" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">
              AI-Generated Cross-Source Insight
            </span>
            <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30 font-semibold">
              Key Differentiator
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-200 font-medium leading-relaxed">
            {insight}
          </p>

          <div className="mt-3 flex items-center gap-4 text-[11px] text-slate-300 font-mono">
            <span className="text-emerald-400">✓ GitHub PR #142 (Backend validation)</span>
            <span className="text-slate-400">✕</span>
            <span className="text-blue-400">✓ Slack #backend (Payload report)</span>
            <span className="text-slate-400">✕</span>
            <span className="text-purple-400">✓ RegistrationForm.tsx</span>
          </div>
        </div>
      </div>
    </div>
  );
}

