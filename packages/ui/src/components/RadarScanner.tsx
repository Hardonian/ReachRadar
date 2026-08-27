"use client";

import React from "react";
import { Radio } from "lucide-react";

export function RadarScanner({
  activeAnomaliesCount = 3,
  sweepSpeedSeconds = 4,
}: {
  activeAnomaliesCount?: number;
  sweepSpeedSeconds?: number;
}) {
  return (
    <div className="relative flex items-center justify-center w-56 h-56 rounded-full bg-[#070A12] border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.08)] overflow-hidden">
      {/* Concentric Radar Rings */}
      <div className="absolute w-44 h-44 rounded-full border border-emerald-500/15" />
      <div className="absolute w-32 h-32 rounded-full border border-emerald-500/20" />
      <div className="absolute w-20 h-20 rounded-full border border-emerald-500/25" />
      <div className="absolute w-8 h-8 rounded-full border border-emerald-500/30 bg-emerald-500/10" />

      {/* Crosshairs */}
      <div className="absolute w-full h-[1px] bg-emerald-500/20" />
      <div className="absolute h-full w-[1px] bg-emerald-500/20" />

      {/* Rotating Sweep Cone */}
      <div
        className="absolute w-full h-full rounded-full origin-center pointer-events-none animate-spin"
        style={{
          animationDuration: `${sweepSpeedSeconds}s`,
          background: "conic-gradient(from 0deg, rgba(16, 185, 129, 0.35) 0deg, rgba(16, 185, 129, 0.05) 45deg, transparent 60deg)",
        }}
      />

      {/* Anomaly Ping 1 (Finance Browse) */}
      <div className="absolute top-12 right-14 flex items-center justify-center">
        <span className="absolute w-4 h-4 rounded-full bg-rose-500/40 animate-ping" />
        <span className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_8px_#F43F5E]" />
      </div>

      {/* Anomaly Ping 2 (Shorts Volatility) */}
      <div className="absolute bottom-14 left-12 flex items-center justify-center">
        <span className="absolute w-3.5 h-3.5 rounded-full bg-amber-500/40 animate-ping" />
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#F59E0B]" />
      </div>

      {/* Center Ping */}
      <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
    </div>
  );
}
