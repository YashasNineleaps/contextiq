"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight, Sparkles, Shield, ChevronRight } from "lucide-react";
import { ImplementationPlan } from "@/types";
import { ImplementationPlanModal } from "./ImplementationPlanModal";

interface RecommendedNextStepProps {
  steps: string[];
  plan: ImplementationPlan;
}

export function RecommendedNextStep({ steps, plan }: RecommendedNextStepProps) {
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl bg-gradient-to-r from-indigo-950/70 via-[#121B33] to-[#10172D] border border-indigo-500/40 p-6 sm:p-7 relative overflow-hidden shadow-xl shadow-indigo-950/25">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 rounded bg-indigo-500/20 text-indigo-400">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 font-mono">
                Actionable Engineering Path
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Recommended Next Steps
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Follow this sequence to solve the payload inconsistency without regressing backend guards.
            </p>

            {/* Checklist */}
            <div className="mt-5 space-y-2.5">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-xs sm:text-sm text-slate-200"
                >
                  <div className="w-6 h-6 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </div>
                  <span className="font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: CTA Box */}
          <div className="lg:w-72 bg-[#0E1528] border border-indigo-500/30 p-5 rounded-xl flex flex-col justify-between shadow-inner">
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                Execution Scope
              </div>
              <div className="text-base font-bold text-white">
                ~1-2 Hours Required
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                4 files identified, 5 edge cases flagged, low API impact. Ready to generate implementation spec.
              </p>
            </div>

            <button
              onClick={() => setIsPlanModalOpen(true)}
              className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Create Implementation Plan</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <ImplementationPlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        plan={plan}
      />
    </>
  );
}

