"use client";

import React, { useState } from "react";
import { Lock, RefreshCw, Trash2, CheckCircle2, AlertCircle } from "lucide-react";

export default function IntegrationsPage() {
  const [isConnected, setIsConnected] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedSuccess, setDeletedSuccess] = useState(false);

  const handleDisconnect = () => {
    if (confirm("Disconnecting will revoke tokens and remove this channel from future cohort calculations. Continue?")) {
      setIsConnected(false);
    }
  };

  const handleDeleteData = () => {
    if (confirm("Are you sure you want to permanently delete all historical raw telemetry data for this channel? This action cannot be undone.")) {
      setIsDeleting(true);
      setTimeout(() => {
        setIsDeleting(false);
        setDeletedSuccess(true);
      }, 600);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
          External Platform Connections
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
          Connected Integrations
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage authorized platform accounts, OAuth tokens, and telemetry deletion lifecycles.
        </p>
      </div>

      {/* Connected Accounts */}
      <div className="space-y-6">
        {/* YouTube Connection */}
        <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center font-bold text-rose-400 font-mono text-sm">
                YT
              </div>
              <div>
                <h2 className="text-base font-bold text-white">YouTube Analytics API (Official)</h2>
                <div className="text-xs font-mono text-slate-400">Account: alex@riveramedia.io</div>
              </div>
            </div>

            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase border ${
                isConnected
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                  : "bg-slate-800 text-slate-400 border-slate-700"
              }`}
            >
              {isConnected ? "CONNECTED (ENCRYPTED)" : "DISCONNECTED"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-300">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Encryption Standard</span>
              <span className="text-emerald-400 font-bold">AES-256-GCM (v1)</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Scopes Granted</span>
              <span className="text-slate-200 font-bold">youtube.readonly</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Last Sync Token</span>
              <span className="text-slate-200 font-bold">18 min ago (Valid)</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/60 flex flex-wrap gap-3">
            {isConnected ? (
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 rounded-xl border border-rose-900/50 bg-rose-950/20 text-xs font-mono font-bold text-rose-300 hover:bg-rose-900/40 transition-colors"
              >
                Disconnect & Revoke OAuth Token
              </button>
            ) : (
              <button
                onClick={() => setIsConnected(true)}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-xs font-mono font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
              >
                Reconnect YouTube Account
              </button>
            )}

            <button
              onClick={handleDeleteData}
              disabled={isDeleting}
              className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-900 text-xs font-mono font-bold text-slate-400 hover:text-rose-400 hover:border-rose-900 transition-colors"
            >
              {isDeleting ? "Purging Telemetry..." : "Delete Historical Telemetry"}
            </button>
          </div>

          {deletedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 font-mono">
              ✓ Historical channel telemetry successfully queued for complete database purge.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
