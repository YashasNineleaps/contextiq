import { MessageSquare, CheckCircle2, Sparkles, Hash } from "lucide-react";
import { SlackMessage } from "@/types";

interface SlackContextProps {
  messages: SlackMessage[];
}

export function SlackContext({ messages }: SlackContextProps) {
  const keyDecisionsCount = messages.filter((m) => m.decisionExtracted).length;

  return (
    <div className="bg-[#0D1527] border border-[#1A284A] rounded-xl p-5 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-indigo-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Slack Context & Decision Threads
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Internal engineering chatter correlated with this task
          </p>
        </div>

        {/* AI extracted decisions badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>AI extracted {keyDecisionsCount || 3} relevant decisions</span>
        </div>
      </div>

      <div className="space-y-3 mt-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-4 rounded-xl border transition-all ${msg.isKeyInsight
                ? "bg-[#111A30] border-indigo-500/30 shadow-sm"
                : "bg-[#0E1528] border-[#18233C]"
              }`}
          >
            {/* Header: Author, Role, Channel, Timestamp */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-slate-700 overflow-hidden flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {msg.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">
                      {msg.author}
                    </span>
                    <span className="text-[10px] text-slate-400 hidden sm:inline">
                      ({msg.authorRole})
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                <span className="bg-slate-800 px-1.5 py-0.5 rounded text-indigo-300 text-[10px]">
                  {msg.channel}
                </span>
                <span>{msg.timestamp}</span>
              </div>
            </div>

            {/* Content */}
            <p className="text-xs text-slate-200 leading-relaxed pl-9">
              "{msg.content}"
            </p>

            {/* Extracted Decision Banner if applicable */}
            {msg.decisionExtracted && (
              <div className="mt-3 ml-9 p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-xs flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-indigo-300 text-[11px] block">
                    AI Extracted Decision:
                  </span>
                  <span className="text-slate-300 text-[11px]">
                    {msg.decisionExtracted}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

