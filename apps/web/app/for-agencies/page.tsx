import Link from "next/link";
import { Metadata } from "next";
import { Logo } from "@reachradar/ui";
import { Layers, Users, BarChart3, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "For Agencies & Management Companies | ReachRadar",
  description: "Monitor 25–100+ client YouTube channels from a centralized distribution radar.",
};

export default function ForAgenciesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070A12] text-slate-100">
      <header className="border-b border-slate-800/80 bg-[#070A12]/90 sticky top-0 z-40 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
          <Link href="/"><Logo size="md" /></Link>
          <Link href="/app/onboarding?plan=studio" className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 font-mono">
            Explore Studio Workspace →
          </Link>
        </div>
      </header>

      <main id="main-content" className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
            For Creator Agencies & MCNs
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
            Centralized Portfolio Intelligence for Client Channels
          </h1>
          <p className="mt-4 text-base text-slate-300">
            Explain client view fluctuations with empirical evidence. Group channels by roster, set automated shift alerts, and export white-label intelligence reports.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0D1322]">
            <Layers className="w-6 h-6 text-sky-400 mb-3" />
            <h3 className="font-bold text-white text-base">Client Groupings</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Segment your portfolio by roster, talent manager, or content vertical with dedicated team access.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0D1322]">
            <BarChart3 className="w-6 h-6 text-emerald-400 mb-3" />
            <h3 className="font-bold text-white text-base">Client-Ready Reports</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Generate weekly intelligence reports explaining systemic shifts before creators panic.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0D1322]">
            <Users className="w-6 h-6 text-amber-400 mb-3" />
            <h3 className="font-bold text-white text-base">Bulk Shift Alerts</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Route instant email and webhook notifications when high-confidence shifts hit any client niche.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/app/onboarding?plan=studio"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 font-bold text-slate-950 hover:bg-emerald-400 font-mono shadow-lg"
          >
            <span>Launch Agency Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
