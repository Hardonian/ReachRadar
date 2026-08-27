"use client";

import React from "react";
import { CounterfactualImpact } from "@reachradar/domain";
import { TrendingDown, TrendingUp, DollarSign, Calendar, ShieldCheck } from "lucide-react";

export interface CounterfactualChartProps {
  impact: CounterfactualImpact;
}

export function CounterfactualChart({ impact }: CounterfactualChartProps) {
  const isLoss = impact.lostOrGainedViews < 0;
  const trajectories = impact.dailyTrajectories || [];

  // Compute SVG coordinates
  const maxVal = Math.max(
    ...trajectories.map((d) => Math.max(d.actual, d.expected, d.ci95Upper)),
    1000
  );
  const minVal = Math.min(
    ...trajectories.map((d) => Math.min(d.actual, d.expected, d.ci95Lower)),
    0
  );
  const range = maxVal - minVal || 1;

  const width = 100;
  const height = 100;

  const actualPoints = trajectories
    .map((d, i) => {
      const x = (i / Math.max(1, trajectories.length - 1)) * width;
      const y = height - ((d.actual - minVal) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  const expectedPoints = trajectories
    .map((d, i) => {
      const x = (i / Math.max(1, trajectories.length - 1)) * width;
      const y = height - ((d.expected - minVal) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  // Confidence Interval Polygon (upper forward + lower reversed)
  const ciUpper = trajectories.map((d, i) => {
    const x = (i / Math.max(1, trajectories.length - 1)) * width;
    const y = height - ((d.ci95Upper - minVal) / range) * height;
    return `${x},${y}`;
  });

  const ciLowerReversed = [...trajectories].reverse().map((d, i) => {
    const origIdx = trajectories.length - 1 - i;
    const x = (origIdx / Math.max(1, trajectories.length - 1)) * width;
    const y = height - ((d.ci95Lower - minVal) / range) * height;
    return `${x},${y}`;
  });

  const ciPolygonPoints = [...ciUpper, ...ciLowerReversed].join(" ");

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B0F19] p-5 space-y-6">
      {/* Header with KPI cards */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400">
            Counterfactual Econometric Modeling
          </span>
          <h3 className="text-base font-extrabold text-white mt-0.5">
            Actual Trajectory vs Synthetic Counterfactual Baseline
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Statistically isolates lost/gained reach and estimated RPM revenue impact with 95% confidence intervals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> 95% Confidence Bounds
          </span>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase block">Actual Reach</span>
          <span className="text-white font-bold text-base mt-1 block">
            {impact.actualViews.toLocaleString()}
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase block">Counterfactual Expected</span>
          <span className="text-sky-400 font-bold text-base mt-1 block">
            {impact.counterfactualExpectedViews.toLocaleString()}
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase block">Reach Differential</span>
          <span
            className={`font-bold text-base mt-1 flex items-center gap-1 ${
              isLoss ? "text-rose-400" : "text-emerald-400"
            }`}
          >
            {isLoss ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
            {impact.lostOrGainedViews > 0 ? `+${impact.lostOrGainedViews.toLocaleString()}` : impact.lostOrGainedViews.toLocaleString()}
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase block">Est. Revenue Impact</span>
          <span
            className={`font-bold text-base mt-1 flex items-center gap-0.5 ${
              isLoss ? "text-rose-400" : "text-emerald-400"
            }`}
          >
            <DollarSign className="w-4 h-4" />
            {impact.estimatedRpmImpactUsd > 0
              ? `+${impact.estimatedRpmImpactUsd.toFixed(2)}`
              : impact.estimatedRpmImpactUsd.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Counterfactual SVG Chart */}
      <div className="space-y-2">
        <div className="h-44 w-full relative bg-slate-950/70 rounded-xl border border-slate-800/80 p-3">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
            {/* Grid lines */}
            <line x1="0" y1="25" x2="100" y2="25" stroke="#1E293B" strokeDasharray="2 2" strokeWidth="0.5" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#1E293B" strokeDasharray="2 2" strokeWidth="0.5" />
            <line x1="0" y1="75" x2="100" y2="75" stroke="#1E293B" strokeDasharray="2 2" strokeWidth="0.5" />

            {/* 95% Confidence Interval Ribbon */}
            <polygon fill="#0284C7" fillOpacity="0.12" points={ciPolygonPoints} />

            {/* Expected Trajectory Line (Dashed Sky Blue) */}
            <polyline
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeDasharray="3 3"
              points={expectedPoints}
            />

            {/* Actual Trajectory Line (Solid Rose/Emerald) */}
            <polyline
              fill="none"
              stroke={isLoss ? "#FB7185" : "#34D399"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={actualPoints}
            />
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-slate-400 px-1 pt-1">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className={`w-3 h-0.5 ${isLoss ? "bg-rose-400" : "bg-emerald-400"}`} />
              <span>Actual Observed Views</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-b-2 border-dashed border-sky-400" />
              <span>Counterfactual Synthetic Baseline</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-2 bg-sky-500/20 rounded" />
              <span>95% CI Confidence Envelope</span>
            </span>
          </div>
          <span className="text-slate-500">Recovery Velocity: ~{impact.recoveryVelocityDays} Days</span>
        </div>
      </div>
    </div>
  );
}
