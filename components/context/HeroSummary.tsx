import { Sparkles, ShieldCheck, Database, Clock, Zap } from "lucide-react";
import { ReconstructedContext } from "@/types";

interface HeroSummaryProps {
  context: ReconstructedContext;
}

export function HeroSummary({ context }: HeroSummaryProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#101932] via-[#0E1528] to-[#0A0F1D] border border-indigo-500/40 p-6 sm:p-7 shadow-xl shadow-indigo-950/30">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Tag */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <h2 className="text-base font-bold text-white tracking-tight">
            Here's what you need to know
          </h2>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>High Synthesis Accuracy</span>
        </div>
      </div>

      {/* Synthesized Story */}
      <div className="mt-3 text-sm sm:text-[15px] text-slate-200 leading-relaxed font-normal space-y-3">
        <p className="bg-indigo-950/30 p-4 rounded-xl border border-indigo-500/20 text-indigo-100">
          {context.heroSummary}
        </p>
      </div>

      {/* Metric Callouts Below Summary */}
      <div className="mt-6 pt-5 border-t border-[#1C2A4A] grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Confidence Score */}
        <div className="flex items-center gap-3 bg-[#0D1426] p-3 rounded-xl border border-[#1A2644]">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-300 font-medium">Confidence Score</div>
            <div className="text-lg font-bold font-mono text-white flex items-center gap-1.5">
              <span>{context.confidenceScore}%</span>
              <span className="text-[10px] text-emerald-400 font-normal">Verified</span>
            </div>
          </div>
        </div>

        {/* Related Sources */}
        <div className="flex items-center gap-3 bg-[#0D1426] p-3 rounded-xl border border-[#1A2644]">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-300 font-medium">Related Signals</div>
            <div className="text-lg font-bold font-mono text-white">
              {context.signalsFound} signals
            </div>
          </div>
        </div>

        {/* Last Activity */}
        <div className="flex items-center gap-3 bg-[#0D1426] p-3 rounded-xl border border-[#1A2644]">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-300 font-medium">Last Activity</div>
            <div className="text-lg font-bold font-mono text-white">
              {context.lastActivity}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

