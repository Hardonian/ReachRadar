import Link from "next/link";
import { Radar, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-8 max-w-md w-full space-y-4">
        <Radar className="w-12 h-12 text-emerald-400 mx-auto" />
        <h1 className="text-xl font-bold text-white">404 — Surface Not Found</h1>
        <p className="text-xs text-slate-400">
          The requested route or distribution report does not exist in our telemetry index.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 font-mono font-bold text-xs text-slate-950 hover:bg-emerald-400"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Radar Station</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
