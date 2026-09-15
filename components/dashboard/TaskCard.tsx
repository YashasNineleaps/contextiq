"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { EngineeringTask } from "@/types";
import {
  Sparkles,
  Clock,
  Radio,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface TaskCardProps {
  task: EngineeringTask;
  featured?: boolean;
}

export function TaskCard({ task, featured = false }: TaskCardProps) {
  const router = useRouter();

  const priorityStyles = {
    Critical: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    High: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    Medium: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    Low: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  };

  const domainStyles = {
    Backend: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    Frontend: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    Infrastructure: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    Payments: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    Security: "bg-red-500/10 text-red-300 border-red-500/20",
    Database: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  };

  const handleReconstruct = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/context/${task.id}?reconstruct=true`);
  };

  return (
    <div
      className={`rounded-xl transition-all duration-200 flex flex-col justify-between relative group ${featured
          ? "bg-gradient-to-b from-[#111A30] to-[#0D1426] border border-indigo-500/40 shadow-lg shadow-indigo-950/40 hover:border-indigo-400/60"
          : "bg-[#0D1527] border border-[#1A284A] hover:border-[#273B6B] hover:bg-[#101930]"
        } p-5`}
    >
      <div>
        {/* Header: ID, Domain, Priority */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs font-bold text-slate-300 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60">
              {task.id}
            </span>
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${domainStyles[task.domain] || domainStyles.Backend
                }`}
            >
              {task.domain}
            </span>
          </div>

          <span
            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border ${priorityStyles[task.priority]
              }`}
          >
            {task.priority} Priority
          </span>
        </div>

        {/* Task Title */}
        <Link href={`/context/${task.id}`} className="block group/title">
          <h3 className="text-base font-semibold text-white group-hover/title:text-indigo-300 transition-colors leading-snug">
            {task.title}
          </h3>
        </Link>

        {/* Task Description */}
        <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {task.description}
        </p>

        {/* Signals badge */}
        <div className="mt-4 flex items-center gap-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-1 text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 font-mono">
            <Radio className="w-3 h-3 text-indigo-400 animate-pulse" />
            <span>{task.signalsCount} signals</span>
          </div>
          <span className="text-slate-500">•</span>
          <span>{task.sourcesCount} sources analyzed</span>
        </div>
      </div>

      {/* Footer: Updated info & CTA Button */}
      <div className="mt-5 pt-3 border-t border-[#182442] flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <Clock className="w-3 h-3 text-slate-500" />
          <span>Updated {task.updatedAt}</span>
        </div>

        <button
          onClick={handleReconstruct}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${featured
              ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50 scale-[1.01]"
              : "bg-[#14203B] hover:bg-indigo-600/90 text-indigo-200 hover:text-white border border-[#233560] hover:border-indigo-500"
            }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Reconstruct Context</span>
          <ArrowRight className="w-3 h-3 text-white/70 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}

