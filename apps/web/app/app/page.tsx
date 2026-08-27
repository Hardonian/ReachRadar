"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  WeatherGauge,
  SurfaceCard,
  ImpactBadge,
  ShiftBadge,
  DataQualityBadge,
  SeismographTicker,
  CounterfactualChart,
} from "@reachradar/ui";
import { DEMO_CHANNELS, DEMO_PUBLIC_SHIFTS } from "@reachradar/providers";
import {
  Radar,
  ArrowRight,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  Sparkles,
  RefreshCw,
  Eye,
  TrendingUp,
  Radio,
  Play,
  Terminal,
  Activity,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

// 30-Day Longitudinal Overlay Chart Data (Creator vs Cohort vs Shift Window)
const timelineData = [
  { date: "Aug 01", creatorViews: 34500, cohortMedian: 35000, baselineLower: 28000, baselineUpper: 42000 },
  { date: "Aug 05", creatorViews: 36200, cohortMedian: 35200, baselineLower: 28000, baselineUpper: 42000 },
  { date: "Aug 10", creatorViews: 33800, cohortMedian: 34800, baselineLower: 28000, baselineUpper: 42000 },
  { date: "Aug 15", creatorViews: 35100, cohortMedian: 35400, baselineLower: 28000, baselineUpper: 42000 },
  { date: "Aug 20", creatorViews: 34200, cohortMedian: 34900, baselineLower: 28000, baselineUpper: 42000 },
  { date: "Aug 22", creatorViews: 32400, cohortMedian: 33100, baselineLower: 28000, baselineUpper: 42000 },
  { date: "Aug 24", creatorViews: 29800, cohortMedian: 30200, baselineLower: 28000, baselineUpper: 42000 },
  { date: "Aug 25", creatorViews: 27900, cohortMedian: 28500, baselineLower: 28000, baselineUpper: 42000 }, // Shift Detected
  { date: "Aug 26", creatorViews: 28100, cohortMedian: 28450, baselineLower: 28000, baselineUpper: 42000 },
];

export default function DashboardOverviewPage() {
  const channel = DEMO_CHANNELS[0];
  const activeShift = DEMO_PUBLIC_SHIFTS[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* 1. Header with Channel & Sync Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
              Observability Command Center · Matched Finance Macro Cohort
            </span>
            <DataQualityBadge tier={channel.dataQualityTier} />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1 flex items-center gap-3">
            <span>{channel.title}</span>
            <span className="text-sm font-mono font-normal text-slate-400">
              ({channel.customUrl})
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/app/simulator"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-xs font-bold font-mono text-white transition-all shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Packaging Simulator</span>
          </Link>
          <Link
            href="/app/channels/demo-ch-finance-1"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-900 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-700 transition-colors shadow-sm"
          >
            <span>Deep Channel Inspector</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Live Seismograph Ticker */}
      <SeismographTicker
        initialRax={44.8}
        initialDelta={3.2}
        statusLabel="ELEVATED VOLATILITY"
      />

      {/* 3. Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ReachRadar Health Score */}
        <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-5 flex flex-col justify-between">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            ReachRadar Score
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-slate-100">84</span>
            <span className="text-xs text-slate-500 font-mono">/ 100</span>
          </div>
          <div className="mt-2 text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Robust Invariants Grounded</span>
          </div>
        </div>

        {/* 7-Day View Variance */}
        <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-5 flex flex-col justify-between">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            7-Day Reach Delta
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-rose-400">-19.1%</span>
          </div>
          <div className="mt-2 text-xs font-mono text-slate-400">
            Cohort: <strong className="text-rose-400">-18.7%</strong>
          </div>
        </div>

        {/* Impact Classification */}
        <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-5 flex flex-col justify-between">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Active Impact State
          </div>
          <div className="mt-3">
            <ImpactBadge classification="LIKELY_AFFECTED" />
          </div>
          <div className="mt-2 text-xs font-mono text-slate-400">
            Confidence: <strong className="text-white">91 / 100</strong>
          </div>
        </div>

        {/* Strategic Directive */}
        <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-5 flex flex-col justify-between">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Strategic Directive
          </div>
          <div className="mt-3 font-mono font-bold text-sky-400 text-lg">
            HOLD STRATEGY
          </div>
          <div className="mt-2 text-xs font-mono text-slate-400">
            Do not alter core package
          </div>
        </div>
      </div>

      {/* 4. Active Shift Incident Alert Banner */}
      <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-[#0D1322] to-slate-900 p-6 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mt-0.5 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  CONFIRMED COHORT ANOMALY
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Detected on Aug 25, 2026
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mt-1">
                {activeShift.title}
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                {activeShift.summary}
              </p>
            </div>
          </div>

          <Link
            href={`/app/shifts/${activeShift.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-mono text-xs font-bold transition-all shrink-0"
          >
            <span>View Full Forensic Autopsy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 5. 30-Day Longitudinal Overlay Chart */}
      <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              30-Day Longitudinal Distribution Trajectory
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Creator views plotted against matched cohort median and 28-day baseline bounds.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="text-xs font-mono text-slate-300">Creator</span>
            <span className="w-3 h-3 rounded-full bg-sky-400 ml-2" />
            <span className="text-xs font-mono text-slate-300">Cohort Median</span>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="colorCreator" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F43F5E" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCohort" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#64748B" fontSize={11} fontFamily="monospace" />
              <YAxis stroke="#64748B" fontSize={11} fontFamily="monospace" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0B0F19",
                  borderColor: "#1E293B",
                  borderRadius: "0.75rem",
                  fontSize: "0.75rem",
                  fontFamily: "monospace",
                }}
              />
              <Area
                type="monotone"
                dataKey="creatorViews"
                stroke="#F43F5E"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorCreator)"
                name="Your Channel Views"
              />
              <Area
                type="monotone"
                dataKey="cohortMedian"
                stroke="#38BDF8"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#colorCohort)"
                name="Cohort Median Views"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 6. Quick Launch Grid: Simulator, Developer API & Agency Heatmap */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <Link
          href="/app/simulator"
          className="p-5 rounded-2xl border border-slate-800 bg-[#0D1322] hover:border-slate-700 transition-all space-y-2.5 group"
        >
          <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 w-fit">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors">
            AI Packaging Simulator
          </h3>
          <p className="text-[11px] text-slate-400 font-sans">
            Test planned video titles and thumbnail contrast against current platform weather before uploading.
          </p>
        </Link>

        <Link
          href="/app/portfolio"
          className="p-5 rounded-2xl border border-slate-800 bg-[#0D1322] hover:border-slate-700 transition-all space-y-2.5 group"
        >
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 w-fit">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
            Roster Risk Heatmap
          </h3>
          <p className="text-[11px] text-slate-400 font-sans">
            Monitor client channel distribution exposure and export 1-click branded intelligence briefs.
          </p>
        </Link>

        <Link
          href="/app/developer"
          className="p-5 rounded-2xl border border-slate-800 bg-[#0D1322] hover:border-slate-700 transition-all space-y-2.5 group"
        >
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 w-fit">
            <Terminal className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
            Developer API Sandbox
          </h3>
          <p className="text-[11px] text-slate-400 font-sans">
            Programmatic access to real-time algorithm volatility telemetry, OpenAPI spec, and TypeScript SDK.
          </p>
        </Link>
      </div>
    </div>
  );
}
