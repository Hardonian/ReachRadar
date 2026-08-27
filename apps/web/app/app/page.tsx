"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  WeatherGauge,
  SurfaceCard,
  ImpactBadge,
  ShiftBadge,
  DataQualityBadge,
  StatCard,
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
  const [activeSurface, setActiveSurface] = useState<string>("all");

  return (
    <div className="space-y-8">
      {/* 1. Header with Channel & Sync Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Channel Overview · Matched Finance Macro Cohort
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
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-700 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync Now</span>
          </button>
          <Link
            href="/app/channels/demo-ch-finance-1"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 text-xs font-bold font-mono text-slate-950 hover:bg-emerald-400 transition-all shadow-md"
          >
            <span>Deep Channel Inspector</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ReachRadar Health Score */}
        <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-5 flex flex-col justify-between">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            ReachRadar Score
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-slate-100">84</span>
            <span className="text-xs text-slate-500 font-mono">/ 100</span>
            <span className="text-xs font-mono font-bold text-emerald-400 ml-auto">HEALTHY</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Baseline integrity & engagement response robust
          </div>
        </div>

        {/* Global YouTube Weather */}
        <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-5 flex flex-col justify-between">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>YouTube Weather</span>
            <span className="text-[10px] text-emerald-400 font-mono">27 / 100</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">CALM</span>
            <span className="text-xs text-slate-400 font-mono">Platform-wide</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            2 shifts active in specific niche cohorts
          </div>
        </div>

        {/* Personal Channel Impact Status */}
        <div className="rounded-2xl border border-rose-900/30 bg-rose-950/10 p-5 flex flex-col justify-between">
          <div className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
            Personal Impact Status
          </div>
          <div className="mt-2">
            <ImpactBadge classification="LIKELY_AFFECTED" />
          </div>
          <div className="mt-2 text-xs text-slate-300">
            Channel reach down <strong className="text-rose-400 font-mono">-18.7%</strong> alongside cohort
          </div>
        </div>

        {/* 24h Distribution Movement */}
        <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-5 flex flex-col justify-between">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Cohort 24h Movement
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-rose-400">-18.7%</span>
            <span className="text-xs text-slate-500 font-mono">Median</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Affecting 64% of macro finance channels
          </div>
        </div>
      </div>

      {/* 3. Active Shift Alert Banner */}
      <div className="rounded-2xl border border-rose-500/40 bg-gradient-to-r from-rose-950/40 via-[#0D1322] to-slate-900 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <ShiftBadge score={activeShift.evidenceScore} />
            <span className="text-xs font-mono text-slate-400">First detected Aug 25</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            {activeShift.title}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            {activeShift.summary}
          </p>
        </div>

        <Link
          href={`/app/shifts/${activeShift.id}`}
          className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-rose-500/40 px-5 py-2.5 text-xs font-bold font-mono text-rose-300 hover:border-rose-400 hover:text-white transition-all"
        >
          <span>Inspect Shift Dossier</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 4. Distribution Surfaces Breakdown */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Distribution Surface Telemetry</h2>
          <span className="text-xs font-mono text-slate-500">Your Channel vs Matched Cohort</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SurfaceCard
            surfaceName="Browse Features"
            score={88}
            deltaPercentage={-26.0}
            cohortDeltaPercentage={-24.2}
          />
          <SurfaceCard
            surfaceName="Suggested Videos"
            score={22}
            deltaPercentage={1.5}
            cohortDeltaPercentage={0.8}
          />
          <SurfaceCard
            surfaceName="YouTube Search"
            score={15}
            deltaPercentage={-0.4}
            cohortDeltaPercentage={0.1}
          />
          <SurfaceCard
            surfaceName="Shorts Feed"
            score={12}
            deltaPercentage={0.0}
            cohortDeltaPercentage={-0.2}
          />
        </div>
      </div>

      {/* 5. Longitudinal Timeline Chart (Overlay: Creator vs Cohort vs Baseline) */}
      <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white">
              Longitudinal Distribution Overlay
            </h2>
            <p className="text-xs text-slate-400">
              Your Daily Views overlaid against Matched Cohort Median and Shift Anomaly Window.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400 flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Your Channel
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" /> Cohort Median
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="creatorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00F29D" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00F29D" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="cohortGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#475569" fontSize={11} tickLine={false} />
              <YAxis stroke="#475569" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#070A12", borderColor: "#1E293B", borderRadius: "0.75rem", fontSize: "12px", color: "#F8FAFC" }}
                formatter={(value: any) => [`${Number(value).toLocaleString()} views`]}
              />
              <ReferenceLine x="Aug 25" stroke="#F43F5E" strokeDasharray="3 3" label={{ value: "SHIFT DETECTED", fill: "#F43F5E", fontSize: 10, position: "top" }} />
              <Area type="monotone" dataKey="cohortMedian" stroke="#38BDF8" strokeWidth={2} fill="url(#cohortGrad)" name="Cohort Median" />
              <Area type="monotone" dataKey="creatorViews" stroke="#00F29D" strokeWidth={2.5} fill="url(#creatorGrad)" name="Your Views" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 6. Actionable Recommendation Section */}
      <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/20 via-[#0D1322] to-slate-900 p-6 md:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
            Deterministic Recommendation Engine · v1.0.0
          </span>
          <span className="text-xs font-mono text-slate-400">Confidence: 91/100</span>
        </div>

        <h2 className="text-2xl font-extrabold text-white font-mono">
          HOLD CURRENT STRATEGY
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          The decline in your views (-18.7%) closely mirrors the systemic Browse contraction occurring across 64% of channels in your matched finance cohort. Your content-response metrics (CTR 8.3%, AVD 6.2m) remain completely healthy.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-slate-300">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-emerald-400 font-bold block mb-1">✓ CTR Stable (8.3%)</span>
            Packaging and titles continue to generate healthy engagement.
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-emerald-400 font-bold block mb-1">✓ Retention Normal (54.2%)</span>
            Audience watch time is within expected baseline bounds.
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-amber-400 font-bold block mb-1">! Avoid Hasty Changes</span>
            Do not redo thumbnails or alter publishing cadence until shift stabilizes.
          </div>
        </div>
      </div>
    </div>
  );
}
