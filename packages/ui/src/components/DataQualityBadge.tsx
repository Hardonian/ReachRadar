import React from "react";
import { DataQualityTier } from "@reachradar/config";

export interface DataQualityBadgeProps {
  tier: DataQualityTier;
  className?: string;
}

export const DataQualityBadge: React.FC<DataQualityBadgeProps> = ({ tier, className = "" }) => {
  const map: Record<DataQualityTier, { text: string; classes: string }> = {
    HIGH: {
      text: "HIGH QUALITY",
      classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    GOOD: {
      text: "GOOD",
      classes: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    },
    LIMITED: {
      text: "LIMITED HISTORY",
      classes: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    INSUFFICIENT: {
      text: "INSUFFICIENT DATA",
      classes: "bg-zinc-800 text-zinc-400 border-zinc-700",
    },
  };

  const item = map[tier] || map.GOOD;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border font-mono ${item.classes} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {item.text}
    </span>
  );
};
