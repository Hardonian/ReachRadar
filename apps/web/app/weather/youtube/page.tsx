"use client";

import Link from "next/link";
import { Logo, WeatherGauge, SurfaceCard, ShiftBadge, SeismographTicker, RadarScanner } from "@reachradar/ui";
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
  Sparkles,
  Radio,
  Globe,
} from "lucide-react";

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
            <Link href="/weather/youtube" className="text-sky-400 font-bold">
              Weather Station
            </Link>
            <Link href="/methodology" className="hover:text-sky-400">
              Methodology
            </Link>
            <Link href="/pricing" className="hover:text-sky-400">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/app/simulator"
              className="px-3.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>AI Simulator</span>
            </Link>
            <Link
              href="/app/onboarding"
              className="rounded-lg bg-sky-500 px-4 py-2 text-xs font-bold text-white hover:bg-sky-400 font-mono transition-all shadow-md"
            >
              Connect Channel →
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1 container mx-auto px-4 py-10 max-w-7xl space-y-8">
        {/* Title & Live Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-sky-400" /> Public Observability Stream
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-sky-500/20 text-sky-300 border border-sky-500/30">
                LIVE TELEMETRY
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-1">
              YouTube Algorithm Weather Station
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Independent statistical observability across 150+ monitored creator channels and cross-cohort baselines.
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

        {/* Live Seismograph Ticker */}
        <SeismographTicker
          initialRax={44.8}
          initialDelta={3.2}
          statusLabel="ELEVATED VOLATILITY"
        />

        {/* Top Radar Gauges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Weather Card with Radar Scanner */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#0D1322] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden space-y-4 shadow-xl">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              YouTube Platform Volatility (All Surfaces)
            </div>

            <RadarScanner activeAnomaliesCount={2} sweepSpeedSeconds={4} />

            <div className="text-xs font-mono text-slate-300">
              Composite Volatility Index: <strong className="text-white">44.8 / 100</strong>
            </div>
          </div>

          {/* Distribution Surfaces Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SurfaceCard
              surfaceName="Browse Features"
              score={68}
              deltaPercentage={-18.7}
              cohortDeltaPercentage={-16.2}
            />
            <SurfaceCard
              surfaceName="Suggested Videos"
              score={42}
              deltaPercentage={6.4}
              cohortDeltaPercentage={4.1}
            />
            <SurfaceCard
              surfaceName="YouTube Search"
              score={18}
              deltaPercentage={0.8}
              cohortDeltaPercentage={0.2}
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
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white font-mono">Active Detected Shifts</h2>
              <p className="text-xs text-slate-400">
                Cohorts meeting the strict privacy threshold (&ge;25 channels, &ge;10 owners).
              </p>
            </div>
            <Link
              href="/methodology"
              className="text-xs font-mono text-sky-400 hover:underline flex items-center gap-1"
            >
              <span>How shifts are calculated</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {DEMO_PUBLIC_SHIFTS.map((shift) => (
              <div
                key={shift.id}
                className="rounded-2xl border border-slate-800 bg-[#0D1322] p-5 md:p-6 transition-all hover:border-slate-700 shadow-xl"
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
                        href={`/app/shifts/${shift.id}`}
                        className="hover:text-sky-400 transition-colors"
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
                      href={`/app/shifts/${shift.id}`}
                      className="inline-flex items-center gap-1 text-sky-400 font-bold hover:underline"
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
        <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-r from-sky-950/30 via-[#0D1322] to-slate-900 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
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
            className="rounded-xl bg-sky-500 px-6 py-3 text-sm font-bold text-white hover:bg-sky-400 transition-all font-mono shrink-0 shadow-lg"
          >
            Check My Personal Impact →
          </Link>
        </div>
      </main>
    </div>
  );
}
