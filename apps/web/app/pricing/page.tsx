"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@reachradar/ui";
import { PRICING_PLANS, PlanId } from "@reachradar/config";
import { CheckCircle2, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const plans: PlanId[] = ["observer", "creator", "pro", "studio", "scale", "enterprise"];

  return (
    <div className="flex flex-col min-h-screen bg-[#070A12] text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-[#070A12]/90 sticky top-0 z-40 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          <Link href="/">
            <Logo size="md" />
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link href="/weather/youtube" className="hover:text-emerald-400">
              YouTube Weather
            </Link>
            <Link href="/methodology" className="hover:text-emerald-400">
              Methodology
            </Link>
          </nav>
        </div>
      </header>

      <main id="main-content" className="flex-1 container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            Predictable Observability Plans
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
            Know whether it&apos;s you — or YouTube.
          </h1>
          <p className="text-base text-slate-300 mt-3">
            Centralized algorithm intelligence for independent creators, studios, agencies, and publishers.
          </p>

          {/* Billing Switcher */}
          <div className="mt-8 inline-flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                billingPeriod === "monthly"
                  ? "bg-emerald-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                billingPeriod === "yearly"
                  ? "bg-emerald-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-emerald-950/80 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded border border-emerald-500/30">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {plans.map((planId) => {
            const plan = PRICING_PLANS[planId];
            const isCreator = planId === "creator";
            const isStudio = planId === "studio";
            const price =
              billingPeriod === "yearly"
                ? Math.round(plan.yearlyPriceUsd / 12)
                : plan.monthlyPriceUsd;

            return (
              <div
                key={planId}
                className={`rounded-2xl border p-7 flex flex-col relative transition-all ${
                  isCreator
                    ? "border-emerald-500 bg-[#0D1322] shadow-[0_0_30px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500"
                    : "border-slate-800 bg-[#0D1322]/80 hover:border-slate-700"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 right-6 bg-emerald-500 text-slate-950 font-mono font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full">
                    {plan.badge}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    {plan.entitlements.maxConnectedChannels}{" "}
                    {plan.entitlements.maxConnectedChannels === 1 ? "Channel" : "Channels"}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mt-2 min-h-[32px] leading-relaxed">
                  {plan.description}
                </p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">
                    ${price}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    /month {billingPeriod === "yearly" && plan.monthlyPriceUsd > 0 ? "billed annually" : ""}
                  </span>
                </div>

                <ul className="mt-6 space-y-2.5 text-xs text-slate-300 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/app/onboarding?plan=${planId}&billing=${billingPeriod}`}
                  className={`mt-6 w-full py-2.5 rounded-lg text-center text-xs font-bold font-mono transition-all ${
                    isCreator
                      ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md"
                      : "border border-slate-700 bg-slate-800/80 text-white hover:bg-slate-700"
                  }`}
                >
                  {plan.monthlyPriceUsd === 0 ? "Get Started Free" : `Select ${plan.name} Plan`}
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
