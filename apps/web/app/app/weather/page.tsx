"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WeatherGauge, SurfaceCard, ShiftBadge } from "@reachradar/ui";
import { DEMO_PUBLIC_SHIFTS } from "@reachradar/providers";
import { Radar, Filter, RefreshCw, ArrowRight, ExternalLink } from "lucide-react";

export default function InternalWeatherStationPage() {
  const [selectedNiche, setSelectedNiche] = useState<string>("all");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            Telemetry Station
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            YouTube Algorithm Weather Station
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time cross-cohort volatility indices and anomaly telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedNiche}
            onChange={(e) => setSelectedNiche(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-mono text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Monitored Niches</option>
            <option value="finance">Finance & Wealth</option>
            <option value="technology">Technology & Hardware</option>
            <option value="fitness">Fitness & Wellness</option>
            <option value="gaming">Gaming</option>
          </select>
        </div>
      </div>

      {/* Volatility Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-[#0D1322] p-6 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase mb-2">
            Overall YouTube Environment
          </span>
          <WeatherGauge score={27} size="lg" />
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SurfaceCard surfaceName="Browse Features" score={18} deltaPercentage={-1.2} cohortDeltaPercentage={-0.8} />
          <SurfaceCard surfaceName="Suggested Videos" score={31} deltaPercentage={3.4} cohortDeltaPercentage={1.2} />
          <SurfaceCard surfaceName="YouTube Search" score={22} deltaPercentage={-0.5} cohortDeltaPercentage={0.1} />
          <SurfaceCard surfaceName="Shorts Feed" score={74} deltaPercentage={-14.8} cohortDeltaPercentage={-12.4} />
        </div>
      </div>

      {/* Active Shift Events */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Active Shift Incidents</h2>

        <div className="space-y-4">
          {DEMO_PUBLIC_SHIFTS.map((shift) => (
            <div
              key={shift.id}
              className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 space-y-4"
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

              <h3 className="text-lg font-bold text-white">
                <Link href={`/app/shifts/${shift.id}`} className="hover:text-emerald-400">
                  {shift.title}
                </Link>
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                {shift.summary}
              </p>

              <div className="flex items-center justify-between pt-2 text-xs font-mono text-slate-400 border-t border-slate-800/60">
                <span>Affected: <strong className="text-rose-400">{shift.affectedChannelsPercentage}%</strong></span>
                <span>Median Delta: <strong className="text-rose-400">{shift.medianDistributionMovement}%</strong></span>
                <Link
                  href={`/app/shifts/${shift.id}`}
                  className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Inspect Lineage</span>
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
