"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@reachradar/ui";
import { DEMO_CHANNELS } from "@reachradar/providers";
import {
  User,
  Building,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Tv,
  RefreshCw,
  Lock,
} from "lucide-react";

export default function OnboardingWizardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan") || "creator";

  const [step, setStep] = useState<number>(1);
  const [role, setRole] = useState<string>("creator");
  const [orgName, setOrgName] = useState<string>("My Creator Studio");
  const [selectedChannel, setSelectedChannel] = useState<string>("demo-ch-finance-1");
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncProgress, setSyncProgress] = useState<number>(0);

  const handleStartSync = () => {
    setIsSyncing(true);
    let prog = 0;
    const timer = setInterval(() => {
      prog += 25;
      setSyncProgress(prog);
      if (prog >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          router.push("/app");
        }, 500);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center">
        <Link href="/" className="inline-block">
          <Logo size="lg" />
        </Link>
        <div className="mt-6 flex items-center justify-center gap-2 font-mono text-xs text-slate-500">
          <span className={step >= 1 ? "text-emerald-400 font-bold" : ""}>1. Role</span>
          <span>→</span>
          <span className={step >= 2 ? "text-emerald-400 font-bold" : ""}>2. Workspace</span>
          <span>→</span>
          <span className={step >= 3 ? "text-emerald-400 font-bold" : ""}>3. Connect Channel</span>
          <span>→</span>
          <span className={step >= 4 ? "text-emerald-400 font-bold" : ""}>4. Baseline</span>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-8 shadow-2xl space-y-6">
          {/* STEP 1: Role Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">How will you use ReachRadar?</h2>
                <p className="text-xs text-slate-400 mt-1">
                  We customize your dashboard layouts and cohort fallbacks based on your operational scale.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("creator")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    role === "creator"
                      ? "border-emerald-500 bg-emerald-500/10 text-white"
                      : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <User className="w-5 h-5 text-emerald-400 mb-2" />
                  <div className="font-bold text-sm text-slate-200">Solo Creator</div>
                  <div className="text-[11px] text-slate-400 mt-1">1–5 owned channels</div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("studio")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    role === "studio"
                      ? "border-emerald-500 bg-emerald-500/10 text-white"
                      : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <Building className="w-5 h-5 text-sky-400 mb-2" />
                  <div className="font-bold text-sm text-slate-200">Studio / Team</div>
                  <div className="text-[11px] text-slate-400 mt-1">Multiple channels & editors</div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("agency")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    role === "agency"
                      ? "border-emerald-500 bg-emerald-500/10 text-white"
                      : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <Layers className="w-5 h-5 text-amber-400 mb-2" />
                  <div className="font-bold text-sm text-slate-200">Agency / MCN</div>
                  <div className="text-[11px] text-slate-400 mt-1">Client roster management</div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("publisher")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    role === "publisher"
                      ? "border-emerald-500 bg-emerald-500/10 text-white"
                      : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-rose-400 mb-2" />
                  <div className="font-bold text-sm text-slate-200">Media Publisher</div>
                  <div className="text-[11px] text-slate-400 mt-1">Large media network</div>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-all font-mono"
              >
                Continue →
              </button>
            </div>
          )}

          {/* STEP 2: Workspace Creation */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Name your Workspace</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Workspaces group your connected channels and team members with strict data isolation.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-2">
                  Organization / Workspace Name
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-400 hover:text-white"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 rounded-xl bg-emerald-500 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-all font-mono"
                >
                  Next: Connect Channel →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Connect YouTube or Demo Data */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Connect your YouTube Channel</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Read-only access to view and traffic analytics. We never request publishing or edit permissions.
                </p>
              </div>

              {/* Option A: Real Google OAuth */}
              <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>Official Google OAuth Connection</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Read-Only</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Authenticates with Google to discover channels associated with your account.
                </p>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="w-full py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-white hover:bg-slate-700 transition-colors font-mono"
                >
                  Connect Google Account
                </button>
              </div>

              {/* Option B: Demo Dataset */}
              <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-950/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Explore with Seeded Demo Channels</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Instant Preview</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Test the platform with reproducible synthetic channels in finance, tech, and fitness.
                </p>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="w-full py-2.5 rounded-lg bg-emerald-500 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all font-mono"
                >
                  Use Demo Channel (Capital Horizon · 642k Subs) →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Initial Sync & Baseline Progress */}
          {step === 4 && (
            <div className="space-y-6 text-center">
              <div>
                <h2 className="text-xl font-bold text-white">Channel Discovered</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Ready to calculate your 28-day baseline and match your niche cohort.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-left flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 font-mono text-lg shrink-0">
                  CH
                </div>
                <div className="truncate flex-1">
                  <div className="text-sm font-bold text-white">Capital Horizon</div>
                  <div className="text-xs text-slate-500 font-mono">@capitalhorizon · 642,000 Subscribers</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300">
                  Ready
                </span>
              </div>

              {isSyncing ? (
                <div className="space-y-3 py-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Processing Historical Horizon...</span>
                    <span className="text-emerald-400">{syncProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-300 ease-out"
                      style={{ width: `${syncProgress}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Normalizing daily views, traffic distributions, and generating 28-day seasonality models.
                  </p>
                </div>
              ) : (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleStartSync}
                    className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-all font-mono shadow-lg"
                  >
                    Start Ingestion & Open Dashboard →
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/app")}
                    className="mt-3 text-xs font-mono text-slate-400 hover:text-white"
                  >
                    Skip wait and continue to dashboard
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
