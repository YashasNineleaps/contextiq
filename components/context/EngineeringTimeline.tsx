import {
  Trello,
  GitPullRequest,
  MessageSquare,
  GitCommit,
  BookOpen,
  Rocket,
  Lightbulb,
  ArrowDown,
} from "lucide-react";
import { TimelineItem } from "@/types";

interface EngineeringTimelineProps {
  timeline: TimelineItem[];
}

export function EngineeringTimeline({ timeline }: EngineeringTimelineProps) {
  const getIcon = (type: TimelineItem["type"]) => {
    switch (type) {
      case "jira":
        return { icon: Trello, color: "text-blue-400 bg-blue-500/10 border-blue-500/30" };
      case "slack":
        return { icon: MessageSquare, color: "text-amber-400 bg-amber-500/10 border-amber-500/30" };
      case "pr":
        return { icon: GitPullRequest, color: "text-purple-400 bg-purple-500/10 border-purple-500/30" };
      case "commit":
        return { icon: GitCommit, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" };
      case "doc":
        return { icon: BookOpen, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30" };
      case "deployment":
        return { icon: Rocket, color: "text-rose-400 bg-rose-500/10 border-rose-500/30" };
      case "decision":
      default:
        return { icon: Lightbulb, color: "text-indigo-400 bg-indigo-500/15 border-indigo-500/40" };
    }
  };

  return (
    <div className="bg-[#0D1527] border border-[#1A284A] rounded-xl p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Engineering Timeline
          </h3>
          <p className="text-xs text-slate-400">
            Chronological progression of bugs, pull requests, Slack chats, and recommendations
          </p>
        </div>
        <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
          5 Key Milestones
        </span>
      </div>

      <div className="relative mt-6 space-y-6 before:absolute before:inset-0 before:left-4 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500/50 before:via-purple-500/40 before:to-slate-700">
        {timeline.map((item, idx) => {
          const { icon: Icon, color } = getIcon(item.type);
          const isLast = idx === timeline.length - 1;

          return (
            <div key={item.id} className="relative flex items-start gap-4 pl-1 group">
              {/* Icon Node */}
              <div
                className={`relative z-10 w-8 h-8 rounded-full border ${color} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-4 h-4" />
              </div>

              {/* Content Card */}
              <div className="flex-1 bg-[#10182E] border border-[#1B2745] hover:border-[#273B6B] p-4 rounded-xl transition-all shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">
                      {item.title}
                    </span>
                    {item.link && (
                      <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
                        {item.link}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-300 font-mono">
                    {item.date} {item.author ? `• ${item.author}` : ""}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {item.result && (
                  <div className="mt-2.5 pt-2 border-t border-[#19243F] flex items-center gap-2 text-xs">
                    <span className="text-[11px] font-semibold text-slate-400">Result:</span>
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded ${item.result.includes("reproducible") || item.result.includes("Partial")
                          ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                          : "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                        }`}
                    >
                      {item.result}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

