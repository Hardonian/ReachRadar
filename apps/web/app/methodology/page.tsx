import Link from "next/link";
import { Metadata } from "next";
import { Logo } from "@reachradar/ui";
import { brand, SCORING_WEIGHTS, MIN_PUBLIC_CHANNELS, MIN_DISTINCT_OWNERS } from "@reachradar/config";
import {
  ShieldCheck,
  Radar,
  Lock,
  Layers,
  BarChart2,
  HelpCircle,
  ArrowRight,
  Info,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Methodology & Observability Architecture | ReachRadar",
  description:
    "How ReachRadar measures algorithm distribution volatility, evaluates matched cohorts, and enforces privacy thresholds without claiming proprietary model weights.",
};

export default function MethodologyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070A12] text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-[#070A12]/90 sticky top-0 z-40 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
          <Link href="/">
            <Logo size="md" />
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link href="/weather/youtube" className="hover:text-emerald-400">
              YouTube Weather
            </Link>
            <Link href="/pricing" className="hover:text-emerald-400">
              Pricing
            </Link>
          </nav>
        </div>
      </header>

      <main id="main-content" className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            Transparency & Scientific Standards
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
            ReachRadar Methodology
          </h1>
          <p className="text-base text-slate-300 mt-3 leading-relaxed">
            How we detect recommendation distribution shifts, separate content failure from platform changes, and protect contributor privacy.
          </p>
        </div>

        {/* Core Principles Callout */}
        <div className="mt-10 rounded-2xl border border-sky-500/30 bg-sky-950/10 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-bold text-white">
                What ReachRadar Is — and What It Is Not
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                ReachRadar observes <strong>distribution outcomes</strong> across thousands of longitudinal creator time series. We <strong>do not</strong> have access to proprietary YouTube ranking neural network weights, internal code, or private server logs.
              </p>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Just as meteorologists observe atmospheric radar reflections without controlling cloud physics, ReachRadar observes recommendation surface velocity to measure distribution volatility.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Statistical Change Detection Ensemble */}
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3">
            1. Multi-Signal Change Detection Ensemble
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Rather than relying on naive thresholds or subjective sentiment, ReachRadar uses an ensemble of 8 mathematical components:
          </p>

          <div className="rounded-xl border border-slate-800 bg-[#0D1322] p-6 space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2.5">
              <span className="text-slate-200 font-bold">1. Effect Magnitude ({(SCORING_WEIGHTS.effectMagnitude * 100).toFixed(0)}%)</span>
              <span className="text-slate-400">Median cohort percentage movement versus 28-day baseline</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2.5">
              <span className="text-slate-200 font-bold">2. Cohort Consensus ({(SCORING_WEIGHTS.cohortConsensus * 100).toFixed(0)}%)</span>
              <span className="text-slate-400">Proportion of channels in matched cohort deviating concurrently</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2.5">
              <span className="text-slate-200 font-bold">3. Persistence ({(SCORING_WEIGHTS.persistence * 100).toFixed(0)}%)</span>
              <span className="text-slate-400">CUSUM & EWMA longitudinal survival across consecutive days</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2.5">
              <span className="text-slate-200 font-bold">4. Cross-Metric Coherence ({(SCORING_WEIGHTS.crossMetricCoherence * 100).toFixed(0)}%)</span>
              <span className="text-slate-400">Stability of CTR and Retention while impressions redistribute</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2.5">
              <span className="text-slate-200 font-bold">5. Surface Concentration ({(SCORING_WEIGHTS.surfaceConcentration * 100).toFixed(0)}%)</span>
              <span className="text-slate-400">Isolation of variance to Browse, Suggested, Search, or Shorts</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2.5">
              <span className="text-slate-200 font-bold">6. Owner Diversity ({(SCORING_WEIGHTS.ownerDiversity * 100).toFixed(0)}%)</span>
              <span className="text-slate-400">Herfindahl-Hirschman index ensuring multi-owner consensus</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2.5">
              <span className="text-slate-200 font-bold">7. Sample Quality ({(SCORING_WEIGHTS.sampleQuality * 100).toFixed(0)}%)</span>
              <span className="text-slate-400">Baseline completeness and channel depth requirements</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-200 font-bold">8. Demand Independence ({(SCORING_WEIGHTS.demandIndependence * 100).toFixed(0)}%)</span>
              <span className="text-slate-400">Independence from broader external search demand shocks</span>
            </div>
          </div>
        </section>

        {/* Section 2: Privacy Threshold Invariants */}
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3">
            2. Privacy & Aggregation Invariants
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Public algorithm weather must never reveal an individual creator’s private channel metrics. We enforce strict mathematical gates:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-800 bg-[#0D1322] p-5">
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase">
                Minimum Cohort Channels
              </div>
              <div className="text-2xl font-bold text-white font-mono mt-1">
                &ge; {MIN_PUBLIC_CHANNELS} Channels
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Any cohort with fewer than {MIN_PUBLIC_CHANNELS} active channels is automatically suppressed from public publication.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#0D1322] p-5">
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase">
                Minimum Independent Owners
              </div>
              <div className="text-2xl font-bold text-white font-mono mt-1">
                &ge; {MIN_DISTINCT_OWNERS} Owners
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Prevents a single agency or studio with multiple channels from dominating a public cohort signal.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Evidence Scores vs Probabilities */}
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3">
            3. Evidence Scores vs. Absolute Certainty
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            ReachRadar shift scores (0–100) are <strong>evidence scores</strong> derived from empirical statistical observation. They represent the strength of statistical evidence supporting a systemic distribution redistribution rather than random noise.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            We intentionally classify confidence into four clear tiers:
          </p>
          <ul className="space-y-2 text-sm text-slate-300 font-mono">
            <li><strong className="text-slate-400">0–39: LOW SIGNAL</strong> — Normal baseline variation.</li>
            <li><strong className="text-amber-400">40–59: WATCH</strong> — Emerging movement detected in limited sample.</li>
            <li><strong className="text-orange-400">60–79: LIKELY SHIFT</strong> — Significant cohort consensus with surface concentration.</li>
            <li><strong className="text-rose-400">80–100: STRONG SIGNAL</strong> — Broad multi-owner consensus with stable content response.</li>
          </ul>
        </section>

        {/* CTA */}
        <div className="mt-16 pt-8 border-t border-slate-800 text-center">
          <Link
            href="/weather/youtube"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-bold text-slate-950 hover:bg-emerald-400 font-mono"
          >
            <span>Explore Current YouTube Weather</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
