import Link from "next/link";
import { Metadata } from "next";
import { Logo } from "@reachradar/ui";
import { Compass, Server, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "For Publishers & Media Networks | ReachRadar",
  description: "Enterprise API and multi-niche algorithm distribution telemetry for digital publishers.",
};

export default function ForPublishersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070A12] text-slate-100">
      <header className="border-b border-slate-800/80 bg-[#070A12]/90 sticky top-0 z-40 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
          <Link href="/"><Logo size="md" /></Link>
          <Link href="/pricing" className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 font-mono">
            View Scale & Enterprise →
          </Link>
        </div>
      </header>

      <main id="main-content" className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            Digital Publishers & Media Networks
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
            Enterprise Observability & API Telemetry
          </h1>
          <p className="mt-4 text-base text-slate-300">
            High-volume REST API access, cross-network distribution intelligence, and custom cohort definitions.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0D1322]">
            <Server className="w-6 h-6 text-emerald-400 mb-3" />
            <h3 className="font-bold text-white text-base">REST API & Webhooks</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Programmatically query shift events, cohort benchmarks, and volatility indices to power internal BI dashboards.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0D1322]">
            <Compass className="w-6 h-6 text-sky-400 mb-3" />
            <h3 className="font-bold text-white text-base">Custom Network Cohorts</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Define proprietary internal benchmark cohorts across your publication network with strict tenant isolation.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/app/onboarding?plan=scale"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 font-bold text-slate-950 hover:bg-emerald-400 font-mono shadow-lg"
          >
            <span>Request Enterprise Access</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
