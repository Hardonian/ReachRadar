import Link from "next/link";
import { DataQualityBadge, ImpactBadge, SurfaceCard } from "@reachradar/ui";
import { DEMO_CHANNELS, DEMO_PUBLIC_SHIFTS } from "@reachradar/providers";
import {
  ArrowLeft,
  Tv,
  Calendar,
  Layers,
  BarChart3,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

interface ChannelDetailPageProps {
  params: Promise<{ channelId: string }>;
}

export default async function ChannelDetailPage({
  params,
}: ChannelDetailPageProps) {
  const { channelId } = await params;
  const channel =
    DEMO_CHANNELS.find((c) => c.id === channelId) || DEMO_CHANNELS[0];

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Actions */}
      <div>
        <Link
          href="/app/channels"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-emerald-400 mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Channels</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 font-mono text-xl">
              {channel.title.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                  {channel.niche} · {channel.sizeBand} Band
                </span>
                <DataQualityBadge tier={channel.dataQualityTier} />
              </div>
              <h1 className="text-2xl font-extrabold text-white mt-0.5">
                {channel.title}
              </h1>
              <div className="text-xs font-mono text-slate-400">{channel.customUrl}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ImpactBadge classification={channel.id.includes("finance") ? "LIKELY_AFFECTED" : "NOT_CLEARLY_AFFECTED"} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 font-mono text-xs overflow-x-auto pb-px">
        <Link href={`/app/channels/${channel.id}`} className="px-4 py-2 border-b-2 border-emerald-400 text-emerald-400 font-bold">
          Overview
        </Link>
        <Link href={`/app/channels/${channel.id}/distribution`} className="px-4 py-2 text-slate-400 hover:text-white">
          Distribution Surfaces
        </Link>
        <Link href={`/app/channels/${channel.id}/benchmarks`} className="px-4 py-2 text-slate-400 hover:text-white">
          Cohort Benchmarks
        </Link>
        <Link href={`/app/channels/${channel.id}/history`} className="px-4 py-2 text-slate-400 hover:text-white">
          Shift History
        </Link>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-800 bg-[#0D1322] font-mono">
          <span className="text-slate-500 block text-[10px] uppercase">Daily Views</span>
          <span className="text-2xl font-bold text-slate-100 mt-1 block">28,100</span>
          <span className="text-[10px] text-rose-400">-18.7% vs 28d baseline</span>
        </div>
        <div className="p-4 rounded-xl border border-slate-800 bg-[#0D1322] font-mono">
          <span className="text-slate-500 block text-[10px] uppercase">Avg View Duration</span>
          <span className="text-2xl font-bold text-slate-100 mt-1 block">6m 12s</span>
          <span className="text-[10px] text-emerald-400">+0.8% (healthy)</span>
        </div>
        <div className="p-4 rounded-xl border border-slate-800 bg-[#0D1322] font-mono">
          <span className="text-slate-500 block text-[10px] uppercase">CTR on Impressions</span>
          <span className="text-2xl font-bold text-slate-100 mt-1 block">8.3%</span>
          <span className="text-[10px] text-emerald-400">Stable (within ±0.3%)</span>
        </div>
        <div className="p-4 rounded-xl border border-slate-800 bg-[#0D1322] font-mono">
          <span className="text-slate-500 block text-[10px] uppercase">Matched Cohort</span>
          <span className="text-base font-bold text-sky-300 mt-1 block truncate">Finance Macro</span>
          <span className="text-[10px] text-slate-400">48 active channels</span>
        </div>
      </div>

      {/* Surface Breakdown */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Surface Distribution Breakdown</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SurfaceCard surfaceName="Browse" score={88} deltaPercentage={-26.0} cohortDeltaPercentage={-24.2} />
          <SurfaceCard surfaceName="Suggested" score={22} deltaPercentage={1.5} cohortDeltaPercentage={0.8} />
          <SurfaceCard surfaceName="Search" score={15} deltaPercentage={-0.4} cohortDeltaPercentage={0.1} />
          <SurfaceCard surfaceName="Shorts" score={12} deltaPercentage={0.0} cohortDeltaPercentage={-0.2} />
        </div>
      </div>

      {/* Data Quality & Baseline Health Assessment */}
      <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <span className="text-slate-300 font-bold uppercase">Data Quality & Ingestion Status</span>
          <DataQualityBadge tier={channel.dataQualityTier} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-300">
          <div>• History Depth: <strong className="text-slate-100">365 Days Available</strong></div>
          <div>• Baseline Model: <strong className="text-emerald-400">28d Seasonal Ready</strong></div>
          <div>• Last Sync: <strong className="text-slate-100">18 minutes ago</strong></div>
        </div>
      </div>
    </div>
  );
}
