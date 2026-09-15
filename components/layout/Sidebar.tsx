"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  Compass,
  Search,
  Layers,
  Settings,
  HelpCircle,
  Github,
  MessageSquare,
  Trello,
  BookOpen,
  Sparkles,
} from "lucide-react";

interface SidebarProps {
  isPresentationMode?: boolean;
}

export function Sidebar({ isPresentationMode = false }: SidebarProps) {
  const pathname = usePathname();

  if (isPresentationMode) {
    return null;
  }

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Tasks", href: "/dashboard", icon: CheckSquare },
    { name: "Context Explorer", href: "/context/VOL-142", icon: Compass },
    { name: "Search", href: "/search", icon: Search },
    { name: "Integrations", href: "/integrations", icon: Layers },
  ];

  const integrations = [
    { name: "GitHub", status: "Connected", icon: Github, color: "text-emerald-400" },
    { name: "Slack", status: "Connected", icon: MessageSquare, color: "text-emerald-400" },
    { name: "Jira", status: "Connected", icon: Trello, color: "text-emerald-400" },
    { name: "Confluence", status: "Connected", icon: BookOpen, color: "text-emerald-400" },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#0B101D] border-r border-[#1B2742] flex flex-col h-screen sticky top-0 select-none z-30">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#1B2742] flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-base tracking-tight font-mono">
                Context<span className="text-indigo-400">IQ</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                PROTOTYPE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">Engineering Context Layer</p>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div className="space-y-1">
          <div className="px-3 pb-2 text-[10px] font-semibold tracking-wider uppercase text-slate-400">
            Workspaces
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/" || pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${isActive
                    ? "bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/40"
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
                <span>{item.name}</span>
                {item.name === "Context Explorer" && (
                  <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                    VOL-142
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Integration Status Section */}
        <div className="space-y-2 pt-2 border-t border-[#17233D]">
          <div className="px-3 flex items-center justify-between text-[10px] font-semibold tracking-wider uppercase text-slate-400">
            <span>Signals Connected</span>
            <Link
              href="/integrations"
              className="text-[10px] text-indigo-400 hover:text-indigo-300 lowercase hover:underline font-normal"
            >
              manage
            </Link>
          </div>
          <div className="space-y-1">
            {integrations.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between px-3 py-1.5 rounded text-xs text-slate-300 hover:bg-slate-800/20"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[11px] font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50 animate-pulse" />
                    <span className="text-[10px] text-emerald-400/90 font-mono">Connected</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer / User Profile */}
      <div className="p-3 border-t border-[#1B2742] space-y-1 bg-[#090D18]">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/40"
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Settings</span>
        </Link>
        <div className="pt-2 px-2 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-inner">
            Y
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-white truncate">Yashas</div>
            <div className="text-[10px] text-slate-400 truncate">Staff Full-Stack Eng</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

