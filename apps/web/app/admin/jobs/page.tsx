import { Cpu, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminJobsPage() {
  const jobs = [
    { id: "job_01", type: "analysis.platform", state: "completed", attempts: 1, availableAt: "18m ago" },
    { id: "job_02", type: "analysis.cohort", state: "completed", attempts: 1, availableAt: "22m ago" },
    { id: "job_03", type: "youtube.incremental_sync", state: "completed", attempts: 1, availableAt: "25m ago" },
    { id: "job_04", type: "alerts.evaluate", state: "completed", attempts: 1, availableAt: "26m ago" },
  ];

  return (
    <div className="space-y-8 font-mono text-xs">
      <div className="border-b border-slate-800/80 pb-6">
        <span className="text-rose-400 uppercase font-bold">Durable Job Queue</span>
        <h1 className="text-2xl font-extrabold text-white mt-1 font-sans">PostgreSQL Jobs & Workers</h1>
        <p className="text-slate-400 mt-1">FOR UPDATE SKIP LOCKED transactional queue execution log.</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-[#0D1322] overflow-hidden">
        <table className="w-full text-left">
          <thead className="border-b border-slate-800 bg-slate-950 text-slate-400 uppercase text-[10px]">
            <tr>
              <th className="p-4">Job ID</th>
              <th className="p-4">Type</th>
              <th className="p-4">State</th>
              <th className="p-4">Attempts</th>
              <th className="p-4 text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {jobs.map((j) => (
              <tr key={j.id} className="hover:bg-slate-900/40">
                <td className="p-4 text-slate-400">{j.id}</td>
                <td className="p-4 font-bold text-white">{j.type}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] uppercase font-bold">
                    {j.state}
                  </span>
                </td>
                <td className="p-4">{j.attempts}/5</td>
                <td className="p-4 text-right text-slate-500">{j.availableAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
