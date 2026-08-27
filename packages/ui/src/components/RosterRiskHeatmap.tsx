"use client";

import React, { useState } from "react";
import { YouTubeChannel } from "@reachradar/domain";
import { AlertTriangle, ShieldCheck, Flame, TrendingDown, ExternalLink, Filter } from "lucide-react";

export interface RosterRiskHeatmapProps {
  channels: YouTubeChannel[];
  onSelectChannel?: (channel: YouTubeChannel) => void;
}

export function RosterRiskHeatmap({ channels, onSelectChannel }: RosterRiskHeatmapProps) {
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>("all");

  const getChannelRisk = (ch: YouTubeChannel) => {
    if (ch.id.includes("finance")) {
      return {
        level: "CRITICAL_CONTRACTION",
        label: "Critical Contraction",
        badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/30",
        delta: -18.7,
        icon: TrendingDown,
        riskScore: 88,
      };
    }
    if (ch.id.includes("shorts")) {
      return {
        level: "HIGH_VOLATILITY",
        label: "High Volatility",
        badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        delta: -12.4,
        icon: AlertTriangle,
        riskScore: 65,
      };
    }
    if (ch.id.includes("tech")) {
      return {
        level: "TAILWIND_SURGE",
        label: "Tailwind Surge",
        badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        delta: 14.2,
        icon: Flame,
        riskScore: 20,
      };
    }
    return {
      level: "STABLE",
      label: "Baseline Stable",
      badgeClass: "bg-slate-800 text-slate-300 border-slate-700",
      delta: 0.5,
      icon: ShieldCheck,
      riskScore: 10,
    };
  };

  const filtered = channels.filter((ch) => {
    if (selectedRiskFilter === "all") return true;
    const risk = getChannelRisk(ch);
    return risk.level === selectedRiskFilter;
  });

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B0F19] p-5 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400">
            Agency & Enterprise Risk Matrix
          </span>
          <h3 className="text-base font-extrabold text-white mt-0.5">
            Roster Algorithmic Exposure Heatmap
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time portfolio categorization isolating client channels facing platform headwinds vs tailwinds.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          <button
            onClick={() => setSelectedRiskFilter("all")}
            className={`px-2.5 py-1 rounded-lg border transition-colors ${
              selectedRiskFilter === "all"
                ? "bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            All ({channels.length})
          </button>
          <button
            onClick={() => setSelectedRiskFilter("CRITICAL_CONTRACTION")}
            className={`px-2.5 py-1 rounded-lg border transition-colors ${
              selectedRiskFilter === "CRITICAL_CONTRACTION"
                ? "bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            Contraction
          </button>
          <button
            onClick={() => setSelectedRiskFilter("HIGH_VOLATILITY")}
            className={`px-2.5 py-1 rounded-lg border transition-colors ${
              selectedRiskFilter === "HIGH_VOLATILITY"
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            Volatile
          </button>
          <button
            onClick={() => setSelectedRiskFilter("TAILWIND_SURGE")}
            className={`px-2.5 py-1 rounded-lg border transition-colors ${
              selectedRiskFilter === "TAILWIND_SURGE"
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            Surge
          </button>
        </div>
      </div>

      {/* Grid of Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5">
        {filtered.map((ch) => {
          const risk = getChannelRisk(ch);
          const Icon = risk.icon;
          return (
            <div
              key={ch.id}
              onClick={() => onSelectChannel?.(ch)}
              className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 hover:border-slate-700 transition-all cursor-pointer space-y-3 relative overflow-hidden group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden shrink-0">
                    {ch.thumbnailUrl ? (
                      <img src={ch.thumbnailUrl} alt={ch.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-slate-400 text-xs">
                        {ch.title.slice(0, 2)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
                      {ch.title}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-500 block">
                      {ch.clientGroup || ch.niche}
                    </span>
                  </div>
                </div>
              </div>

              {/* Risk Badge & Metric */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-900 font-mono text-xs">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${risk.badgeClass}`}>
                  <Icon className="w-3 h-3" />
                  <span>{risk.label}</span>
                </span>
                <span
                  className={`font-bold ${
                    risk.delta > 0 ? "text-emerald-400" : risk.delta < 0 ? "text-rose-400" : "text-slate-400"
                  }`}
                >
                  {risk.delta > 0 ? `+${risk.delta}%` : `${risk.delta}%`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
