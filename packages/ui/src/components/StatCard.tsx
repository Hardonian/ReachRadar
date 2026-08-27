import React from "react";

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    label?: string;
    isPositiveGood?: boolean;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  className = "",
}) => {
  return (
    <div className={`rounded-xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm ${className}`}>
      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</div>
      <div className="mt-2 flex items-baseline justify-between">
        <div className="text-3xl font-extrabold font-mono text-slate-100">{value}</div>
        {trend && (
          <span
            className={`text-xs font-mono font-bold ${
              trend.value === 0
                ? "text-slate-400"
                : trend.value > 0
                ? "text-emerald-400"
                : "text-rose-400"
            }`}
          >
            {trend.value > 0 ? "+" : ""}
            {trend.value.toFixed(1)}%
          </span>
        )}
      </div>
      {subtitle && <div className="mt-1 text-xs text-slate-500">{subtitle}</div>}
    </div>
  );
};
