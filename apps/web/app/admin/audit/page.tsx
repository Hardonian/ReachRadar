import React from "react";

export default function AdminAuditLogPage() {
  const logs = [
    { action: "channel.connected", actor: "alex@riveramedia.io", target: "Capital Horizon (finance)", time: "18m ago" },
    { action: "billing.checkout_completed", actor: "alex@riveramedia.io", target: "Pro Plan ($49/mo)", time: "25m ago" },
    { action: "alert_rule.created", actor: "alex@riveramedia.io", target: "Global Weather > 60", time: "1h ago" },
    { action: "member.invited", actor: "alex@riveramedia.io", target: "sarah@riveramedia.io (admin)", time: "2d ago" },
  ];

  return (
    <div className="space-y-8 font-mono text-xs">
      <div className="border-b border-slate-800/80 pb-6">
        <span className="text-rose-400 uppercase font-bold">Security & Compliance</span>
        <h1 className="text-2xl font-extrabold text-white mt-1 font-sans">Audit Trail Log</h1>
        <p className="text-slate-400 mt-1">Immutable security log of sensitive mutations and tenant actions.</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-[#0D1322] overflow-hidden">
        <table className="w-full text-left">
          <thead className="border-b border-slate-800 bg-slate-950 text-slate-400 uppercase text-[10px]">
            <tr>
              <th className="p-4">Action</th>
              <th className="p-4">Actor</th>
              <th className="p-4">Target</th>
              <th className="p-4 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {logs.map((l, i) => (
              <tr key={i} className="hover:bg-slate-900/40">
                <td className="p-4 font-bold text-white"><code>{l.action}</code></td>
                <td className="p-4">{l.actor}</td>
                <td className="p-4 text-slate-300">{l.target}</td>
                <td className="p-4 text-right text-slate-500">{l.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
