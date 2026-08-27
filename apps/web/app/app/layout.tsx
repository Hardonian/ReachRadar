"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo, CopilotDrawer } from "@reachradar/ui";
import {
  LayoutDashboard,
  Radar,
  Activity,
  Tv,
  Briefcase,
  Bell,
  FileText,
  Users,
  Key,
  CreditCard,
  Settings,
  Menu,
  X,
  ExternalLink,
  Sparkles,
  Terminal,
  Radio,
  Layers,
} from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);

  const navigation = [
    { name: "Overview", href: "/app", icon: LayoutDashboard },
    { name: "Algorithm Weather & RAX", href: "/app/weather", icon: Radar },
    { name: "Detected Shifts", href: "/app/shifts", icon: Activity },
    { name: "Packaging Simulator", href: "/app/simulator", icon: Sparkles },
    { name: "Portfolio Roster", href: "/app/portfolio", icon: Briefcase },
    { name: "My Channels", href: "/app/channels", icon: Tv },
    { name: "Developer API", href: "/app/developer", icon: Terminal },
    { name: "Alerts & Webhooks", href: "/app/alerts", icon: Bell },
    { name: "Reports & Briefs", href: "/app/reports", icon: FileText },
    { name: "Team", href: "/app/team", icon: Users },
    { name: "Integrations", href: "/app/integrations", icon: Key },
    { name: "Billing", href: "/app/billing", icon: CreditCard },
    { name: "Settings", href: "/app/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Nav */}
      <div className="md:hidden flex items-center justify-between border-b border-slate-800 bg-[#0D1322] px-4 py-3 sticky top-0 z-50">
        <Link href="/app">
          <Logo size="sm" />
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCopilotOpen(true)}
            className="p-1.5 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1 text-xs font-mono font-bold"
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Ask Radar</span>
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-64 border-r border-slate-800/80 bg-[#0A0E17] flex flex-col justify-between p-4 transition-transform duration-200 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="overflow-y-auto pr-1">
          <div className="px-2 py-3 mb-4">
            <Link href="/" className="inline-block">
              <Logo size="md" />
            </Link>
          </div>

          {/* Org / Workspace Selector */}
          <div className="mb-4 px-2">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-2.5 flex items-center justify-between">
              <div className="truncate">
                <div className="text-[10px] font-mono uppercase font-bold text-slate-500">Workspace</div>
                <div className="text-xs font-bold text-slate-200 truncate">Rivera Media Group</div>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                PRO
              </span>
            </div>
          </div>

          {/* Ask Radar AI Trigger in Sidebar */}
          <div className="mb-4 px-2">
            <button
              onClick={() => setCopilotOpen(true)}
              className="w-full p-2.5 rounded-xl bg-gradient-to-r from-sky-950/80 to-indigo-950/80 hover:from-sky-900/80 hover:to-indigo-900/80 border border-sky-800/60 text-sky-200 text-xs font-mono font-bold flex items-center justify-between transition-all group shadow-md"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
                <span>Ask Radar Copilot</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-900/80 text-sky-300 font-mono">
                AI
              </span>
            </button>
          </div>

          {/* Nav items */}
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive =
                item.href === "/app"
                  ? pathname === "/app"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-sky-500/15 text-sky-300 border border-sky-500/30 font-bold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-sky-400" : "text-slate-500"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Status & User */}
        <div className="space-y-3 pt-4 border-t border-slate-800/80 px-2 shrink-0">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Radar Active
            </span>
            <span className="text-amber-400 font-bold">RAX 44.8</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-2.5 flex items-center justify-between text-xs">
            <div className="truncate">
              <div className="text-slate-200 font-bold text-[11px] truncate">Alex Rivera</div>
              <div className="text-slate-500 text-[10px] truncate">alex@riveramedia.io</div>
            </div>
            <Link href="/login" className="text-[10px] font-mono text-slate-400 hover:text-white">
              Sign out
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Telemetry Ticker */}
        <div className="border-b border-slate-800/60 bg-[#0A0E17]/60 px-6 py-2 flex items-center justify-between text-xs font-mono text-slate-400 overflow-x-auto gap-4">
          <div className="flex items-center gap-4 shrink-0">
            <span>
              Global Weather: <strong className="text-amber-400">ELEVATED (RAX: 44.8)</strong>
            </span>
            <span>·</span>
            <span>
              Browse: <strong className="text-rose-400">58.2 (Contraction)</strong>
            </span>
            <span>·</span>
            <span>
              Shorts: <strong className="text-amber-400">42.1 (Active)</strong>
            </span>
            <span>·</span>
            <span>
              TikTok: <strong className="text-emerald-400">35.4 (Calm)</strong>
            </span>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-400">Streaming Live Telemetry</span>
          </div>
        </div>

        <div className="p-6 md:p-8 max-w-7xl w-full mx-auto flex-1">
          {children}
        </div>
      </div>

      {/* Floating Ask Radar AI Copilot Trigger */}
      <button
        onClick={() => setCopilotOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-mono text-xs font-bold shadow-2xl flex items-center gap-2.5 transition-all hover:scale-105 border border-sky-400/30"
      >
        <Sparkles className="w-4 h-4 animate-pulse" />
        <span>Ask Radar AI</span>
      </button>

      {/* Ask Radar Copilot Drawer */}
      <CopilotDrawer isOpen={copilotOpen} onClose={() => setCopilotOpen(false)} />
    </div>
  );
}
