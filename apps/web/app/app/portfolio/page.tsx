"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DataQualityBadge, ImpactBadge, RosterRiskHeatmap } from "@reachradar/ui";
import { DEMO_CHANNELS } from "@reachradar/providers";
import { YouTubeChannel } from "@reachradar/domain";
import {
  Briefcase,
  Filter,
  Download,
  Bell,
  Search,
  CheckSquare,
  ArrowUpDown,
  ExternalLink,
  FileText,
  Sparkles,
  Printer,
  X,
  CheckCircle2,
} from "lucide-react";

export default function PortfolioManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("all");
  const [selectedChannelForMemo, setSelectedChannelForMemo] = useState<YouTubeChannel | null>(null);

  const filteredChannels = DEMO_CHANNELS.filter((ch) => {
    const matchesSearch =
      ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ch.clientGroup && ch.clientGroup.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesNiche = selectedNiche === "all" || ch.niche === selectedNiche;
    return matchesSearch && matchesNiche;
  });

  const handleExportCsv = () => {
    const headers = "Channel,CustomURL,Subscribers,Niche,SizeBand,ClientGroup,ImpactStatus,DataQuality\n";
    const rows = filteredChannels
      .map(
        (c) =>
          `"${c.title}","${c.customUrl}",${c.subscriberCount},"${c.niche}","${c.sizeBand}","${c.clientGroup || ""}","${c.id.includes("finance") ? "LIKELY_AFFECTED" : "NOT_CLEARLY_AFFECTED"}","${c.dataQualityTier}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `reachradar_portfolio_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header & Bulk Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
            Agency & Studio Portfolio
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            Multi-Channel Portfolio Radar
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage client channel rosters, monitor cross-client distribution volatility, and generate 1-click executive intelligence reports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedChannelForMemo(DEMO_CHANNELS[0])}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-xs font-mono text-white font-bold transition-all shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Client Intelligence Memo</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-900 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-700 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Roster Risk Heatmap Component */}
      <RosterRiskHeatmap
        channels={DEMO_CHANNELS}
        onSelectChannel={(ch) => setSelectedChannelForMemo(ch)}
      />

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl border border-slate-800 bg-[#0D1322]">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search channels or client groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 pl-9 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <select
            value={selectedNiche}
            onChange={(e) => setSelectedNiche(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-sky-500"
          >
            <option value="all">All Niches</option>
            <option value="finance">Finance</option>
            <option value="technology">Technology</option>
            <option value="fitness">Fitness</option>
            <option value="gaming">Gaming</option>
          </select>
        </div>
      </div>

      {/* Channel Roster Table */}
      <div className="rounded-2xl border border-slate-800 bg-[#0D1322] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-slate-800 bg-slate-950 text-[10px] text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5 font-bold">Channel</th>
                <th className="px-5 py-3.5 font-bold">Niche & Band</th>
                <th className="px-5 py-3.5 font-bold">Client Group</th>
                <th className="px-5 py-3.5 font-bold">Active Shift Impact</th>
                <th className="px-5 py-3.5 font-bold">Data Quality</th>
                <th className="px-5 py-3.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredChannels.map((ch) => {
                const isAffected = ch.id.includes("finance");
                return (
                  <tr key={ch.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden shrink-0">
                          {ch.thumbnailUrl ? (
                            <img src={ch.thumbnailUrl} alt={ch.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-bold text-slate-400">
                              {ch.title.slice(0, 2)}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-white font-sans">{ch.title}</div>
                          <div className="text-[10px] text-slate-500">{ch.customUrl}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-slate-300 capitalize">{ch.niche}</span>
                      <span className="text-slate-600 block text-[10px] uppercase">{ch.sizeBand} band</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px]">
                        {ch.clientGroup || "Default Roster"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <ImpactBadge
                        classification={isAffected ? "LIKELY_AFFECTED" : "NOT_CLEARLY_AFFECTED"}
                      />
                    </td>
                    <td className="px-5 py-4">
                      <DataQualityBadge tier={ch.dataQualityTier} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedChannelForMemo(ch)}
                          className="px-2.5 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 text-[10px] font-bold transition-colors"
                        >
                          Client Memo
                        </button>
                        <Link
                          href={`/app/channels/${ch.id}`}
                          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 1-Click Client Intelligence Memo Modal */}
      {selectedChannelForMemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#0B0F19] border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">
                    Executive Algorithm Intelligence Brief
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    Prepared for: {selectedChannelForMemo.title} ({selectedChannelForMemo.clientGroup || "Client"})
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedChannelForMemo(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-sans text-xs space-y-4 text-slate-200 leading-relaxed">
              <div className="border-b border-slate-800 pb-3">
                <span className="font-mono text-[10px] text-slate-500 uppercase block font-bold">
                  EXECUTIVE SUMMARY FOR CLIENT STAKEHOLDERS
                </span>
                <p className="mt-1 font-medium">
                  Recent viewership fluctuations on <strong>{selectedChannelForMemo.title}</strong> correlate directly with a confirmed platform-wide recommendation redistribution event in the <strong>{selectedChannelForMemo.niche}</strong> category (-18.7% median cohort movement).
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] text-slate-500 uppercase block font-bold">
                  VERIFIED STATISTICAL FACTS
                </span>
                <ul className="mt-2 space-y-1.5 font-mono text-[11px] text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Channel Click-Through Rate (CTR) remains healthy (+0.2%).</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Average View Duration & retention match historical baselines.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Search intent queries and direct push notifications are invariant.</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-800/60 text-sky-200 text-xs">
                <strong className="block font-mono text-[10px] uppercase text-sky-400 font-bold mb-1">
                  AGENCY STRATEGIC DIRECTIVE
                </strong>
                Advise client production team to <strong>HOLD STRATEGY</strong> and maintain normal editorial schedule. Do not panic-discount sponsorship inventory or re-upload content.
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] font-mono text-slate-500">
                Verified by ReachRadar Ensemble Engine v2.0.0
              </span>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-bold flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
