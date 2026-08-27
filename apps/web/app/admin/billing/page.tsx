import React from "react";

export default function AdminBillingPage() {
  return (
    <div className="space-y-8 font-mono text-xs">
      <div className="border-b border-slate-800/80 pb-6">
        <span className="text-rose-400 uppercase font-bold">Billing Operations</span>
        <h1 className="text-2xl font-extrabold text-white mt-1 font-sans">Stripe Events & Subscriptions</h1>
        <p className="text-slate-400 mt-1">Audit log of authoritative Stripe webhook synchronization events.</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 text-slate-300">
        <div className="text-xs font-bold uppercase text-slate-400 mb-3">Recent Authoritative Webhook Events</div>
        <div className="space-y-2 text-[11px]">
          <div>• <code>evt_12345</code> — <code>customer.subscription.updated</code> (sub_pro_123 → active) — <span className="text-emerald-400">PROCESSED (IDEMPOTENT)</span></div>
          <div>• <code>evt_67890</code> — <code>checkout.session.completed</code> (cus_alex_999) — <span className="text-emerald-400">PROCESSED</span></div>
        </div>
      </div>
    </div>
  );
}
