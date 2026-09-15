"use client";

import { useState } from "react";
import {
  Trello,
  Github,
  MessageSquare,
  BookOpen,
  FileCode,
  ChevronDown,
  ChevronUp,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { ContextSourcesCount } from "@/types";

interface ContextSourcesPanelProps {
  sources: ContextSourcesCount;
}

export function ContextSourcesPanel({ sources }: ContextSourcesPanelProps) {
  const [expandedSource, setExpandedSource] = useState<string | null>(null);

  const sourceList = [
    {
      id: "jira",
      name: "Jira / Issue Tracker",
      count: sources.jiraCount,
      icon: Trello,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/30",
      signals: [
        "VOL-142: Fix volunteer registration bug (In Progress)",
        "VOL-129: Support guest checkout (Merged)",
        "Sentry Issue #892: NullPointerException in registration DTO",
        "Sprint 18 Backlog: QA release blocker",
      ],
    },
    {
      id: "github",
      name: "GitHub Repository",
      count: sources.githubCount,
      icon: Github,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/30",
      signals: [
        "PR #142: Add backend registration validation (Merged)",
        "PR #151: Refactor registration form (Merged)",
        "PR #157: Fix event registration payload (Open WIP)",
        "Commit abc1234: Strict Zod validation schema",
        "Commit def5678: Form UI bindings update",
      ],
    },
    {
      id: "slack",
      name: "Slack Engineering Channels",
      count: sources.slackCount,
      icon: MessageSquare,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
      signals: [
        "#backend: Rahul Verma reported UI sending nulls",
        "#backend: Priya Sharma requested dual-layer validation",
        "#backend: Yashas traced dirty fields in React Hook Form",
        "#frontend: Elena Rostova confirmed missing payload normalizer",
        "#incidents: Marcus Brody tracked 65% drop in Sentry errors",
        "#incidents: Staging alert on City Food Drive event",
        "#backend: Agreement on regression test requirements",
      ],
    },
    {
      id: "confluence",
      name: "Confluence & RFCs",
      count: sources.confluenceCount,
      icon: BookOpen,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
      signals: [
        "Volunteer Registration API Specification v1.4",
        "Incident 84 Post-Mortem & Remediation Plan",
      ],
    },
    {
      id: "codebase",
      name: "Codebase & Schema",
      count: sources.codebaseCount,
      icon: FileCode,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      signals: [
        "src/components/RegistrationForm.tsx (UI Input)",
        "src/services/registration.service.ts (Validation & DB call)",
        "src/controllers/registrations.controller.ts (HTTP parsing)",
        "src/routes/registrations.routes.ts (Route & rate limit)",
        "src/lib/validation/payload-normalizer.ts (Sanitizer)",
        "prisma/schema.prisma (Volunteer & Registration models)",
        "src/middleware/auth.middleware.ts (Optional guest guard)",
        "src/services/notifications.service.ts (SendGrid trigger)",
        "tests/e2e/registration.spec.ts (Playwright test suite)",
      ],
    },
  ];

  const totalSignals =
    sources.jiraCount +
    sources.githubCount +
    sources.slackCount +
    sources.confluenceCount +
    sources.codebaseCount;

  return (
    <div className="bg-[#0D1527] border border-[#1A284A] rounded-xl p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Connected Context Sources
          </h3>
          <p className="text-xs text-slate-400">
            Expand any connected source to inspect raw signals ingested into the context engine
          </p>
        </div>
        <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-semibold">
          {totalSignals} Total Signals Correlated
        </span>
      </div>

      <div className="space-y-2 mt-4">
        {sourceList.map((source) => {
          const Icon = source.icon;
          const isExpanded = expandedSource === source.id;

          return (
            <div
              key={source.id}
              className="rounded-xl border border-[#1B2745] bg-[#10182E] overflow-hidden transition-all"
            >
              <button
                onClick={() =>
                  setExpandedSource(isExpanded ? null : source.id)
                }
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-[#14203B] transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg border ${source.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-white">
                    {source.name}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    {source.count} signals
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 py-3 bg-[#0A0F1D] border-t border-[#18233C] space-y-1.5">
                  <div className="text-[10px] uppercase font-bold text-slate-400 font-mono mb-2">
                    Ingested Signals:
                  </div>
                  {source.signals.map((sig, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-start gap-2 text-xs text-slate-300 font-mono"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{sig}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

