import Link from "next/link";
import { ShiftBadge } from "@reachradar/ui";
import { DEMO_PUBLIC_SHIFTS } from "@reachradar/providers";
import { ArrowRight, Activity, Calendar, Layers, ShieldCheck } from "lucide-react";

export default function ShiftsListPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
          Observed Algorithm Shifts
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
          Distribution Shift Directory
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Catalog of validated algorithmic distribution anomalies across monitored creator cohorts.
        </p>
      </div>

      {/* Shifts List */}
      <div className="space-y-4">
        {DEMO_PUBLIC_SHIFTS.map((shift) => (
          <div
            key={shift.id}
            className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 space-y-4 transition-all hover:border-slate-700"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-sky-400 font-bold uppercase">{shift.cohortName}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400 uppercase">Surface: {shift.surface}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-500">
                    {new Date(shift.firstDetectedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white mt-1">
                  <Link href={`/app/shifts/${shift.id}`} className="hover:text-emerald-400 transition-colors">
                    {shift.title}
                  </Link>
                </h2>
              </div>
              <ShiftBadge score={shift.evidenceScore} />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {shift.summary}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800/60 text-xs font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">Affected Channels</span>
                <span className="text-rose-400 font-bold">{shift.affectedChannelsPercentage}%</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Median Movement</span>
                <span className="text-rose-400 font-bold">{shift.medianDistributionMovement}%</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Telemetry Depth</span>
                <span className="text-slate-300 font-bold">{shift.channelsAnalyzed} channels</span>
              </div>
              <div className="flex items-center justify-end">
                <Link
                  href={`/app/shifts/${shift.id}`}
                  className="inline-flex items-center gap-1.5 text-emerald-400 font-bold hover:underline"
                >
                  <span>Open Full Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
