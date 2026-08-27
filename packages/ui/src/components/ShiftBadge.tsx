import React from "react";
import { getConfidenceLabel } from "@reachradar/config";

export interface ShiftBadgeProps {
  score: number;
  className?: string;
}

export const ShiftBadge: React.FC<ShiftBadgeProps> = ({ score, className = "" }) => {
  const conf = getConfidenceLabel(score);
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold font-mono tracking-wider border ${conf.badgeClass} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {conf.displayText} ({score}/100)
    </span>
  );
};
