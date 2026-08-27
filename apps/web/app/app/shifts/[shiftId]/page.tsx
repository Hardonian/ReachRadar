"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ShiftBadge, CounterfactualChart, SurfaceFlowDiagram } from "@reachradar/ui";
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
  Split,
  TrendingDown,
  TrendingUp,
  FileText,
  Activity,
  AlertTriangle,
  Lightbulb,
  Radio,
} from "lucide-react";

export default function InternalShiftDetailPage() {
  const params = useParams();
  const shiftId = typeof params?.shiftId === "string" ? params.shiftId : "shift-finance-browse-2026";

  const shift =
    DEMO_PUBLIC_SHIFTS.find((s) => s.id === shiftId || s.slug === shiftId) ||
    DEMO_PUBLIC_SHIFTS[0];

  const [activeTab, setActiveTab] = useState<"overview" | "autopsy" | "counterfactual" | "surfaceflow" | "playbook">("autopsy");

  const autopsy = shift.forensicAutopsy;
  const counterfactual = shift.counterfactualSample;
  const bayesian = shift.bayesianEvidence;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Back button & Breadcrumb */}
      <div>
        <Link
          href="/app/shifts"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-sky-400 mb-3 transition-colors"
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

      {/* Multi-Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab("autopsy")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-colors ${
            activeTab === "autopsy"
              ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
              : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span>AI Forensic Autopsy (RCA)</span>
        </button>

        <button
          onClick={() => setActiveTab("counterfactual")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-colors ${
            activeTab === "counterfactual"
              ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
              : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>Counterfactual Impact (95% CI)</span>
        </button>

        <button
          onClick={() => setActiveTab("surfaceflow")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-colors ${
            activeTab === "surfaceflow"
              ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
              : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <Split className="w-4 h-4 text-amber-400" />
          <span>Surface Flow Vectors</span>
        </button>

        <button
          onClick={() => setActiveTab("playbook")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-colors ${
            activeTab === "playbook"
              ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
              : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <FileText className="w-4 h-4 text-indigo-400" />
          <span>14-Day Remediation Playbook</span>
        </button>

        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-colors ${
            activeTab === "overview"
              ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
              : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <Layers className="w-4 h-4 text-slate-400" />
          <span>Shift Telemetry Summary</span>
        </button>
      </div>

      {/* TAB 1: AI FORENSIC AUTOPSY */}
      {activeTab === "autopsy" && autopsy && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="rounded-2xl border border-slate-800 bg-[#0B0F19] p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">
                    Deep Forensic Root Cause Analysis (RCA)
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Grounding: Multi-Surface Telemetry & Invariant Controls
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono text-xs font-bold">
                Regime: {autopsy.algorithmicRegime}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">
                  Executive Forensic Synthesis
                </span>
                <p className="text-sm text-slate-200 mt-1 leading-relaxed font-sans">
                  {autopsy.executiveSummary}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-amber-400 tracking-wider">
                  Root Cause Hypothesis
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  {autopsy.rootCauseHypothesis}
                </p>
              </div>
            </div>

            {/* Primary Drivers Breakdown */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider block">
                Primary Attribution Drivers
              </span>
              <div className="space-y-2.5">
                {autopsy.primaryDrivers.map((driver, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-white">{driver.driver}</span>
                      <span className="text-sky-400 font-bold">{driver.impactSharePct}% Attribution</span>
                    </div>
                    <p className="text-xs text-slate-400">{driver.evidence}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Negative Controls Verification */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider block">
                Invariant Negative Control Falsification Test
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {autopsy.negativeControlsVerified.map((ctrl, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs font-mono"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">{ctrl.metricName}</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> PASS
                      </span>
                    </div>
                    <span className="text-slate-200 font-bold block mt-1">
                      {ctrl.observedVariancePct > 0 ? `+${ctrl.observedVariancePct}%` : `${ctrl.observedVariancePct}%`} (Stable)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tactical Prescription */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Tactical Algorithm Directives
              </span>
              <div className="space-y-2 font-sans text-xs">
                {autopsy.tacticalPrescription.map((presc, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-sky-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{presc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COUNTERFACTUAL IMPACT */}
      {activeTab === "counterfactual" && counterfactual && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <CounterfactualChart impact={counterfactual} />
        </div>
      )}

      {/* TAB 3: SURFACE FLOW VECTORS */}
      {activeTab === "surfaceflow" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <SurfaceFlowDiagram
            vectors={shift.surfaceFlowVectors}
            breakdown={autopsy?.surfaceRedistributionBreakdown}
            regimeType={autopsy?.algorithmicRegime}
          />
        </div>
      )}

      {/* TAB 4: 14-DAY REMEDIATION PLAYBOOK */}
      {activeTab === "playbook" && (
        <div className="rounded-2xl border border-slate-800 bg-[#0B0F19] p-6 space-y-6 animate-in fade-in duration-200 shadow-2xl">
          <div className="border-b border-slate-800/80 pb-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400">
              Strategic Countermeasure Roadmap
            </span>
            <h3 className="text-base font-extrabold text-white mt-1">
              14-Day Tactical Algorithmic Resilience Playbook
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Structured day-by-day checklist to protect core viewer affinity and optimize recommendation recovery.
            </p>
          </div>

          <div className="space-y-4 font-sans text-xs">
            {/* Phase 1 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-sky-400 text-xs">DAYS 1 – 3: TRIAGE & CONTAINMENT</span>
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-mono font-bold">Phase 1</span>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Verify Search and Subscriber Notification CTR remains within normal baseline.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Do NOT unlist, private, or re-upload videos published during the active volatility window.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Do NOT alter thumbnails of videos older than 7 days.</span>
                </li>
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-indigo-400 text-xs">DAYS 4 – 7: HIGH-AFFINITY CORE CADENCE</span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold">Phase 2</span>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Publish core authority formats with focus on clear search keywords in the first 40 characters.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Pin an engaging discussion question in the comments within 15 minutes of publish to stimulate session depth.</span>
                </li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-emerald-400 text-xs">DAYS 8 – 14: RE-INDEXING & EXPANSION</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">Phase 3</span>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>A/B test thumbnail variants with elevated foreground contrast (+15%).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Cross-link back-catalogue evergreen videos via End Screens and Community tab.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: OVERVIEW SUMMARY */}
      {activeTab === "overview" && (
        <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 space-y-6 animate-in fade-in duration-200">
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

          <div className="border-t border-slate-800/80 pt-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              4. Invariant Controls (Unchanged Metrics)
            </h2>
            <ul className="mt-2 space-y-1 text-xs text-slate-300 font-mono">
              {shift.metricsThatDidNotChange.map((m, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
