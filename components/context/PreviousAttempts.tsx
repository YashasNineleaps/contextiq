import { AlertTriangle, History, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { PreviousAttempt } from "@/types";

interface PreviousAttemptsProps {
  attempts: PreviousAttempt[];
  aiInterpretation: string;
}

export function PreviousAttempts({
  attempts,
  aiInterpretation,
}: PreviousAttemptsProps) {
  const getResultBadge = (result: PreviousAttempt["result"]) => {
    switch (result) {
      case "Partial improvement":
        return "bg-amber-500/10 text-amber-300 border-amber-500/30";
      case "Incomplete":
        return "bg-blue-500/10 text-blue-300 border-blue-500/30";
      case "Issue still reproducible":
        return "bg-rose-500/10 text-rose-300 border-rose-500/30";
      default:
        return "bg-slate-500/10 text-slate-300 border-slate-500/30";
    }
  };

  return (
    <div className="bg-[#0D1527] border border-amber-500/30 rounded-xl p-5 sm:p-6 space-y-4 relative overflow-hidden">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              What has already been tried?
            </h3>
            <p className="text-xs text-slate-400">
              Crucial context: prevents duplicating previous engineers' dead ends
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono self-start sm:self-auto">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{attempts.length} Previous Attempts Analyzed</span>
        </div>
      </div>

      {/* Attempts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-4">
        {attempts.map((att) => (
          <div
            key={att.attemptNumber}
            className="p-4 rounded-xl bg-[#10182E] border border-[#1B2745] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-indigo-400">
                  Attempt #{att.attemptNumber}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getResultBadge(
                    att.result
                  )}`}
                >
                  {att.result}
                </span>
              </div>

              <h4 className="text-xs font-bold text-white leading-snug">
                {att.approach}
              </h4>
              <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                {att.layer} {att.prNumber ? `• ${att.prNumber}` : ""}
              </span>

              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {att.details}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#18233C]">
              <span className="text-[10px] font-semibold text-rose-400 block mb-0.5">
                Why it didn't solve root cause:
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {att.whyItFailed}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* AI Interpretation Callout */}
      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-indigo-950/60 via-[#121A30] to-slate-900 border border-indigo-500/30">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 font-mono">
            AI Interpretation & Guidance
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
          {aiInterpretation}
        </p>
      </div>
    </div>
  );
}

