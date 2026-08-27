import Link from "next/link";
import { Metadata } from "next";
import { Logo, WeatherGauge, SurfaceCard, ShiftBadge } from "@reachradar/ui";
import { DEMO_PUBLIC_SHIFTS } from "@reachradar/providers";
import {
  Radar,
  ArrowRight,
  TrendingDown,
  Info,
  Calendar,
  Layers,
  Share2,
  ExternalLink,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "YouTube Algorithm Weather Today | ReachRadar",
  description:
    "Independent observability and real-time distribution volatility across YouTube Browse, Suggested, Search, and Shorts.",
};

export default function PublicYouTubeWeatherPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070A12] text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-[#070A12]/90 sticky top-0 z-40 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          <Link href="/" className="focus:outline-none">
            <Logo size="md" />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link href="/weather/youtube" className="text-emerald-400 font-bold">
              Weather Station
            </Link>
            <Link href="/methodology" className="hover:text-emerald-400">
              Methodology
            </Link>
            <Link href="/pricing" className="hover:text-emerald-400">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/app/onboarding"
              className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 font-mono transition-all shadow-md"
            >
              Connect Channel →
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1 container mx-auto px-4 py-10 max-w-7xl">
        {/* Title & Live Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Public Algorithm Telemetry
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                DEMO DATA
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-1">
              YouTube Algorithm Weather Station
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Observed recommendation volatility across 150+ opt-in creator channels.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 bg-slate-900/60 px-4 py-3 rounded-xl border border-slate-800">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Data Freshness</span>
              <strong className="text-slate-200">18 minutes ago</strong>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Active Shifts</span>
              <strong className="text-amber-400">2 Cohorts</strong>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Sample Standard</span>
              <strong className="text-emerald-400">PASS (25+ / 10+)</strong>
            </div>
          </div>
        </div>

        {/* Top Radar Gauges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          {/* Main Weather Card */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#0D1322] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
              YouTube Platform Volatility (All Surfaces)
            </div>
            <WeatherGauge score={27} size="lg" />
            <div className="mt-6 pt-4 border-t border-slate-800/80 w-full flex items-center justify-around text-xs font-mono text-slate-400">
              <div>
                <span className="text-slate-500 block text-[10px]">7-Day Mean</span>
                <span className="text-slate-200 font-bold">24 / 100</span>
              </div>
              <div className="h-6 w-px bg-slate-800" />
              <div>
                <span className="text-slate-500 block text-[10px]">30-Day Peak</span>
                <span className="text-amber-400 font-bold">62 / 100</span>
              </div>
              <div className="h-6 w-px bg-slate-800" />
              <div>
                <span className="text-slate-500 block text-[10px]">Baseline Shift</span>
                <span className="text-emerald-400 font-bold">Stable</span>
              </div>
            </div>
          </div>

          {/* Distribution Surfaces Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SurfaceCard
              surfaceName="Browse Features"
              score={18}
              deltaPercentage={-1.2}
              cohortDeltaPercentage={-0.8}
            />
            <SurfaceCard
              surfaceName="Suggested Videos"
              score={31}
              deltaPercentage={3.4}
              cohortDeltaPercentage={1.2}
            />
            <SurfaceCard
              surfaceName="YouTube Search"
              score={22}
              deltaPercentage={-0.5}
              cohortDeltaPercentage={0.1}
            />
            <SurfaceCard
              surfaceName="Shorts Feed"
              score={74}
              deltaPercentage={-14.8}
              cohortDeltaPercentage={-12.4}
            />
          </div>
        </div>

        {/* Active Detected Shifts List */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Active Detected Shifts</h2>
              <p className="text-xs text-slate-400">
                Cohorts meeting the strict privacy threshold (&ge;25 channels, &ge;10 owners).
              </p>
            </div>
            <Link
              href="/methodology"
              className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>How shifts are calculated</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {DEMO_PUBLIC_SHIFTS.map((shift) => (
              <div
                key={shift.id}
                className="rounded-xl border border-slate-800 bg-[#0D1322] p-5 md:p-6 transition-all hover:border-slate-700"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/60 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-sky-400 uppercase">
                        {shift.cohortName}
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="text-xs font-mono uppercase text-slate-400">
                        {shift.surface.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-1">
                      <Link
                        href={`/weather/youtube/shifts/${shift.slug}`}
                        className="hover:text-emerald-400 transition-colors"
                      >
                        {shift.title}
                      </Link>
                    </h3>
                  </div>
                  <ShiftBadge score={shift.evidenceScore} />
                </div>

                <p className="text-sm text-slate-300 mt-4 leading-relaxed">
                  {shift.summary}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800/40 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Affected Channels</span>
                    <span className="text-rose-400 font-bold">{shift.affectedChannelsPercentage}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Median Movement</span>
                    <span className="text-rose-400 font-bold">{shift.medianDistributionMovement}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Sample Size</span>
                    <span className="text-slate-300 font-bold">{shift.channelsAnalyzed} channels</span>
                  </div>
                  <div className="flex items-center justify-end">
                    <Link
                      href={`/weather/youtube/shifts/${shift.slug}`}
                      className="inline-flex items-center gap-1 text-emerald-400 font-bold hover:underline"
                    >
                      <span>Full Evidence Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personalized Channel CTA Banner */}
        <div className="mt-12 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-[#0D1322] to-slate-900 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-xl font-bold text-white">
              Is this shift affecting your channel?
            </h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Connect your YouTube channel in read-only mode to calculate your personal impact score and see if your reach drop matches your niche cohort.
            </p>
          </div>
          <Link
            href="/app/onboarding"
            className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-all font-mono shrink-0 shadow-lg"
          >
            Check My Personal Impact →
          </Link>
        </div>
      </main>
    </div>
  );
}
