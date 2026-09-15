"use client";

import { useState } from "react";
import {
  Github,
  MessageSquare,
  Trello,
  BookOpen,
  Figma,
  CheckSquare,
  RefreshCw,
  CheckCircle2,
  Plug,
  ExternalLink,
} from "lucide-react";
import { MOCK_INTEGRATIONS } from "@/lib/mock-data/volunteer-hub";
import { IntegrationStatus } from "@/types";

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<IntegrationStatus[]>(MOCK_INTEGRATIONS);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const toggleConnection = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === "Connected" ? "Available" : "Connected";
          return {
            ...item,
            status: nextStatus,
            lastSync: nextStatus === "Connected" ? "Just now" : undefined,
          };
        }
        return item;
      })
    );
  };

  const handleSync = (id: string) => {
    setSyncingId(id);
    setTimeout(() => {
      setSyncingId(null);
      setIntegrations((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, lastSync: "Just now" } : item
        )
      );
    }, 800);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case "GitHub":
        return Github;
      case "Slack":
        return MessageSquare;
      case "Jira":
        return Trello;
      case "Confluence":
        return BookOpen;
      case "Linear":
        return CheckSquare;
      case "Figma":
        return Figma;
      default:
        return Plug;
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Connected Engineering Tools
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            ContextIQ reconstructs cross-tool context by listening to webhooks, PR diffs, channel threads, and ticket activity.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0E1528] border border-[#1A2645] text-xs text-slate-300 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>4 Active Enterprise Bridges</span>
        </div>
      </div>

      {/* Integration Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((item) => {
          const Icon = getIcon(item.name);
          const isConnected = item.status === "Connected";
          const isSyncing = syncingId === item.id;

          return (
            <div
              key={item.id}
              className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${isConnected
                  ? "bg-[#0D1527] border-[#1E2E52] hover:border-indigo-500/50 shadow-sm"
                  : "bg-[#090D18] border-[#152038] opacity-80"
                }`}
            >
              <div>
                {/* Top: Icon & Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2.5 rounded-xl bg-[#131E38] border border-[#1E2F56] text-white">
                    <Icon className="w-5 h-5 text-indigo-400" />
                  </div>

                  <span
                    className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border flex items-center gap-1 font-mono ${isConnected
                        ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                      }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-emerald-400" : "bg-slate-500"
                        }`}
                    />
                    <span>{item.status}</span>
                  </span>
                </div>

                {/* Name & Category */}
                <h3 className="text-base font-bold text-white tracking-tight">
                  {item.name}
                </h3>
                <span className="text-[10px] font-mono text-indigo-300 block mb-2">
                  {item.category}
                </span>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Footer: Sync info & Toggle button */}
              <div className="mt-5 pt-3 border-t border-[#16223D] flex items-center justify-between text-xs">
                {isConnected ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSync(item.id)}
                      disabled={isSyncing}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                      title="Sync now"
                    >
                      <RefreshCw
                        className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-indigo-400" : ""}`}
                      />
                    </button>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Synced {item.lastSync || "recently"}
                    </span>
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-400 font-mono">
                    Not connected
                  </span>
                )}

                <button
                  onClick={() => toggleConnection(item.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${isConnected
                      ? "bg-[#14203B] hover:bg-rose-950/40 text-slate-300 hover:text-rose-300 border border-[#233560] hover:border-rose-500/30"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30"
                    }`}
                >
                  {isConnected ? "Disconnect" : "Connect"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

