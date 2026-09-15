"use client";

import { useState } from "react";
import {
  MOCK_TASKS,
} from "@/lib/mock-data/volunteer-hub";
import { StatCard } from "@/components/dashboard/StatCard";
import { TaskCard } from "@/components/dashboard/TaskCard";
import { OnboardingBanner } from "@/components/dashboard/OnboardingBanner";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import {
  AlertCircle,
  GitPullRequest,
  AlertTriangle,
  Sparkles,
  Filter,
} from "lucide-react";

export default function DashboardPage() {
  const [selectedDomain, setSelectedDomain] = useState<string>("All");

  const domains = [
    "All",
    "Backend",
    "Frontend",
    "Infrastructure",
    "Payments",
    "Security",
    "Database",
  ];

  const filteredTasks =
    selectedDomain === "All"
      ? MOCK_TASKS
      : MOCK_TASKS.filter((t) => t.domain === selectedDomain);

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Onboarding Welcome Banner */}
      <OnboardingBanner />

      {/* Dashboard Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Good afternoon, Yashas
            </h1>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Here's what changed across your engineering work.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#0E162B] border border-[#1B2745] px-3 py-1.5 rounded-lg self-start sm:self-auto">
          <span className="text-indigo-400">Sprint 18</span>
          <span>•</span>
          <span>Volunteer Hub v2.4</span>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Tasks needing attention"
          value={8}
          subtext="3 high priority blocking QA"
          icon={AlertCircle}
          trend="+2 today"
          color="indigo"
        />
        <StatCard
          label="Open PRs"
          value={4}
          subtext="2 awaiting your code review"
          icon={GitPullRequest}
          trend="1 open WIP"
          color="purple"
        />
        <StatCard
          label="Recent incidents"
          value={2}
          subtext="Sentry alerts in staging"
          icon={AlertTriangle}
          trend="-65% errors"
          color="amber"
        />
        <StatCard
          label="Contexts reconstructed"
          value={17}
          subtext="~8.5 hours saved this week"
          icon={Sparkles}
          trend="+100% synthesized"
          color="emerald"
        />
      </div>

      {/* Main Section: Jump back into work */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#182442]">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Jump back into work
            </h2>
            <p className="text-xs text-slate-400">
              Select a task to reconstruct its engineering context across Jira, GitHub, Slack, and code.
            </p>
          </div>

          {/* Domain Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <Filter className="w-3.5 h-3.5 text-slate-500 mr-1 flex-shrink-0" />
            {domains.map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all flex-shrink-0 ${selectedDomain === domain
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-[#10182E] text-slate-400 hover:text-slate-200 border border-[#1A2645] hover:bg-[#14203B]"
                  }`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task, idx) => (
            <TaskCard
              key={task.id}
              task={task}
              featured={task.id === "VOL-142"}
            />
          ))}
        </div>
      </div>

      {/* Secondary Section: Activity & Signals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        {/* Value Proposition Highlight Card */}
        <div className="rounded-xl bg-gradient-to-br from-[#10182E] to-[#0A0F1D] border border-indigo-500/20 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Cross-Source Reasoning</span>
            </div>
            <h3 className="text-base font-bold text-white leading-snug">
              "What do I need to know before I start building?"
            </h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              ContextIQ doesn't just list search results. It correlates Git diffs, PR comments, and Slack discussions to tell you what previous engineers tried and why it failed.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-[#1C2A4D] flex items-center justify-between text-[11px] text-slate-300 font-mono">
            <span>Powered by ContextIQ AI</span>
            <span className="text-emerald-400">Zero DB required</span>
          </div>
        </div>
      </div>
    </div>
  );
}

