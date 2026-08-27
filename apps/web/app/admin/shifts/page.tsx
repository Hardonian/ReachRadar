import { DEMO_PUBLIC_SHIFTS } from "@reachradar/providers";
import { SCORING_WEIGHTS } from "@reachradar/config";
import { ShiftBadge } from "@reachradar/ui";
import { BarChart3, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function AdminShiftInspectorPage() {
  const shift = DEMO_PUBLIC_SHIFTS[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
          Statistical Diagnostics
        </span>
        <h1 className="text-2xl font-extrabold text-white mt-1">
          Shift Score Inspector (No Black Box)
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Inspect mathematical component scores, weighting matrices, and privacy eligibility caps.
        </p>
      </div>

      {/* Main Shift Inspection */}
      <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white">{shift.title}</h2>
            <div className="text-xs font-mono text-slate-400 mt-0.5">{shift.cohortName}</div>
          </div>
          <ShiftBadge score={shift.evidenceScore} />
        </div>

        {/* Component Weight Breakdown Table */}
        <div className="space-y-3 font-mono text-xs">
          <div className="text-xs font-bold text-slate-400 uppercase">
            Component Decomposition (Scoring Engine v{shift.scoringVersion})
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
            <table className="w-full text-left">
              <thead className="border-b border-slate-800 bg-slate-900/60 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Component</th>
                  <th className="p-3">Weight</th>
                  <th className="p-3">Raw Score</th>
                  <th className="p-3">Weighted Contribution</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="p-3 font-bold text-white">Effect Magnitude</td>
                  <td className="p-3 text-slate-400">{(SCORING_WEIGHTS.effectMagnitude * 100).toFixed(0)}%</td>
                  <td className="p-3">{shift.componentScores.effectMagnitude}/100</td>
                  <td className="p-3 text-emerald-400 font-bold">
                    {(shift.componentScores.effectMagnitude * SCORING_WEIGHTS.effectMagnitude).toFixed(1)}
                  </td>
                  <td className="p-3 text-emerald-400">PASS</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Cohort Consensus</td>
                  <td className="p-3 text-slate-400">{(SCORING_WEIGHTS.cohortConsensus * 100).toFixed(0)}%</td>
                  <td className="p-3">{shift.componentScores.cohortConsensus}/100</td>
                  <td className="p-3 text-emerald-400 font-bold">
                    {(shift.componentScores.cohortConsensus * SCORING_WEIGHTS.cohortConsensus).toFixed(1)}
                  </td>
                  <td className="p-3 text-emerald-400">PASS</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Persistence (CUSUM+EWMA)</td>
                  <td className="p-3 text-slate-400">{(SCORING_WEIGHTS.persistence * 100).toFixed(0)}%</td>
                  <td className="p-3">{shift.componentScores.persistence}/100</td>
                  <td className="p-3 text-emerald-400 font-bold">
                    {(shift.componentScores.persistence * SCORING_WEIGHTS.persistence).toFixed(1)}
                  </td>
                  <td className="p-3 text-emerald-400">PASS</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Cross-Metric Coherence</td>
                  <td className="p-3 text-slate-400">{(SCORING_WEIGHTS.crossMetricCoherence * 100).toFixed(0)}%</td>
                  <td className="p-3">{shift.componentScores.crossMetricCoherence}/100</td>
                  <td className="p-3 text-emerald-400 font-bold">
                    {(shift.componentScores.crossMetricCoherence * SCORING_WEIGHTS.crossMetricCoherence).toFixed(1)}
                  </td>
                  <td className="p-3 text-emerald-400">PASS</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Surface Concentration</td>
                  <td className="p-3 text-slate-400">{(SCORING_WEIGHTS.surfaceConcentration * 100).toFixed(0)}%</td>
                  <td className="p-3">{shift.componentScores.surfaceConcentration}/100</td>
                  <td className="p-3 text-emerald-400 font-bold">
                    {(shift.componentScores.surfaceConcentration * SCORING_WEIGHTS.surfaceConcentration).toFixed(1)}
                  </td>
                  <td className="p-3 text-emerald-400">PASS</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Owner Diversity (HHI)</td>
                  <td className="p-3 text-slate-400">{(SCORING_WEIGHTS.ownerDiversity * 100).toFixed(0)}%</td>
                  <td className="p-3">{shift.componentScores.ownerDiversity}/100</td>
                  <td className="p-3 text-emerald-400 font-bold">
                    {(shift.componentScores.ownerDiversity * SCORING_WEIGHTS.ownerDiversity).toFixed(1)}
                  </td>
                  <td className="p-3 text-emerald-400">PASS</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Sample Quality</td>
                  <td className="p-3 text-slate-400">{(SCORING_WEIGHTS.sampleQuality * 100).toFixed(0)}%</td>
                  <td className="p-3">{shift.componentScores.sampleQuality}/100</td>
                  <td className="p-3 text-emerald-400 font-bold">
                    {(shift.componentScores.sampleQuality * SCORING_WEIGHTS.sampleQuality).toFixed(1)}
                  </td>
                  <td className="p-3 text-emerald-400">PASS</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Demand Independence</td>
                  <td className="p-3 text-slate-400">{(SCORING_WEIGHTS.demandIndependence * 100).toFixed(0)}%</td>
                  <td className="p-3">{shift.componentScores.demandIndependence}/100</td>
                  <td className="p-3 text-emerald-400 font-bold">
                    {(shift.componentScores.demandIndependence * SCORING_WEIGHTS.demandIndependence).toFixed(1)}
                  </td>
                  <td className="p-3 text-emerald-400">PASS</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-2 text-right font-mono text-sm">
            Total Composite Score: <strong className="text-rose-400 text-base">{shift.evidenceScore} / 100</strong> (STRONG SIGNAL)
          </div>
        </div>
      </div>
    </div>
  );
}
