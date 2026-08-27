"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="rounded-2xl border border-rose-900/40 bg-[#0D1322] p-8 max-w-md w-full space-y-4">
        <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-white">Temporary Telemetry Interruption</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          An unexpected error occurred while rendering this view. Your connected credentials and historical data remain secure.
        </p>
        <div className="flex gap-3 justify-center pt-2 font-mono text-xs">
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded-xl bg-emerald-500 font-bold text-slate-950 hover:bg-emerald-400 flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry</span>
          </button>
          <Link
            href="/"
            className="px-4 py-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
