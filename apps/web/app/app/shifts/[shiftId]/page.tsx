import Link from "next/link";
import { notFound } from "next/navigation";
import { ShiftBadge } from "@reachradar/ui";
import { DEMO_PUBLIC_SHIFTS } from "@reachradar/providers";
import {
  ArrowLeft,
  Calendar,
  Layers,
  ShieldCheck,
  CheckCircle2,
  GitCommit,
  Clock,
  Sparkles,
} from "lucide-react";

interface ShiftDetailPageProps {
  params: Promise<{ shiftId: string }>;
}

export default async function InternalShiftDetailPage({
  params,
}: ShiftDetailPageProps) {
  const { shiftId } = await params;
  const shift =
    DEMO_PUBLIC_SHIFTS.find((s) => s.id === shiftId || s.slug === shiftId) ||
    DEMO_PUBLIC_SHIFTS[0];

  return (
    <div className="space-y-8">
      {/* Back button & Breadcrumb */}
      <div>
        <Link
          href="/app/shifts"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-emerald-400 mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shifts Directory</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-sky-400 font-bold uppercase">{shift.cohortName}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 uppercase">Surface: {shift.surface}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
              {shift.title}
            </h1>
          </div>
          <ShiftBadge score={shift.evidenceScore} />
        </div>
      </div>

      {/* Statistical Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl border border-slate-800 bg-[#0D1322] font-mono text-xs">
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
          <span className="text-slate-500 block text-[10px] uppercase">Telemetry Sample</span>
          <span className="text-slate-200 font-bold mt-1 block">{shift.channelsAnalyzed} channels ({shift.distinctOwners} owners)</span>
        </div>
      </div>

      {/* Main Analysis Sections */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 space-y-6">
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              1. What Changed
            </h2>
            <p className="text-sm text-slate-200 mt-2 leading-relaxed">
              {shift.whatChanged}
            </p>
          </div>

          <div className="border-t border-slate-800/80 pt-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              2. Where It Changed
            </h2>
            <p className="text-sm text-slate-200 mt-2 leading-relaxed">
              {shift.whereItChanged}
            </p>
          </div>

          <div className="border-t border-slate-800/80 pt-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              3. Who Appears Affected
            </h2>
            <p className="text-sm text-slate-200 mt-2 leading-relaxed">
              {shift.whoAppearsAffected}
            </p>
          </div>
        </div>

        {/* Negative Controls */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-2">
            4. Metrics That Did NOT Change (Negative Controls)
          </h2>
          <p className="text-xs text-slate-400 mb-3">
            Stable engagement signals strengthen the evidence of an algorithmic surface shift.
          </p>
          <ul className="space-y-2 text-xs text-slate-200 font-mono">
            {shift.metricsThatDidNotChange.map((m, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Alternative Explanations */}
        <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
            5. Alternative Explanations Evaluated
          </h2>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {shift.alternativeExplanations.map((alt, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>{alt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prescriptive Strategic Action */}
        <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/20 to-slate-900 p-6">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
            6. Prescriptive Recommendation
          </div>
          <div className="text-xl font-extrabold text-white mt-1 font-mono">
            HOLD CURRENT STRATEGY
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Avoid broad thumbnail or publishing-frequency changes until additional evidence develops. Your content-response metrics remain within normal historical parameters.
          </p>
        </div>

        {/* Lineage & Provenance Trace */}
        <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-sky-400" />
            <span>Data Lineage & Provenance</span>
          </h2>
          <div className="font-mono text-[11px] space-y-2 text-slate-400 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div>• Recommendation: <span className="text-slate-200">HOLD_STRATEGY (v1.0.0)</span></div>
            <div>• Shift Event: <span className="text-slate-200">{shift.id}</span></div>
            <div>• Scoring Version: <span className="text-slate-200">{shift.scoringVersion}</span></div>
            <div>• Anomaly Engine: <span className="text-slate-200">Robust Z (0.6745 * (x - med)/MAD) + CUSUM + EWMA</span></div>
            <div>• Baseline Horizon: <span className="text-slate-200">28-day window with Day-of-Week seasonality</span></div>
            <div>• Provider Ingestion: <span className="text-slate-200">YouTube Analytics API (read-only)</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
