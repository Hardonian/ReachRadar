import Link from "next/link";
import { Metadata } from "next";
import { Logo } from "@reachradar/ui";
import { CheckCircle2, ArrowRight, TrendingDown, Radar, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "For Creators | ReachRadar Algorithm Intelligence",
  description: "Stop guessing what happened to your reach. Know whether it's you — or YouTube.",
};

export default function ForCreatorsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070A12] text-slate-100">
      <header className="border-b border-slate-800/80 bg-[#070A12]/90 sticky top-0 z-40 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
          <Link href="/"><Logo size="md" /></Link>
          <Link href="/app/onboarding" className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 font-mono">
            Connect Channel →
          </Link>
        </div>
      </header>

      <main id="main-content" className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            Built for Independent & Studio Creators
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
            Don&apos;t redesign your strategy because of a bad Tuesday.
          </h1>
          <p className="mt-4 text-base text-slate-300">
            When your views drop, ReachRadar immediately tests your channel against a matched cohort of creators in your exact niche.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0D1322]">
            <Radar className="w-6 h-6 text-emerald-400 mb-3" />
            <h3 className="font-bold text-white text-base">Isolate the Surface</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Find out if your drop is concentrated entirely on Browse Home feeds while Search and Suggested remain unaffected.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0D1322]">
            <TrendingDown className="w-6 h-6 text-sky-400 mb-3" />
            <h3 className="font-bold text-white text-base">Matched Benchmarks</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Compare your performance against macro, mid, or micro channels in finance, tech, gaming, or fitness.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0D1322]">
            <Sparkles className="w-6 h-6 text-amber-400 mb-3" />
            <h3 className="font-bold text-white text-base">Clear Guidance</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Receive deterministic advice: Hold Strategy when the cohort declines, or Review Packaging if the drop is isolated.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/app/onboarding?plan=creator"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 font-bold text-slate-950 hover:bg-emerald-400 font-mono shadow-lg"
          >
            <span>Start Free Creator Trial</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
