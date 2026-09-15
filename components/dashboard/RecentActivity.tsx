import { GitPullRequest, MessageSquare, AlertTriangle, FileCode } from "lucide-react";

export function RecentActivity() {
  const events = [
    {
      id: "ev-1",
      type: "slack",
      title: "Rahul Verma posted in #backend",
      desc: "Registration API is still receiving null values from the UI for dietaryPreferences...",
      time: "22 min ago",
      icon: MessageSquare,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      id: "ev-2",
      type: "pr",
      title: "Elena Rostova merged PR #151",
      desc: "Refactor registration form UI and React Hook Form bindings",
      time: "2 hours ago",
      icon: GitPullRequest,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      id: "ev-3",
      type: "incident",
      title: "Sentry Alert: 35 registration drops logged",
      desc: "Volunteer signup payload error in staging cluster",
      time: "3 hours ago",
      icon: AlertTriangle,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      id: "ev-4",
      type: "commit",
      title: "Marcus Brody pushed to main",
      desc: "Add compound index on [eventId, email] in schema.prisma",
      time: "5 hours ago",
      icon: FileCode,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  return (
    <div className="bg-[#0D1527] border border-[#1A284A] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Live Engineering Signals</h3>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Syncing Live
        </span>
      </div>
      <div className="space-y-3">
        {events.map((ev) => {
          const Icon = ev.icon;
          return (
            <div
              key={ev.id}
              className="flex items-start gap-3 p-2.5 rounded-lg bg-[#111A2E]/60 border border-[#1B2844] hover:border-slate-700 transition-colors"
            >
              <div className={`p-2 rounded-lg border ${ev.color} mt-0.5`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-medium text-slate-200 truncate">
                    {ev.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                    {ev.time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 truncate mt-0.5">
                  {ev.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

