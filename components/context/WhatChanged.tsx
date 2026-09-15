import { Plus, Minus, AlertCircle, Sparkles } from "lucide-react";
import { WhatChangedItem } from "@/types";

interface WhatChangedProps {
  items: WhatChangedItem[];
}

export function WhatChanged({ items }: WhatChangedProps) {
  return (
    <div className="bg-[#0D1527] border border-[#1A284A] rounded-xl p-5 sm:p-6 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            What changed since you last looked?
          </h3>
          <p className="text-xs text-slate-400">
            Synthesized delta across commits, PR merges, and staging alerts
          </p>
        </div>
        <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Delta Active
        </span>
      </div>

      <div className="mt-3 divide-y divide-[#182442] font-mono text-xs">
        {items.map((item, idx) => {
          const isNegative = item.type === "alert" || item.type === "removed";

          return (
            <div
              key={idx}
              className="py-2.5 flex items-start gap-3 hover:bg-[#111A2E]/50 px-2 rounded-lg transition-colors"
            >
              <div
                className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 ${isNegative
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  }`}
              >
                {isNegative ? (
                  <Minus className="w-3.5 h-3.5" />
                ) : (
                  <Plus className="w-3.5 h-3.5" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <span
                  className={
                    isNegative ? "text-rose-200" : "text-emerald-200"
                  }
                >
                  {item.text}
                </span>
                <span className="ml-2 text-[10px] text-slate-400 font-sans">
                  via {item.source}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

