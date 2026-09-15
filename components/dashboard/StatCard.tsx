import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  subtext: string;
  icon: LucideIcon;
  trend?: string;
  color: "indigo" | "emerald" | "amber" | "rose" | "purple";
}

export function StatCard({
  label,
  value,
  subtext,
  icon: Icon,
  trend,
  color,
}: StatCardProps) {
  const colorMap = {
    indigo: {
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
      iconColor: "text-indigo-400",
      text: "text-indigo-300",
    },
    emerald: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      iconColor: "text-emerald-400",
      text: "text-emerald-300",
    },
    amber: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      iconColor: "text-amber-400",
      text: "text-amber-300",
    },
    rose: {
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
      iconColor: "text-rose-400",
      text: "text-rose-300",
    },
    purple: {
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      iconColor: "text-purple-400",
      text: "text-purple-300",
    },
  };

  const scheme = colorMap[color];

  return (
    <div className="bg-[#0D1527] border border-[#1A284A] hover:border-[#273B6B] rounded-xl p-4 transition-all duration-200 shadow-sm relative overflow-hidden group">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-300">{label}</span>
        <div className={`p-2 rounded-lg ${scheme.bg} ${scheme.border} border`}>
          <Icon className={`w-4 h-4 ${scheme.iconColor}`} />
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold font-mono text-white tracking-tight">
          {value}
        </span>
        {trend && (
          <span className="text-[11px] font-medium text-emerald-400">
            {trend}
          </span>
        )}
      </div>
      <p className="mt-1 text-[11px] text-slate-300 truncate">{subtext}</p>
    </div>
  );
}

