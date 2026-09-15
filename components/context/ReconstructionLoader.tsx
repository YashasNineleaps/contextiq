"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  Loader2,
  Search,
  Github,
  MessageSquare,
  FileCode,
  History,
  Lightbulb,
} from "lucide-react";

interface ReconstructionLoaderProps {
  onComplete: () => void;
}

export function ReconstructionLoader({ onComplete }: ReconstructionLoaderProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    { label: "Scanning project activity & Jira issues...", icon: Search },
    { label: "Correlating GitHub PRs & recent commits...", icon: Github },
    { label: "Reading Slack discussions & decision threads in #backend...", icon: MessageSquare },
    { label: "Mapping affected code & schema files...", icon: FileCode },
    { label: "Reviewing previous attempts & failure patterns...", icon: History },
    { label: "Synthesizing cross-source insights & recommendations...", icon: Lightbulb },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, [steps.length, onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#080B11]/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0E162B] border border-indigo-500/40 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl shadow-indigo-950/60 relative overflow-hidden">
        {/* Luminous accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 animate-pulse" />

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Reconstructing Engineering Context...
            </h3>
            <p className="text-xs text-slate-400">
              Correlating scattered signals across 5 enterprise tools
            </p>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-3.5 my-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={step.label}
                className={`flex items-center gap-3 text-xs transition-all duration-300 ${isDone
                    ? "text-slate-300"
                    : isCurrent
                      ? "text-indigo-300 font-semibold"
                      : "text-slate-600"
                  }`}
              >
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-slate-700" />
                  )}
                </div>
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? "text-indigo-400" : "text-slate-500"}`} />
                <span className="truncate">{step.label}</span>
              </div>
            );
          })}
        </div>

        {/* Live progress bar */}
        <div className="w-full bg-[#15213D] rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
          />
        </div>

        <p className="text-[11px] text-slate-400 text-center mt-4 font-mono">
          ContextIQ Engine • Volunteer Hub workspace
        </p>
      </div>
    </div>
  );
}

