import React from "react";
import { ImpactClassification } from "@reachradar/domain";

export interface ImpactBadgeProps {
  classification: ImpactClassification;
  className?: string;
}

export const ImpactBadge: React.FC<ImpactBadgeProps> = ({ classification, className = "" }) => {
  const map: Record<ImpactClassification, { text: string; classes: string }> = {
    LIKELY_AFFECTED: {
      text: "LIKELY AFFECTED",
      classes: "bg-rose-500/10 text-rose-300 border-rose-500/30",
    },
    NOT_CLEARLY_AFFECTED: {
      text: "NOT CLEARLY AFFECTED",
      classes: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    },
    OUTPERFORMING_COHORT: {
      text: "OUTPERFORMING COHORT",
      classes: "bg-sky-500/10 text-sky-300 border-sky-500/30",
    },
    CHANNEL_SPECIFIC_DECLINE: {
      text: "CHANNEL-SPECIFIC DECLINE",
      classes: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    },
    INSUFFICIENT_DATA: {
      text: "INSUFFICIENT DATA",
      classes: "bg-zinc-800 text-zinc-400 border-zinc-700",
    },
  };

  const item = map[classification] || map.NOT_CLEARLY_AFFECTED;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border font-mono ${item.classes} ${className}`}
    >
      {item.text}
    </span>
  );
};
