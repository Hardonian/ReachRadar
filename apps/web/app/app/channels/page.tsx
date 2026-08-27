import Link from "next/link";
import { DataQualityBadge, ImpactBadge } from "@reachradar/ui";
import { DEMO_CHANNELS } from "@reachradar/providers";
import { Tv, ArrowRight, Plus, RefreshCw, ExternalLink } from "lucide-react";

export default function ChannelsListPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            Connected Creator Telemetry
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            Channel Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Monitor reach baselines, matched cohort fallbacks, and data quality across your connected YouTube channels.
          </p>
        </div>

        <Link
          href="/app/onboarding"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold font-mono text-slate-950 hover:bg-emerald-400 transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Connect New Channel</span>
        </Link>
      </div>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DEMO_CHANNELS.map((ch) => (
          <div
            key={ch.id}
            className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 space-y-4 transition-all hover:border-slate-700"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 font-mono text-base">
                  {ch.title.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">
                    <Link href={`/app/channels/${ch.id}`} className="hover:text-emerald-400">
                      {ch.title}
                    </Link>
                  </h2>
                  <div className="text-xs font-mono text-slate-400">{ch.customUrl}</div>
                </div>
              </div>
              <DataQualityBadge tier={ch.dataQualityTier} />
            </div>

            <div className="grid grid-cols-3 gap-2 font-mono text-xs text-slate-300">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Subscribers</span>
                <span className="font-bold">{ch.subscriberCount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Niche Cohort</span>
                <span className="font-bold capitalize">{ch.niche}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Format</span>
                <span className="font-bold capitalize">{ch.contentFormat.replace("_", " ")}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
              <ImpactBadge
                classification={ch.id.includes("finance") ? "LIKELY_AFFECTED" : "NOT_CLEARLY_AFFECTED"}
              />
              <Link
                href={`/app/channels/${ch.id}`}
                className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 hover:underline"
              >
                <span>Channel Analytics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
