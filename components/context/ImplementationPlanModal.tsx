"use client";

import { useState } from "react";
import { ImplementationPlan } from "@/types";
import {
  X,
  Sparkles,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Shield,
  Layers,
  Copy,
  Check,
} from "lucide-react";

interface ImplementationPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: ImplementationPlan;
}

export function ImplementationPlanModal({
  isOpen,
  onClose,
  plan,
}: ImplementationPlanModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyPlan = () => {
    const markdown = `# Implementation Plan for ${plan.taskId}
**Estimated Effort**: ${plan.estimatedEffort}
**Risk**: ${plan.risk} | **API Impact**: ${plan.apiImpact} | **Database Impact**: ${plan.databaseImpact}
**Tests Required**: ${plan.testsRequired}

## Files to Modify
${plan.filesToModify.map((f) => `- [${f.action}] \`${f.path}\`: ${f.description}`).join("\n")}

## Edge Cases to Guard Against
${plan.edgeCases.map((e) => `- [ ] ${e}`).join("\n")}

## Execution Steps
${plan.steps.map((s) => `${s.stepNumber}. **${s.title}**: ${s.description}`).join("\n")}
`;
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#080B11]/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0E162B] border border-indigo-500/40 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl shadow-indigo-950/60 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#1B2745] flex items-center justify-between bg-gradient-to-r from-[#111A30] to-[#0E162B]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                AI Implementation Plan
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Task {plan.taskId} • Scoped Engineering Execution Spec
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Metadata Cards: API, DB, Risk, Effort */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[#121B30] border border-[#1E2E52]">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                API Impact
              </span>
              <span className="text-sm font-bold text-emerald-400 font-mono mt-0.5 block">
                {plan.apiImpact}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#121B30] border border-[#1E2E52]">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Database Impact
              </span>
              <span className="text-sm font-bold text-slate-200 font-mono mt-0.5 block">
                {plan.databaseImpact}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#121B30] border border-[#1E2E52]">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Risk Level
              </span>
              <span className="text-sm font-bold text-amber-400 font-mono mt-0.5 block">
                {plan.risk}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#121B30] border border-[#1E2E52]">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Estimated Effort
              </span>
              <span className="text-sm font-bold text-indigo-300 font-mono mt-0.5 block">
                {plan.estimatedEffort}
              </span>
            </div>
          </div>

          {/* Files to Modify */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-indigo-400" />
              <span>Files to Modify ({plan.filesToModify.length})</span>
            </h4>
            <div className="space-y-2">
              {plan.filesToModify.map((file) => (
                <div
                  key={file.path}
                  className="p-3 rounded-lg bg-[#111A2E] border border-[#1B2745] flex items-start gap-3"
                >
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono ${file.action === "Modify"
                        ? "bg-blue-500/15 text-blue-300 border border-blue-500/30"
                        : file.action === "Create"
                          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                          : "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                      }`}
                  >
                    {file.action}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-mono font-semibold text-white truncate">
                      {file.path}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {file.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Execution Steps */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>Recommended Step-by-Step Sequence</span>
            </h4>
            <div className="space-y-2.5">
              {plan.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-3 rounded-lg bg-[#111A2E] border border-[#1B2745] flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {step.stepNumber}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">
                      {step.title}
                    </h5>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Edge Cases */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Edge Cases to Test ({plan.edgeCases.length})</span>
              </h4>
              <span className="text-[11px] font-mono text-indigo-300">
                {plan.testsRequired} Automated Tests Required
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {plan.edgeCases.map((edgeCase, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-[#10182E] border border-[#1B2745] text-xs text-slate-300 flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>{edgeCase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1B2745] bg-[#0E162B] flex items-center justify-between gap-3">
          <button
            onClick={handleCopyPlan}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#131E35] hover:bg-[#1A284A] text-slate-200 border border-[#22355F] transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Plan Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Plan as Markdown</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

