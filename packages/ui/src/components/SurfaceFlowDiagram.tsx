"use client";

import React from "react";
import { ArrowRight, Layers, Split, Radio } from "lucide-react";
import { SurfaceFlowVector } from "@reachradar/domain";

export interface SurfaceFlowDiagramProps {
  vectors?: SurfaceFlowVector[];
  breakdown?: Record<string, number>;
  regimeType?: string;
}

export function SurfaceFlowDiagram({
  vectors = [],
  breakdown = { browse: -24.2, suggested: 8.5, search: 1.2, shorts: -0.8, notifications: 0.4 },
  regimeType = "EXPLOITATION_CONSOLIDATION",
}: SurfaceFlowDiagramProps) {
  const surfaces = [
    { key: "browse", name: "Browse Home", delta: breakdown.browse ?? -18.5, color: "text-rose-400", barColor: "bg-rose-500" },
    { key: "suggested", name: "Suggested (Up Next)", delta: breakdown.suggested ?? 6.2, color: "text-emerald-400", barColor: "bg-emerald-500" },
    { key: "search", name: "Search Intent Queries", delta: breakdown.search ?? 0.8, color: "text-sky-400", barColor: "bg-sky-500" },
    { key: "shorts", name: "Shorts Feed", delta: breakdown.shorts ?? -2.1, color: "text-amber-400", barColor: "bg-amber-500" },
    { key: "notifications", name: "Push Notifications", delta: breakdown.notifications ?? 0.3, color: "text-slate-400", barColor: "bg-slate-500" },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B0F19] p-5 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-sky-400">
            <Split className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Multi-Surface Recommendation Redistribution Matrix
            </h3>
            <p className="text-xs text-slate-400">
              Directional flow vectors illustrating algorithm allocation shifts between surfaces.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold">
          <Radio className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
          <span>Regime: {regimeType}</span>
        </div>
      </div>

      {/* Surface Variance Bars */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase px-1">
          <span>Surface Channel</span>
          <span>Variance vs 28-Day Baseline</span>
        </div>
        {surfaces.map((s) => {
          const isNegative = s.delta < 0;
          const absVal = Math.min(100, Math.abs(s.delta) * 3);
          return (
            <div key={s.key} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-200 font-semibold">{s.name}</span>
                <span className={`font-bold ${s.color}`}>
                  {s.delta > 0 ? `+${s.delta.toFixed(1)}%` : `${s.delta.toFixed(1)}%`}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden flex">
                {isNegative ? (
                  <>
                    <div className="h-full bg-transparent flex-1" />
                    <div className={`h-full ${s.barColor} rounded-full`} style={{ width: `${absVal}%` }} />
                    <div className="h-full bg-slate-800 w-0.5" />
                    <div className="h-full bg-transparent flex-1" />
                  </>
                ) : (
                  <>
                    <div className="h-full bg-transparent flex-1" />
                    <div className="h-full bg-slate-800 w-0.5" />
                    <div className={`h-full ${s.barColor} rounded-full`} style={{ width: `${absVal}%` }} />
                    <div className="h-full bg-transparent flex-1" />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Directional Flow Vectors */}
      {vectors && vectors.length > 0 && (
        <div className="border-t border-slate-800/80 pt-4 space-y-3">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
            Identified Flow Vector Redistribution:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {vectors.map((vec, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span className="text-rose-400 font-bold">{vec.sourceSurface}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-emerald-400 font-bold">{vec.targetSurface}</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                  {vec.redistributionShare}% volume
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
