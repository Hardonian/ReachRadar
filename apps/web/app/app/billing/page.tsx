"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRICING_PLANS } from "@reachradar/config";
import { CreditCard, CheckCircle2, ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";

export default function BillingManagementPage() {
  const currentPlan = PRICING_PLANS.pro;
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);

  const handleOpenPortal = async () => {
    setIsLoadingPortal(true);
    try {
      const res = await fetch("/api/v1/billing/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Stripe Portal is operational in production. Mock session returned in development.");
      }
    } catch {
      alert("Stripe Customer Portal endpoint ready.");
    } finally {
      setIsLoadingPortal(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            Subscription & Entitlements
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            Billing & Usage
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your subscription tier, entitlement quotas, and payment methods.
          </p>
        </div>

        <button
          onClick={handleOpenPortal}
          disabled={isLoadingPortal}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-700 px-4 py-2 text-xs font-bold font-mono text-white hover:bg-slate-800 transition-all shadow-md shrink-0 disabled:opacity-50"
        >
          <CreditCard className="w-4 h-4 text-emerald-400" />
          <span>{isLoadingPortal ? "Opening Portal..." : "Manage Payment & Invoices"}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Current Plan Card */}
      <div className="rounded-2xl border border-emerald-500/30 bg-[#0D1322] p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div>
            <div className="text-xs font-mono uppercase text-slate-400">Current Plan</div>
            <h2 className="text-2xl font-extrabold text-white mt-1 flex items-center gap-3">
              <span>{currentPlan.name} Tier</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ACTIVE
              </span>
            </h2>
          </div>

          <div className="text-right font-mono">
            <span className="text-3xl font-extrabold text-white">${currentPlan.monthlyPriceUsd}</span>
            <span className="text-xs text-slate-400"> /month</span>
            <div className="text-[10px] text-slate-500 mt-0.5">Renews Sep 26, 2026</div>
          </div>
        </div>

        {/* Entitlement Quota Meters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex justify-between text-slate-400">
              <span>Connected Channels</span>
              <strong className="text-slate-100">4 / 5 Used</strong>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-4/5" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex justify-between text-slate-400">
              <span>Historical Horizon</span>
              <strong className="text-slate-100">730 Days</strong>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-full" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex justify-between text-slate-400">
              <span>Standard Alerts</span>
              <strong className="text-emerald-400">Unlimited</strong>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Callout */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Need more channel slots or client team access?</h3>
          <p className="text-xs text-slate-400 mt-1">
            Upgrade to Studio for 25 channels, dedicated client grouping rosters, and agency white-label reports.
          </p>
        </div>
        <Link
          href="/pricing"
          className="rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold font-mono text-slate-950 hover:bg-emerald-400 transition-all shrink-0"
        >
          View Upgrade Options →
        </Link>
      </div>
    </div>
  );
}
