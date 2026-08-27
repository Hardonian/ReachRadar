"use client";

import React, { useEffect, useState } from "react";
import { Activity, ShieldAlert, Zap, TrendingUp, TrendingDown } from "lucide-react";

interface PulsePoint {
  time: string;
  val: number;
}

export function SeismographTicker({
  initialRax = 44.8,
  initialDelta = 3.2,
  statusLabel = "ELEVATED VOLATILITY",
}: {
  initialRax?: number;
  initialDelta?: number;
  statusLabel?: string;
}) {
  const [rax, setRax] = useState(initialRax);
  const [pulseHistory, setPulseHistory] = useState<PulsePoint[]>([]);

  useEffect(() => {
    // Generate initial history
    const initial: PulsePoint[] = [];
    const now = Date.now();
    for (let i = 24; i >= 0; i--) {
      const v = Math.max(15, Math.min(90, initialRax + Math.sin(i * 0.5) * 6 + (Math.random() * 4 - 2)));
      initial.push({
        time: new Date(now - i * 2000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        val: Math.round(v * 10) / 10,
      });
    }
    setPulseHistory(initial);

    const interval = setInterval(() => {
      setPulseHistory((prev) => {
        const lastVal = prev.length > 0 ? prev[prev.length - 1].val : initialRax;
        const drift = Math.sin(Date.now() / 3000) * 1.5 + (Math.random() * 2 - 1);
        const nextVal = Math.max(10, Math.min(95, Math.round((lastVal + drift) * 10) / 10));
        setRax(nextVal);
        const nextTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        return [...prev.slice(1), { time: nextTime, val: nextVal }];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [initialRax]);

  const isHigh = rax >= 60;
  const isModerate = rax >= 40 && rax < 60;

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B0F19] p-4 sm:p-5 shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div
        className={`absolute -right-20 -top-20 w-60 h-60 rounded-full blur-3xl pointer-events-none transition-colors duration-1000 ${
          isHigh ? "bg-rose-500/10" : isModerate ? "bg-amber-500/10" : "bg-emerald-500/10"
        }`}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 border border-slate-800">
            <Activity
              className={`w-5 h-5 animate-pulse ${
                isHigh ? "text-rose-400" : isModerate ? "text-amber-400" : "text-emerald-400"
              }`}
            />
            <span
              className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ring-2 ring-slate-950 ${
                isHigh ? "bg-rose-500" : isModerate ? "bg-amber-500" : "bg-emerald-500"
              }`}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                ReachRadar Algorithm Index (RAX)
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-slate-800 text-sky-300 border border-slate-700">
                <Zap className="w-2.5 h-2.5 text-sky-400" /> LIVE SEISMOGRAPH
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                {rax.toFixed(1)}
              </span>
              <span
                className={`flex items-center text-xs font-mono font-bold ${
                  initialDelta >= 0 ? "text-rose-400" : "text-emerald-400"
                }`}
              >
                {initialDelta >= 0 ? <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> : <TrendingDown className="w-3.5 h-3.5 mr-0.5" />}
                {initialDelta >= 0 ? `+${initialDelta.toFixed(1)}` : initialDelta.toFixed(1)} (24h)
              </span>
              <span className="text-slate-600 text-xs font-mono">·</span>
              <span
                className={`text-[11px] font-mono font-bold uppercase ${
                  isHigh ? "text-rose-400" : isModerate ? "text-amber-400" : "text-emerald-400"
                }`}
              >
                {statusLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span className="text-[10px] text-slate-500 uppercase">Browse</span>
            <span className="font-bold text-white">58.2</span>
          </div>
          <div className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[10px] text-slate-500 uppercase">Shorts</span>
            <span className="font-bold text-white">42.1</span>
          </div>
          <div className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-slate-500 uppercase">TikTok</span>
            <span className="font-bold text-white">35.4</span>
          </div>
        </div>
      </div>

      {/* SVG Seismograph Stream */}
      <div className="mt-4 pt-2">
        <div className="h-16 w-full relative">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
            {/* Grid baseline lines */}
            <line x1="0" y1="20" x2="100" y2="20" stroke="#1E293B" strokeDasharray="2 2" strokeWidth="0.5" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#334155" strokeDasharray="2 2" strokeWidth="0.7" />
            <line x1="0" y1="80" x2="100" y2="80" stroke="#1E293B" strokeDasharray="2 2" strokeWidth="0.5" />

            {/* Pulsing Line */}
            {pulseHistory.length > 1 && (
              <>
                <defs>
                  <linearGradient id="seismoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop
                      offset="0%"
                      stopColor={isHigh ? "#F43F5E" : isModerate ? "#F59E0B" : "#10B981"}
                      stopOpacity="0.4"
                    />
                    <stop offset="100%" stopColor="#0B0F19" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Area Fill */}
                <polygon
                  fill="url(#seismoGrad)"
                  points={`0,100 ${pulseHistory
                    .map((p, idx) => {
                      const x = (idx / (pulseHistory.length - 1)) * 100;
                      const y = 100 - (p.val / 100) * 100;
                      return `${x},${y}`;
                    })
                    .join(" ")} 100,100`}
                />

                {/* Stroke */}
                <polyline
                  fill="none"
                  stroke={isHigh ? "#F43F5E" : isModerate ? "#F59E0B" : "#10B981"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={pulseHistory
                    .map((p, idx) => {
                      const x = (idx / (pulseHistory.length - 1)) * 100;
                      const y = 100 - (p.val / 100) * 100;
                      return `${x},${y}`;
                    })
                    .join(" ")}
                />
              </>
            )}
          </svg>
        </div>
        <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 mt-2">
          <span>-60s</span>
          <span>-45s</span>
          <span>-30s</span>
          <span>-15s</span>
          <span className="text-emerald-400 font-bold">● NOW</span>
        </div>
      </div>
    </div>
  );
}
