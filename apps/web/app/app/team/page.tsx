"use client";

import React, { useState } from "react";
import { Users, Plus, Mail, Shield, UserPlus } from "lucide-react";

interface Member {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "analyst" | "viewer";
}

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>([
    { id: "m1", name: "Alex Rivera", email: "alex@riveramedia.io", role: "owner" },
    { id: "m2", name: "Sarah Chen", email: "sarah@riveramedia.io", role: "admin" },
    { id: "m3", name: "David Kim", email: "david@riveramedia.io", role: "analyst" },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
            Workspace Governance
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            Team & Role Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage organization members, analytical permissions, and client-scoped roles.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold font-mono text-slate-950 hover:bg-emerald-400 transition-all shadow-md shrink-0">
          <UserPlus className="w-4 h-4" />
          <span>Invite Member</span>
        </button>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-[#0D1322] overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase text-[11px]">
            <tr>
              <th className="p-4">Member</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-slate-900/40">
                <td className="p-4 font-bold text-white">{m.name}</td>
                <td className="p-4 text-slate-400">{m.email}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] uppercase font-bold text-emerald-400">
                    {m.role}
                  </span>
                </td>
                <td className="p-4 text-right text-slate-500">
                  {m.role !== "owner" && <button className="hover:text-rose-400">Remove</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
