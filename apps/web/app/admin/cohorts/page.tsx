export default function AdminCohortsPage() {
  const cohorts = [
    { name: "YouTube Global Baseline", channels: 240, owners: 160, hhi: "0.02", status: "PUBLIC" },
    { name: "Finance & Wealth · Macro Band", channels: 48, owners: 29, hhi: "0.05", status: "PUBLIC" },
    { name: "Tech Reviews & Hardware", channels: 55, owners: 38, hhi: "0.04", status: "PUBLIC" },
    { name: "Shorts · Fitness & Wellness", channels: 82, owners: 54, hhi: "0.03", status: "PUBLIC" },
    { name: "Rare Niche Example", channels: 4, owners: 2, hhi: "0.55", status: "SUPPRESSED (<25/10)" },
  ];

  return (
    <div className="space-y-8 font-mono text-xs">
      <div className="border-b border-slate-800/80 pb-6">
        <span className="text-rose-400 uppercase font-bold">Cohort Intelligence</span>
        <h1 className="text-2xl font-extrabold text-white mt-1 font-sans">Cohorts & Privacy Thresholds</h1>
        <p className="text-slate-400 mt-1">Verification of privacy invariant gates (MIN_PUBLIC_CHANNELS = 25, MIN_DISTINCT_OWNERS = 10).</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-[#0D1322] overflow-hidden">
        <table className="w-full text-left">
          <thead className="border-b border-slate-800 bg-slate-950 text-slate-400 uppercase text-[10px]">
            <tr>
              <th className="p-4">Cohort Name</th>
              <th className="p-4">Channels</th>
              <th className="p-4">Distinct Owners</th>
              <th className="p-4">HHI Concentration</th>
              <th className="p-4 text-right">Privacy Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {cohorts.map((c, i) => (
              <tr key={i} className="hover:bg-slate-900/40">
                <td className="p-4 font-bold text-white">{c.name}</td>
                <td className="p-4">{c.channels}</td>
                <td className="p-4">{c.owners}</td>
                <td className="p-4">{c.hhi}</td>
                <td className="p-4 text-right">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                      c.status === "PUBLIC"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-rose-500/20 text-rose-300"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
