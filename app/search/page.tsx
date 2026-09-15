"use client";

import { Suspense } from "react";
import { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  CheckCircle2,
  GitPullRequest,
  MessageSquare,
  FileCode,
  BookOpen,
  Trello,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";
import {
  MOCK_TASKS,
  MOCK_PRS,
  MOCK_SLACK_MESSAGES,
  MOCK_FILES,
  MOCK_DOCS,
} from "@/lib/mock-data/volunteer-hub";

type FilterTab = "All" | "Tasks" | "GitHub" | "Slack" | "Files" | "Docs";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get("q") || "registration null";
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<FilterTab>("All");

  const qLower = query.toLowerCase().trim();

  // Search filtering logic across entities
  const matchingTasks = useMemo(() => {
    if (!qLower) return MOCK_TASKS;
    return MOCK_TASKS.filter(
      (t) =>
        t.title.toLowerCase().includes(qLower) ||
        t.description.toLowerCase().includes(qLower) ||
        t.id.toLowerCase().includes(qLower) ||
        (qLower.includes("registration") && t.id === "VOL-142") ||
        (qLower.includes("null") && t.id === "VOL-142")
    );
  }, [qLower]);

  const matchingPRs = useMemo(() => {
    if (!qLower) return MOCK_PRS;
    return MOCK_PRS.filter(
      (p) =>
        p.title.toLowerCase().includes(qLower) ||
        p.relevanceExplanation.toLowerCase().includes(qLower) ||
        p.id.toLowerCase().includes(qLower) ||
        (qLower.includes("registration") && p.number === 142) ||
        (qLower.includes("null") && p.number === 142)
    );
  }, [qLower]);

  const matchingSlack = useMemo(() => {
    if (!qLower) return MOCK_SLACK_MESSAGES;
    return MOCK_SLACK_MESSAGES.filter(
      (s) =>
        s.content.toLowerCase().includes(qLower) ||
        s.author.toLowerCase().includes(qLower) ||
        s.channel.toLowerCase().includes(qLower) ||
        (qLower.includes("registration") && s.channel === "#backend") ||
        (qLower.includes("null") && s.content.includes("null"))
    );
  }, [qLower]);

  const matchingFiles = useMemo(() => {
    if (!qLower) return MOCK_FILES;
    return MOCK_FILES.filter(
      (f) =>
        f.path.toLowerCase().includes(qLower) ||
        f.relevance.toLowerCase().includes(qLower) ||
        f.summary.toLowerCase().includes(qLower) ||
        (qLower.includes("null") && f.name.includes("Registration"))
    );
  }, [qLower]);

  const matchingDocs = useMemo(() => {
    if (!qLower) return MOCK_DOCS;
    return MOCK_DOCS.filter(
      (d) =>
        d.title.toLowerCase().includes(qLower) ||
        d.excerpt.toLowerCase().includes(qLower) ||
        (qLower.includes("registration") && d.id === "DOC-1")
    );
  }, [qLower]);

  const totalResults =
    matchingTasks.length +
    matchingPRs.length +
    matchingSlack.length +
    matchingFiles.length +
    matchingDocs.length;

  const tabs: { name: FilterTab; count: number }[] = [
    { name: "All", count: totalResults },
    { name: "Tasks", count: matchingTasks.length },
    { name: "GitHub", count: matchingPRs.length },
    { name: "Slack", count: matchingSlack.length },
    { name: "Files", count: matchingFiles.length },
    { name: "Docs", count: matchingDocs.length },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Global Engineering Signal Search
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Search indexed artifacts across Jira tickets, GitHub pull requests, Slack messages, files, and architecture docs.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search engineering context (e.g., 'registration null', 'VOL-142', 'schema.prisma')..."
          className="w-full bg-[#0E1528] border border-indigo-500/30 focus:border-indigo-500 rounded-xl pl-12 pr-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none shadow-lg shadow-indigo-950/20 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#1A2645]">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex-shrink-0 ${activeTab === tab.name
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-[#0E1528] text-slate-400 hover:text-slate-200 border border-[#1A284A]"
              }`}
          >
            <span>{tab.name}</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${activeTab === tab.name
                  ? "bg-white/20 text-white"
                  : "bg-slate-800 text-slate-400"
                }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Results Feed */}
      <div className="space-y-6">
        {/* Tasks Section */}
        {(activeTab === "All" || activeTab === "Tasks") && matchingTasks.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Trello className="w-3.5 h-3.5 text-blue-400" />
              <span>Jira & Linear Tasks ({matchingTasks.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {matchingTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-4 rounded-xl bg-[#0D1527] border border-[#1A284A] hover:border-indigo-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-bold text-indigo-400">
                        {t.id}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                        {t.domain}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {t.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {t.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#18233C] flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      {t.signalsCount} correlated signals
                    </span>
                    <Link
                      href={`/context/${t.id}?reconstruct=true`}
                      className="flex items-center gap-1 text-xs text-indigo-300 hover:text-indigo-200 font-semibold"
                    >
                      <span>Reconstruct Context</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GitHub PRs Section */}
        {(activeTab === "All" || activeTab === "GitHub") && matchingPRs.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <GitPullRequest className="w-3.5 h-3.5 text-purple-400" />
              <span>GitHub Pull Requests ({matchingPRs.length})</span>
            </div>
            <div className="space-y-2.5">
              {matchingPRs.map((pr) => (
                <div
                  key={pr.id}
                  className="p-3.5 rounded-xl bg-[#0D1527] border border-[#1A284A] hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white">
                        {pr.id}
                      </span>
                      <span className="text-xs font-medium text-slate-200">
                        {pr.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {pr.relevanceExplanation}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400 flex-shrink-0">
                    <span className="text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      AI Relevance: {pr.aiRelevance}%
                    </span>
                    <span className="text-[11px] text-slate-400">{pr.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Slack Section */}
        {(activeTab === "All" || activeTab === "Slack") && matchingSlack.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
              <span>Slack Conversations ({matchingSlack.length})</span>
            </div>
            <div className="space-y-2.5">
              {matchingSlack.map((s) => (
                <div
                  key={s.id}
                  className="p-3.5 rounded-xl bg-[#0D1527] border border-[#1A284A] text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{s.author}</span>
                      <span className="text-slate-400">({s.authorRole})</span>
                    </div>
                    <span className="font-mono text-indigo-400">{s.channel}</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    "{s.content}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Files Section */}
        {(activeTab === "All" || activeTab === "Files") && matchingFiles.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <FileCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>Codebase Files ({matchingFiles.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matchingFiles.map((file) => (
                <div
                  key={file.path}
                  className="p-3.5 rounded-xl bg-[#0D1527] border border-[#1A284A] text-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="font-mono font-bold text-white text-xs truncate">
                      {file.path}
                    </div>
                    <p className="text-slate-400 text-xs mt-1.5 line-clamp-2">
                      {file.relevance}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#18233C] flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>{file.layer}</span>
                    <span>{file.changedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documentation Section */}
        {(activeTab === "All" || activeTab === "Docs") && matchingDocs.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Confluence & Architecture Docs ({matchingDocs.length})</span>
            </div>
            <div className="space-y-2.5">
              {matchingDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-xl bg-[#0D1527] border border-[#1A284A] text-xs flex items-start justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 font-bold text-white text-xs">
                      <span>{doc.title}</span>
                      <span className="text-[10px] font-mono bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300">
                        {doc.system}
                      </span>
                    </div>
                    <p className="text-slate-300 mt-1 leading-relaxed">
                      {doc.excerpt}
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono whitespace-nowrap">
                    {doc.lastUpdated}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {totalResults === 0 && (
          <div className="p-12 text-center bg-[#0D1527] border border-[#1A284A] rounded-2xl">
            <Search className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-white">No engineering signals found</h3>
            <p className="text-xs text-slate-400 mt-1">
              Try searching for "registration", "null", "VOL-142", or "backend".
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
          <span>Loading search index...</span>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}

