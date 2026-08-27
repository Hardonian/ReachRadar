"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DataQualityBadge, ImpactBadge } from "@reachradar/ui";
import { DEMO_CHANNELS } from "@reachradar/providers";
import {
  Briefcase,
  Filter,
  Download,
  Bell,
  Search,
  CheckSquare,
  ArrowUpDown,
  ExternalLink,
} from "lucide-react";

export default function PortfolioManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

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
    <div className="space-y-8">
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
            Manage channel rosters, monitor cross-client distribution volatility, and export client intelligence reports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-900 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-700 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl border border-slate-800 bg-[#0D1322]">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search channels or client groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 pl-9 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <select
            value={selectedNiche}
            onChange={(e) => setSelectedNiche(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Niches</option>
            <option value="finance">Finance</option>
            <option value="technology">Technology</option>
            <option value="fitness">Fitness</option>
            <option value="gaming">Gaming</option>
          </select>
        </div>

        <div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Impact Statuses</option>
            <option value="affected">Likely Affected</option>
            <option value="stable">Stable / Healthy</option>
          </select>
        </div>
      </div>

      {/* Portfolio Table */}
      <div className="rounded-2xl border border-slate-800 bg-[#0D1322] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Channel</th>
                <th className="p-4">Client Group</th>
                <th className="p-4">Subscribers</th>
                <th className="p-4">Niche</th>
                <th className="p-4">24h Movement</th>
                <th className="p-4">Impact Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredChannels.map((ch) => {
                const isFinance = ch.id.includes("finance");
                return (
                  <tr key={ch.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-4 font-bold text-white">
                      <Link href={`/app/channels/${ch.id}`} className="hover:text-emerald-400">
                        {ch.title}
                      </Link>
                      <div className="text-[10px] text-slate-500 font-normal">{ch.customUrl}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 text-[10px]">
                        {ch.clientGroup || "Default"}
                      </span>
                    </td>
                    <td className="p-4">{ch.subscriberCount.toLocaleString()}</td>
                    <td className="p-4 capitalize">{ch.niche}</td>
                    <td className="p-4">
                      <span className={isFinance ? "text-rose-400 font-bold" : "text-emerald-400 font-bold"}>
                        {isFinance ? "-18.7%" : "+2.1%"}
                      </span>
                    </td>
                    <td className="p-4">
                      <ImpactBadge classification={isFinance ? "LIKELY_AFFECTED" : "NOT_CLEARLY_AFFECTED"} />
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/app/channels/${ch.id}`}
                        className="text-emerald-400 hover:underline font-bold"
                      >
                        Inspect →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
