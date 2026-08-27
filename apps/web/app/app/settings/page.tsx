"use client";

import React, { useState } from "react";
import { User, Building, Moon, Sun, Bell, Key, ShieldCheck, Download, Trash2, Copy, Check } from "lucide-react";

export default function SettingsPage() {
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  const handleGenerateApiKey = () => {
    const key = `rr_live_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(key);
  };

  const handleCopyKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
          System Preferences
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
          Account & Workspace Settings
        </h1>
      </div>

      {/* Profile & Organization */}
      <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-emerald-400" />
          <span>User Profile & Workspace</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <label className="text-slate-400 block mb-1.5 uppercase font-bold">Full Name</label>
            <input
              type="text"
              defaultValue="Alex Rivera"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1.5 uppercase font-bold">Email Address</label>
            <input
              type="email"
              disabled
              defaultValue="alex@riveramedia.io"
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-slate-400 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Moon className="w-4 h-4 text-sky-400" />
          <span>Interface Appearance</span>
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => setTheme("dark")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-colors ${
              theme === "dark"
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            Terminal Dark (Default)
          </button>
          <button
            onClick={() => setTheme("light")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-colors ${
              theme === "light"
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            Off-White Light
          </button>
          <button
            onClick={() => setTheme("system")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-colors ${
              theme === "system"
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            System Sync
          </button>
        </div>
      </div>

      {/* Developer API Keys */}
      <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-amber-400" />
            <span>Enterprise API Keys</span>
          </h2>
          <button
            onClick={handleGenerateApiKey}
            className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-mono font-bold text-xs hover:bg-emerald-400"
          >
            + Generate Key
          </button>
        </div>

        <p className="text-xs text-slate-400">
          Programmatically query algorithm volatility and shift intelligence via the ReachRadar v1 REST API.
        </p>

        {apiKey && (
          <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-950/20 space-y-2">
            <div className="text-[11px] font-mono text-amber-300 font-bold uppercase">
              Important: Store this key safely. It will not be shown again.
            </div>
            <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg font-mono text-xs text-emerald-400">
              <code>{apiKey}</code>
              <button onClick={handleCopyKey} className="text-slate-400 hover:text-white ml-2">
                {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Data & Privacy Controls */}
      <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Data Privacy & Deletion</span>
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          ReachRadar operates under strict PIPEDA/GDPR data subject rights. You have the permanent right to export or delete your analytics data.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => alert("Account metadata exported.")}
            className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-xs font-mono font-bold text-slate-300 hover:text-white"
          >
            Export Account Archive
          </button>
          <button
            onClick={() => {
              if (confirm("Permanently delete workspace and all metrics?")) {
                alert("Workspace deletion scheduled.");
              }
            }}
            className="px-4 py-2 rounded-xl border border-rose-900/50 bg-rose-950/20 text-xs font-mono font-bold text-rose-400 hover:bg-rose-900/40"
          >
            Delete Workspace & Data
          </button>
        </div>
      </div>
    </div>
  );
}
