"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WeatherGauge, SurfaceCard, ShiftBadge, SeismographTicker, RadarScanner } from "@reachradar/ui";
import { DEMO_PUBLIC_SHIFTS } from "@reachradar/providers";
import { Radar, Filter, RefreshCw, ArrowRight, ExternalLink, Globe, Activity, ShieldCheck, Zap } from "lucide-react";

export default function InternalWeatherStationPage() {
  const [selectedNiche, setSelectedNiche] = useState<string>("all");

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-sky-400" /> Platform Observability Terminal
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            Global Algorithm Weather Station & RAX Index
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Continuous real-time multi-surface volatility streams and cross-platform recommendation drift indices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedNiche}
            onChange={(e) => setSelectedNiche(e.target.value)}
            className="rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value="all">All Monitored Niches</option>
            <option value="finance">Finance & Wealth</option>
            <option value="technology">Technology & Hardware</option>
            <option value="fitness">Fitness & Wellness</option>
            <option value="gaming">Gaming</option>
          </select>
        </div>
      </div>

      {/* Live Seismograph Ticker */}
      <SeismographTicker
        initialRax={44.8}
        initialDelta={3.2}
        statusLabel="ELEVATED VOLATILITY"
      />

      {/* Radar Scanner & Surface Volatility Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-[#0B0F19] p-6 flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden space-y-4">
          <div className="flex items-center justify-between w-full border-b border-slate-800/80 pb-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase">
              Live Radar Sweep
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">3 PINGS ACTIVE</span>
          </div>

          <RadarScanner activeAnomaliesCount={2} sweepSpeedSeconds={3.5} />

          <div className="text-[11px] font-mono text-slate-400">
            Scanning 82 Monitored Cohorts across 4 Platforms
          </div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SurfaceCard surfaceName="Browse Features" score={68} deltaPercentage={-18.7} cohortDeltaPercentage={-16.2} />
          <SurfaceCard surfaceName="Suggested Videos" score={42} deltaPercentage={6.4} cohortDeltaPercentage={4.1} />
          <SurfaceCard surfaceName="YouTube Search" score={18} deltaPercentage={0.8} cohortDeltaPercentage={0.2} />
          <SurfaceCard surfaceName="Shorts Feed" score={74} deltaPercentage={-14.8} cohortDeltaPercentage={-12.4} />
        </div>
      </div>

      {/* Cross-Platform Volatility Matrix */}
      <div className="rounded-2xl border border-slate-800 bg-[#0B0F19] p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-sky-400" />
            <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Cross-Platform Algorithmic Co-Volatility
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">Correlation Benchmark</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">YouTube Shorts vs TikTok</span>
              <span className="text-amber-400 font-bold">r = 0.74</span>
            </div>
            <span className="text-amber-300 font-bold block text-[11px]">CO-VOLATILE SWIPE SHIFT</span>
            <p className="text-[10px] text-slate-500 font-sans">
              Both platforms elevated initial swipe-away retention requirements simultaneously.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">YouTube Browse vs TikTok</span>
              <span className="text-sky-400 font-bold">r = 0.32</span>
            </div>
            <span className="text-emerald-400 font-bold block text-[11px]">INDEPENDENT EXPANSION</span>
            <p className="text-[10px] text-slate-500 font-sans">
              Long-form browse redistribution is isolated to YouTube internal homepage indexing.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">YouTube Shorts vs IG Reels</span>
              <span className="text-amber-400 font-bold">r = 0.68</span>
            </div>
            <span className="text-amber-300 font-bold block text-[11px]">CO-VOLATILE DURATION</span>
            <p className="text-[10px] text-slate-500 font-sans">
              Vertical video algorithms reweighting 30s-60s vs &lt;15s audio loop dynamics.
            </p>
          </div>
        </div>
      </div>

      {/* Active Shift Events */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white font-mono">Active Anomaly Incidents</h2>

        <div className="space-y-4">
          {DEMO_PUBLIC_SHIFTS.map((shift) => (
            <div
              key={shift.id}
              className="rounded-2xl border border-slate-800 bg-[#0B0F19] p-6 space-y-4 shadow-xl hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-sky-400 uppercase">
                    {shift.cohortName}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs font-mono uppercase text-slate-400">{shift.surface}</span>
                </div>
                <ShiftBadge score={shift.evidenceScore} />
              </div>

              <h3 className="text-lg font-bold text-white font-sans">
                <Link href={`/app/shifts/${shift.id}`} className="hover:text-sky-400 transition-colors">
                  {shift.title}
                </Link>
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {shift.summary}
              </p>

              <div className="flex items-center justify-between pt-3 text-xs font-mono text-slate-400 border-t border-slate-800/60">
                <span>Affected: <strong className="text-rose-400">{shift.affectedChannelsPercentage}%</strong></span>
                <span>Median Delta: <strong className="text-rose-400">{shift.medianDistributionMovement}%</strong></span>
                <Link
                  href={`/app/shifts/${shift.id}`}
                  className="text-sky-400 font-bold hover:underline flex items-center gap-1.5"
                >
                  <span>Inspect Forensic Autopsy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
