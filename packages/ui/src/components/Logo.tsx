import React from "react";
import { brand } from "@reachradar/config";

export interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  showText = true,
  size = "md",
}) => {
  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      <svg
        className={`${iconSizes[size]} shrink-0 text-emerald-400`}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2" strokeOpacity="0.6" />
        <circle cx="24" cy="24" r="7" fill="currentColor" fillOpacity="0.9" />
        <path d="M24 24 L39 9 A21 21 0 0 1 45 24 Z" fill="currentColor" fillOpacity="0.3" />
        <line x1="24" y1="3" x2="24" y2="7" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="41" x2="24" y2="45" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="24" x2="7" y2="24" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        <line x1="41" y1="24" x2="45" y2="24" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {showText && (
        <span className={`${textSizes[size]} text-slate-100 font-extrabold tracking-tight`}>
          Reach<span className="text-emerald-400">Radar</span>
        </span>
      )}
    </div>
  );
};
