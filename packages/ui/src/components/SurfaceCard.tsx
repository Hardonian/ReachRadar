import React from "react";
import { getWeatherStatus } from "@reachradar/config";

export interface SurfaceCardProps {
  surfaceName: string;
  score: number;
  deltaPercentage: number;
  cohortDeltaPercentage?: number;
  className?: string;
}

export const SurfaceCard: React.FC<SurfaceCardProps> = ({
  surfaceName,
  score,
  deltaPercentage,
  cohortDeltaPercentage,
  className = "",
}) => {
  const status = getWeatherStatus(score);
  const isNegative = deltaPercentage < 0;
  const isStable = Math.abs(deltaPercentage) < 3;

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/50 p-4 transition-all hover:border-slate-700/80 ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {surfaceName}
        </span>
        <span
          className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider border ${status.badgeClass}`}
        >
          {status.label}
        </span>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-extrabold font-mono text-slate-100">{score}</span>
          <span className="text-xs text-slate-500 font-mono">/ 100</span>
        </div>

        <div className="text-right">
          <span
            className={`text-sm font-bold font-mono ${
              isStable
                ? "text-slate-400"
                : isNegative
                ? "text-rose-400"
                : "text-emerald-400"
            }`}
          >
            {deltaPercentage > 0 ? "+" : ""}
            {deltaPercentage.toFixed(1)}%
          </span>
          <div className="text-[10px] text-slate-500">24h movement</div>
        </div>
      </div>

      {cohortDeltaPercentage !== undefined && (
        <div className="mt-3 border-t border-slate-800/60 pt-2 flex items-center justify-between text-xs text-slate-400">
          <span>Cohort median</span>
          <span className="font-mono text-slate-300">
            {cohortDeltaPercentage > 0 ? "+" : ""}
            {cohortDeltaPercentage.toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
};
