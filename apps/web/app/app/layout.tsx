"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@reachradar/ui";
import { brand } from "@reachradar/config";
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
  ChevronDown,
  Sparkles,
} from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = [
    { name: "Overview", href: "/app", icon: LayoutDashboard },
    { name: "YouTube Weather", href: "/app/weather", icon: Radar },
    { name: "Detected Shifts", href: "/app/shifts", icon: Activity },
    { name: "My Channels", href: "/app/channels", icon: Tv },
    { name: "Portfolio", href: "/app/portfolio", icon: Briefcase },
    { name: "Alerts", href: "/app/alerts", icon: Bell },
    { name: "Reports", href: "/app/reports", icon: FileText },
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
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-64 border-r border-slate-800/80 bg-[#0A0E17] flex flex-col justify-between p-4 transition-transform duration-200 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          <div className="px-2 py-3 mb-4">
            <Link href="/" className="inline-block">
              <Logo size="md" />
            </Link>
          </div>

          {/* Org / Workspace Selector */}
          <div className="mb-6 px-2">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-2.5 flex items-center justify-between">
              <div className="truncate">
                <div className="text-[10px] font-mono uppercase font-bold text-slate-500">Workspace</div>
                <div className="text-xs font-bold text-slate-200 truncate">Rivera Media Group</div>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                PRO
              </span>
            </div>
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
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-500"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Status & Demo badge */}
        <div className="space-y-3 pt-4 border-t border-slate-800/80 px-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Radar Active
            </span>
            <span className="text-emerald-400">NORMAL (27)</span>
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
              YouTube Weather: <strong className="text-emerald-400">CALM (27/100)</strong>
            </span>
            <span>·</span>
            <span>
              Browse: <strong className="text-slate-300">18 (Stable)</strong>
            </span>
            <span>·</span>
            <span>
              Shorts: <strong className="text-orange-400">74 (Elevated)</strong>
            </span>
          </div>
          <div className="shrink-0 text-slate-500">
            Telemetry Updated: 18 min ago
          </div>
        </div>

        <div className="p-6 md:p-8 max-w-7xl w-full mx-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
