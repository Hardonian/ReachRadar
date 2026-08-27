"use client";

import React, { useState } from "react";
import { Bell, Plus, ShieldCheck, Mail, Globe, CheckCircle2, Trash2 } from "lucide-react";

interface AlertItem {
  id: string;
  name: string;
  condition: string;
  channels: string[];
  cooldownHours: number;
  isEnabled: boolean;
}

export default function AlertsManagementPage() {
  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: "alt-1",
      name: "Global YouTube Weather > 60 (Elevated)",
      condition: "platform_weather_elevated",
      channels: ["in_app", "email"],
      cooldownHours: 24,
      isEnabled: true,
    },
    {
      id: "alt-2",
      name: "Finance Cohort Shift with Strong Signal",
      condition: "niche_shift_detected",
      channels: ["in_app", "email"],
      cooldownHours: 12,
      isEnabled: true,
    },
    {
      id: "alt-3",
      name: "My Channel Classified as LIKELY AFFECTED",
      condition: "channel_likely_affected",
      channels: ["in_app"],
      cooldownHours: 24,
      isEnabled: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRuleName, setNewRuleName] = useState("");

  const handleToggle = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isEnabled: !a.isEnabled } : a))
    );
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName) return;
    setAlerts((prev) => [
      ...prev,
      {
        id: `alt-${Date.now()}`,
        name: newRuleName,
        condition: "surface_movement_exceeds",
        channels: ["in_app", "email"],
        cooldownHours: 24,
        isEnabled: true,
      },
    ]);
    setNewRuleName("");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            Early Warning System
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            Automated Alert Rules
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure idempotently routed alerts for algorithm spikes, niche shifts, and channel impacts.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold font-mono text-slate-950 hover:bg-emerald-400 transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Alert Rule</span>
        </button>
      </div>

      {/* Alert Rules List */}
      <div className="space-y-4">
        {alerts.map((alt) => (
          <div
            key={alt.id}
            className="rounded-2xl border border-slate-800 bg-[#0D1322] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Bell className={`w-4 h-4 ${alt.isEnabled ? "text-emerald-400" : "text-slate-600"}`} />
                <h2 className="text-sm font-bold text-white">{alt.name}</h2>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span>Channels: {alt.channels.join(", ")}</span>
                <span>·</span>
                <span>Cooldown: {alt.cooldownHours}h</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleToggle(alt.id)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border transition-colors ${
                  alt.isEnabled
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                    : "bg-slate-900 text-slate-500 border-slate-800"
                }`}
              >
                {alt.isEnabled ? "ACTIVE" : "PAUSED"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0D1322] p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Create Distribution Alert Rule</h3>
            <form onSubmit={handleAddRule} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">
                  Rule Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Browse Drops > 20% in Tech Cohort"
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-800 text-xs font-mono text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-xs font-mono font-bold text-slate-950 hover:bg-emerald-400"
                >
                  Save Alert Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
