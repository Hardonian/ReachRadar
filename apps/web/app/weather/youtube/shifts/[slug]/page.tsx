import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Logo, ShiftBadge } from "@reachradar/ui";
import { DEMO_PUBLIC_SHIFTS } from "@reachradar/providers";
import {
  ArrowLeft,
  Calendar,
  Layers,
  ShieldCheck,
  TrendingDown,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Share2,
} from "lucide-react";

interface ShiftDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ShiftDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const shift = DEMO_PUBLIC_SHIFTS.find((s) => s.slug === slug);
  if (!shift) return { title: "Shift Not Found | ReachRadar" };

  return {
    title: `${shift.title} | ReachRadar Algorithm Weather`,
    description: shift.summary,
  };
}

export default async function PublicShiftDetailPage({
  params,
}: ShiftDetailPageProps) {
  const { slug } = await params;
  const shift = DEMO_PUBLIC_SHIFTS.find((s) => s.slug === slug);

  if (!shift) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#070A12] text-slate-100">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-[#070A12]/90 sticky top-0 z-40 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
          <Link href="/weather/youtube" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-emerald-400">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to YouTube Weather</span>
          </Link>
          <Logo size="sm" showText={false} />
          <Link
            href="/app/onboarding"
            className="rounded-lg bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 font-mono"
          >
            Check My Channel
          </Link>
        </div>
      </header>

      <main id="main-content" className="flex-1 container mx-auto px-4 py-10 max-w-5xl">
        {/* Breadcrumb & Badges */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>YouTube Telemetry</span>
            <span>/</span>
            <span className="text-sky-400">{shift.cohortName}</span>
            <span>/</span>
            <span className="uppercase text-slate-300">{shift.surface}</span>
          </div>
          <ShiftBadge score={shift.evidenceScore} />
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-extrabold text-white mt-4 leading-tight">
          {shift.title}
        </h1>
        <p className="text-base text-slate-300 mt-3 leading-relaxed">
          {shift.summary}
        </p>

        {/* Statistical Overview Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 p-5 rounded-2xl border border-slate-800 bg-[#0D1322] font-mono text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">First Detected</span>
            <span className="text-slate-200 font-bold mt-1 block">
              {new Date(shift.firstDetectedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Cohort Consensus</span>
            <span className="text-rose-400 font-bold mt-1 block">{shift.affectedChannelsPercentage}% channels</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Median Movement</span>
            <span className="text-rose-400 font-bold mt-1 block">{shift.medianDistributionMovement}%</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Telemetry Depth</span>
            <span className="text-slate-200 font-bold mt-1 block">{shift.channelsAnalyzed} channels ({shift.distinctOwners} owners)</span>
          </div>
        </div>

        {/* Main Dossier Sections */}
        <div className="space-y-8 mt-10">
          {/* Section 1: What & Where */}
          <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 space-y-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono">
                1. What Changed
              </h2>
              <p className="text-sm text-slate-200 mt-2 leading-relaxed">
                {shift.whatChanged}
              </p>
            </div>

            <div className="border-t border-slate-800/80 pt-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono">
                2. Where It Changed
              </h2>
              <p className="text-sm text-slate-200 mt-2 leading-relaxed">
                {shift.whereItChanged}
              </p>
            </div>

            <div className="border-t border-slate-800/80 pt-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono">
                3. Who Appears Affected
              </h2>
              <p className="text-sm text-slate-200 mt-2 leading-relaxed">
                {shift.whoAppearsAffected}
              </p>
            </div>
          </div>

          {/* Section 2: Negative Controls */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 font-mono mb-3">
              4. Metrics That Did NOT Change (Negative Controls)
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              When impression reach drops while viewer engagement metrics remain steady, the statistical coherence of a distribution shift is high.
            </p>
            <ul className="space-y-2.5 text-sm text-slate-200 font-mono">
              {shift.metricsThatDidNotChange.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Alternative Explanations */}
          <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
              5. Alternative Explanations Evaluated
            </h2>
            <ul className="space-y-2 text-sm text-slate-300">
              {shift.alternativeExplanations.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Recommended Action */}
          <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/20 to-slate-900 p-6 md:p-8">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              6. Recommended Action for Creators in this Cohort
            </div>
            <div className="text-2xl font-extrabold text-white mt-1 font-mono">
              HOLD STRATEGY
            </div>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Evidence indicates a systemic recommendation redistribution. Avoid major title, thumbnail, or cadence changes until the environment stabilizes. Your engagement signals are operating within healthy historical parameters.
            </p>
          </div>
        </div>

        {/* Personalized Check CTA */}
        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">Know whether this affects your channel</h2>
          <p className="text-sm text-slate-400 mt-2 max-w-lg mx-auto">
            Connect your YouTube channel to see your exact delta versus this matched cohort.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/app/onboarding"
              className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 font-mono"
            >
              Analyze My Channel Impact →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
