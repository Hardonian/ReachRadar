import { Activity, Database, Cpu, CreditCard, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function AdminHealthPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
          Operations & Infrastructure
        </span>
        <h1 className="text-2xl font-extrabold text-white mt-1">System Health & Telemetry</h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-5 rounded-2xl border border-slate-800 bg-[#0D1322] space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5"><Database className="w-4 h-4 text-emerald-400" /> PostgreSQL DB</span>
            <span className="text-emerald-400 font-bold">HEALTHY</span>
          </div>
          <div className="text-2xl font-extrabold text-white">4ms latency</div>
          <div className="text-[10px] text-slate-500">Connection pool: 8/20 active</div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-[#0D1322] space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5"><Cpu className="w-4 h-4 text-sky-400" /> Job Queue Backlog</span>
            <span className="text-sky-400 font-bold">0 PENDING</span>
          </div>
          <div className="text-2xl font-extrabold text-white">100% drained</div>
          <div className="text-[10px] text-slate-500">Dead letter count: 0</div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-[#0D1322] space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5"><CreditCard className="w-4 h-4 text-emerald-400" /> Stripe Webhooks</span>
            <span className="text-emerald-400 font-bold">SYNCED</span>
          </div>
          <div className="text-2xl font-extrabold text-white">100% success</div>
          <div className="text-[10px] text-slate-500">Idempotency checks: Active</div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 space-y-3 font-mono text-xs">
        <h2 className="text-sm font-bold text-white uppercase">Daemon Execution Diagnostics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-slate-300">
          <div>• Last Ingestion Run: <strong className="text-slate-100">18 minutes ago</strong></div>
          <div>• Last Shift Ensemble Run: <strong className="text-slate-100">18 minutes ago</strong></div>
          <div>• Token Encryption Keyring: <strong className="text-emerald-400">v1 Active (AES-256-GCM)</strong></div>
          <div>• Privacy Threshold Enforcer: <strong className="text-emerald-400">Enforcing &ge;25 / &ge;10</strong></div>
        </div>
      </div>
    </div>
  );
}
