export default function AdminIngestionPage() {
  return (
    <div className="space-y-8 font-mono text-xs">
      <div className="border-b border-slate-800/80 pb-6">
        <span className="text-rose-400 uppercase font-bold">Data Engineering</span>
        <h1 className="text-2xl font-extrabold text-white mt-1 font-sans">Provider Ingestion & Quotas</h1>
        <p className="text-slate-400 mt-1">YouTube Analytics & Data API quota tracking and daily run metrics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-slate-800 bg-[#0D1322]">
          <span className="text-slate-500 uppercase block text-[10px]">Daily Quota Used</span>
          <span className="text-2xl font-bold text-white mt-1 block">1,450 / 10,000</span>
          <span className="text-emerald-400 text-[10px]">14.5% quota consumption</span>
        </div>
        <div className="p-5 rounded-xl border border-slate-800 bg-[#0D1322]">
          <span className="text-slate-500 uppercase block text-[10px]">Total Ingestions (24h)</span>
          <span className="text-2xl font-bold text-white mt-1 block">42 Runs</span>
          <span className="text-emerald-400 text-[10px]">100% success rate</span>
        </div>
        <div className="p-5 rounded-xl border border-slate-800 bg-[#0D1322]">
          <span className="text-slate-500 uppercase block text-[10px]">Provider Rate Limits</span>
          <span className="text-2xl font-bold text-emerald-400 mt-1 block">0 Throttle Events</span>
          <span className="text-slate-400 text-[10px]">Clean backoff</span>
        </div>
      </div>
    </div>
  );
}
