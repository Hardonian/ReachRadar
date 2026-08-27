import React from "react";
import { getWeatherStatus } from "@reachradar/config";

export interface WeatherGaugeProps {
  score: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export const WeatherGauge: React.FC<WeatherGaugeProps> = ({
  score,
  className = "",
  size = "md",
  showLabel = true,
}) => {
  const status = getWeatherStatus(score);
  const clamped = Math.max(0, Math.min(100, Math.round(score)));

  const sizeClasses = {
    sm: "w-20 h-20 text-xl",
    md: "w-32 h-32 text-3xl",
    lg: "w-44 h-44 text-5xl",
  };

  const strokeWidth = size === "sm" ? 6 : size === "md" ? 8 : 10;
  const radius = size === "sm" ? 32 : size === "md" ? 52 : 72;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  const colorMap = {
    CALM: "#10B981", // emerald
    NORMAL: "#38BDF8", // sky
    ACTIVE: "#F59E0B", // amber
    ELEVATED: "#FB923C", // orange
    MAJOR_MOVEMENT: "#F43F5E", // rose
  };

  const ringColor = colorMap[status.status];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`relative flex items-center justify-center ${sizeClasses[size]}`}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Active progress arc */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={ringColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-extrabold tracking-tighter text-slate-100 font-mono">
            {clamped}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
            / 100
          </span>
        </div>
      </div>

      {showLabel && (
        <div className="mt-3 flex flex-col items-center">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${status.badgeClass}`}
          >
            {status.label}
          </span>
          <p className="text-xs text-slate-400 text-center mt-1 max-w-[200px]">
            {status.description}
          </p>
        </div>
      )}
    </div>
  );
};
