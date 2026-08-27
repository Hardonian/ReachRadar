"use client";

import React, { useState } from "react";
import { Sparkles, Play, ShieldAlert, CheckCircle2, ArrowRight, Lightbulb, TrendingUp, Layers, RefreshCw } from "lucide-react";
import { PackagingSimulationResult } from "@reachradar/domain";

export default function SimulatorPage() {
  const [title, setTitle] = useState("Why The Global Economy Is Silently Changing (What Nobody Tells You)");
  const [thumbnailDescription, setThumbnailDescription] = useState(
    "High-contrast dark navy background with glowing red line graph, creator face looking shocked on the right with subtle rim lighting, single bold word 'WARNING' in yellow."
  );
  const [durationMinutes, setDurationMinutes] = useState(14);
  const [niche, setNiche] = useState("finance");
  const [targetFormat, setTargetFormat] = useState<"long_form" | "shorts" | "podcast" | "live">("long_form");
  const [primaryHookType, setPrimaryHookType] = useState<
    "curiosity_gap" | "direct_authority" | "controversy_challenge" | "tutorial_utility" | "story_transformation"
  >("curiosity_gap");

  const [isLoading, setIsLoading] = useState(false);
  const [simulationResult, setSimulationResult] = useState<PackagingSimulationResult | null>(null);

  const handleRunSimulation = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/v1/ai/simulator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          thumbnailDescription,
          durationMinutes,
          niche,
          targetFormat,
          primaryHookType,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setSimulationResult(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" /> AI Distribution Resilience Lab
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            Packaging & Topic Shift Simulator
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Test planned video titles, thumbnails, and hook pacing against active algorithmic volatility before uploading.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Niche Weather: <strong className="text-white">58/100 (Active)</strong></span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-5 sm:p-6 space-y-5 shadow-xl">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-400" /> Planned Asset Parameters
            </h2>

            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 block font-semibold">
                Video Title Concept
              </label>
              <textarea
                rows={2}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter planned video title..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 font-sans"
              />
              <span className="text-[10px] font-mono text-slate-500 block text-right">
                {title.length} characters (Optimal: 40–60)
              </span>
            </div>

            {/* Thumbnail Description */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 block font-semibold">
                Thumbnail Visual Concept & Composition
              </label>
              <textarea
                rows={3}
                value={thumbnailDescription}
                onChange={(e) => setThumbnailDescription(e.target.value)}
                placeholder="Describe thumbnail elements, text, foreground subject, background contrast..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 font-sans"
              />
            </div>

            {/* Niche & Format */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400 block font-semibold">
                  Content Niche
                </label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-sky-500"
                >
                  <option value="finance">Finance & Wealth</option>
                  <option value="technology">Technology & AI</option>
                  <option value="fitness">Fitness & Health</option>
                  <option value="gaming">Gaming & Esports</option>
                  <option value="education">Science & Education</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400 block font-semibold">
                  Target Duration
                </label>
                <input
                  type="number"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  min={1}
                  max={120}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Hook Style */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400 block font-semibold">
                Primary Narrative Hook Style
              </label>
              <select
                value={primaryHookType}
                onChange={(e) => setPrimaryHookType(e.target.value as any)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-sky-500"
              >
                <option value="curiosity_gap">Curiosity Gap (Question / Hidden Secret)</option>
                <option value="direct_authority">Direct Authority (Proof / Definitive Statement)</option>
                <option value="controversy_challenge">Controversy / Common Mistake Challenge</option>
                <option value="story_transformation">Story Transformation (Before & After)</option>
                <option value="tutorial_utility">Tutorial & Direct Step-by-Step Utility</option>
              </select>
            </div>

            {/* Run Button */}
            <button
              onClick={handleRunSimulation}
              disabled={isLoading || !title.trim()}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Evaluating Algorithm Resilience...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Run Algorithmic Packaging Simulation</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Results Column */}
        <div className="lg:col-span-7 space-y-6">
          {simulationResult ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Score Header Card */}
              <div className="rounded-2xl border border-slate-800 bg-[#0B0F19] p-6 shadow-2xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Simulation Verdict
                    </span>
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className="text-4xl font-extrabold font-mono text-white">
                        {simulationResult.resilienceScore}
                        <span className="text-xl text-slate-500 font-normal">/100</span>
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${
                          simulationResult.resilienceTier === "HIGHLY_RESILIENT"
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                            : simulationResult.resilienceTier === "STABLE"
                            ? "bg-sky-500/20 text-sky-300 border-sky-500/40"
                            : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        }`}
                      >
                        {simulationResult.resilienceTier.replace("_", " ")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-500 uppercase block">Pickup Probability</span>
                      <span className="text-emerald-400 font-bold text-base block mt-0.5">
                        {simulationResult.pickupProbability}%
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-500 uppercase block">Velocity Rating</span>
                      <span className="text-sky-400 font-bold text-base block mt-0.5">
                        {simulationResult.expectedDistributionVelocity}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {simulationResult.actionSummary}
                </p>

                {/* Factor Breakdown Bars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-400">Title Click Affinity</span>
                      <span className="text-white font-bold">{simulationResult.factorScores.titleClickAffinity}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sky-500 rounded-full"
                        style={{ width: `${simulationResult.factorScores.titleClickAffinity}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-400">Thumbnail Clarity</span>
                      <span className="text-white font-bold">{simulationResult.factorScores.thumbnailConceptClarity}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${simulationResult.factorScores.thumbnailConceptClarity}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-400">Duration Fit (Current Regime)</span>
                      <span className="text-white font-bold">{simulationResult.factorScores.durationFitUnderCurrentRegime}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${simulationResult.factorScores.durationFitUnderCurrentRegime}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-400">Hook & Retention Synergy</span>
                      <span className="text-white font-bold">{simulationResult.factorScores.hookRetentionSynergy}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${simulationResult.factorScores.hookRetentionSynergy}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Revisions */}
              <div className="rounded-2xl border border-slate-800 bg-[#0B0F19] p-6 space-y-4 shadow-xl">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> AI Actionable Packaging Revisions
                </h3>
                <div className="space-y-3">
                  {simulationResult.recommendedRevisions.map((rev, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-sans text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                          {rev.area} optimization
                        </span>
                        <span className="font-mono text-[10px] text-emerald-400 font-bold">
                          +{rev.predictedScoreLift} Score Lift
                        </span>
                      </div>
                      <p className="text-slate-400">{rev.currentFlaw}</p>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 flex items-start gap-2 font-mono text-[11px]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{rev.tacticalFix}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 rounded-2xl border border-slate-800/80 bg-[#0B0F19]/60 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                <Sparkles className="w-6 h-6 text-sky-400" />
              </div>
              <h3 className="text-sm font-bold text-slate-300 font-mono">
                Ready for Algorithmic Stress Testing
              </h3>
              <p className="text-xs text-slate-500 max-w-md">
                Configure your video parameters on the left and run simulation to predict recommendation pickup probability and receive packaging optimizations.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
