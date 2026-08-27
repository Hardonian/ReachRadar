"use client";

import Link from "next/link";
import { FileText, Download, Printer, Calendar, ArrowRight } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
          Intelligence Reporting
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
          Reports & Dossier Exports
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Weekly creator summaries, portfolio health reviews, and shift incident post-mortems.
        </p>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Creator Intelligence */}
        <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300">
              Weekly Digest
            </span>
          </div>

          <h2 className="text-lg font-bold text-white">
            Weekly Creator Intelligence Report
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Summary of what shifted, how your personal channel was impacted, stable negative controls, and strategic actions for the upcoming week.
          </p>

          <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500">Period: Aug 19 – Aug 26</span>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:underline font-bold"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF View</span>
            </button>
          </div>
        </div>

        {/* Agency Portfolio Report */}
        <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <FileText className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-sky-500/20 text-sky-300">
              Portfolio
            </span>
          </div>

          <h2 className="text-lg font-bold text-white">
            Agency Portfolio Weather Report
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Multi-client roll-up comparing 4 channels across finance, technology, and fitness niches. Isolates client-specific drops from platform volatility.
          </p>

          <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500">Channels: 4 Active</span>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 text-sky-400 hover:underline font-bold"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF View</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
