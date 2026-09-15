import { ShieldCheck, ArrowRight, Lightbulb } from "lucide-react";
import { EngineeringDecision } from "@/types";

interface EngineeringDecisionsProps {
  decisions: EngineeringDecision[];
}

export function EngineeringDecisions({ decisions }: EngineeringDecisionsProps) {
  return (
    <div className="bg-[#0D1527] border border-[#1A284A] rounded-xl p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Engineering Decisions
          </h3>
          <p className="text-xs text-slate-400">
            Explicit team agreements and architectural policies governing this task
          </p>
        </div>
        <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
          {decisions.length} Active Decisions
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-4">
        {decisions.map((dec, idx) => (
          <div
            key={dec.id}
            className="p-4 rounded-xl bg-[#10182E] border border-[#1B2745] hover:border-[#273B6B] transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  Decision #{idx + 1}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {dec.status}
                </span>
              </div>

              <h4 className="text-xs font-bold text-white leading-snug">
                {dec.title}
              </h4>

              <div className="mt-2.5 pt-2 border-t border-[#18233C]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Reason:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {dec.reason}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-2 text-[10px] text-slate-400 font-mono">
              Source: {dec.source}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

