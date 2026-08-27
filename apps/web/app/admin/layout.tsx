"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@reachradar/ui";
import {
  ShieldAlert,
  Activity,
  Cpu,
  RefreshCw,
  Layers,
  BarChart,
  CreditCard,
  FileCheck,
  ArrowLeft,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const adminNav = [
    { name: "System Health", href: "/admin/health", icon: Activity },
    { name: "Jobs Queue", href: "/admin/jobs", icon: Cpu },
    { name: "Ingestion Runs", href: "/admin/ingestion", icon: RefreshCw },
    { name: "Cohorts & Privacy", href: "/admin/cohorts", icon: Layers },
    { name: "Shift Inspector", href: "/admin/shifts", icon: BarChart },
    { name: "Billing & Events", href: "/admin/billing", icon: CreditCard },
    { name: "Audit Logs", href: "/admin/audit", icon: FileCheck },
  ];

  return (
    <div className="min-h-screen bg-[#04060A] text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-rose-900/40 bg-[#070A12] p-4 flex flex-col justify-between">
        <div>
          <div className="px-2 py-3 mb-2 flex items-center justify-between">
            <Logo size="sm" />
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              ADMIN
            </span>
          </div>

          <div className="mb-4 px-2">
            <Link
              href="/app"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-emerald-400"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Exit to App</span>
            </Link>
          </div>

          <nav className="space-y-1">
            {adminNav.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium font-mono transition-all ${
                    isActive
                      ? "bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800 text-[10px] font-mono text-slate-500 px-2">
          Server Authorized Admin Role Required
        </div>
      </aside>

      <div className="flex-1 p-6 md:p-8 max-w-6xl w-full mx-auto">
        {children}
      </div>
    </div>
  );
}
