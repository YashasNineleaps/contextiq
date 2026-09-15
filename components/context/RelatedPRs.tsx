import { GitPullRequest, CheckCircle2, Clock, GitMerge, FileCode, Zap } from "lucide-react";
import { PullRequest } from "@/types";

interface RelatedPRsProps {
  prs: PullRequest[];
}

export function RelatedPRs({ prs }: RelatedPRsProps) {
  const getStatusBadge = (status: PullRequest["status"]) => {
    switch (status) {
      case "merged":
        return {
          icon: GitMerge,
          text: "Merged",
          style: "bg-purple-500/15 text-purple-300 border-purple-500/30",
        };
      case "open":
        return {
          icon: GitPullRequest,
          text: "Open",
          style: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
        };
      default:
        return {
          icon: GitPullRequest,
          text: status,
          style: "bg-slate-500/15 text-slate-300 border-slate-500/30",
        };
    }
  };

  return (
    <div className="bg-[#0D1527] border border-[#1A284A] rounded-xl p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Related Pull Requests
          </h3>
          <p className="text-xs text-slate-400">
            PRs altering similar components or addressing related bugs
          </p>
        </div>
        <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
          {prs.length} Pull Requests
        </span>
      </div>

      <div className="space-y-3 mt-4">
        {prs.map((pr) => {
          const statusBadge = getStatusBadge(pr.status);
          const StatusIcon = statusBadge.icon;

          return (
            <div
              key={pr.id}
              className="p-4 rounded-xl bg-[#10182E] border border-[#1B2745] hover:border-[#273B6B] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header: ID, Status, AI Relevance */}
                <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {pr.id}
                    </span>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border flex items-center gap-1 ${statusBadge.style}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      <span>{statusBadge.text}</span>
                    </span>
                  </div>

                  {/* AI Relevance score */}
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
                    <Zap className="w-3 h-3 text-indigo-400" />
                    <span>AI relevance: {pr.aiRelevance}%</span>
                  </div>
                </div>

                {/* PR Title */}
                <h4 className="text-sm font-semibold text-slate-100">
                  {pr.title}
                </h4>

                {/* Relevance Explanation */}
                <p className="text-xs text-slate-300 mt-2 leading-relaxed bg-[#0A0E1A] p-2.5 rounded-lg border border-[#17233C]">
                  {pr.relevanceExplanation}
                </p>
              </div>

              {/* Footer: Author, date, files changed, diff */}
              <div className="mt-4 pt-3 border-t border-[#18233C] flex items-center justify-between text-[11px] text-slate-400 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-300">{pr.author}</span>
                  <span>•</span>
                  <span>{pr.date}</span>
                </div>

                <div className="flex items-center gap-3 font-mono">
                  <span>{pr.filesChanged} files changed</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-indigo-400">{pr.diffSummary}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

