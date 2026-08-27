import Link from "next/link";
import { Metadata } from "next";
import { Logo } from "@reachradar/ui";
import { brand } from "@reachradar/config";
import { ShieldCheck, Lock, Key, Database, RefreshCw, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Security Architecture & Controls | ReachRadar",
  description: "Enterprise encryption, read-only analytics scopes, Row-Level Security, and token isolation.",
};

export default function SecurityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070A12] text-slate-100">
      <header className="border-b border-slate-800/80 bg-[#070A12]/90 sticky top-0 z-40 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
          <Link href="/"><Logo size="md" /></Link>
          <Link href="/" className="text-xs font-mono text-slate-400 hover:text-white">← Return Home</Link>
        </div>
      </header>

      <main id="main-content" className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center max-w-2xl mx-auto">
          <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            Security Architecture
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Engineered with strict tenant isolation, authenticated encryption, and minimal read-only permissions.
          </p>
        </div>

        <div className="mt-12 space-y-8 text-slate-300 text-sm leading-relaxed">
          <section className="p-6 rounded-2xl border border-slate-800 bg-[#0D1322] space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Lock className="w-5 h-5 text-emerald-400" />
              <span>1. Application-Level Token Encryption (AES-256-GCM)</span>
            </div>
            <p>
              OAuth refresh tokens are never stored in plaintext. We utilize Node.js cryptographic primitives implementing AES-256-GCM with 96-bit initialization vectors (IVs) and 128-bit authentication tags. The system is designed with versioned keyrings to permit seamless cryptographic key rotation.
            </p>
          </section>

          <section className="p-6 rounded-2xl border border-slate-800 bg-[#0D1322] space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Database className="w-5 h-5 text-sky-400" />
              <span>2. Multi-Tenant Row Level Security (RLS)</span>
            </div>
            <p>
              Every tenant entity is governed by PostgreSQL Row Level Security. Data access is enforced strictly at the database kernel level through <code>auth.uid() → organization_memberships → organization → resource</code>. User A can never select, insert, mutate, or delete data belonging to Organization B.
            </p>
          </section>

          <section className="p-6 rounded-2xl border border-slate-800 bg-[#0D1322] space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Key className="w-5 h-5 text-amber-400" />
              <span>3. Minimum Read-Only OAuth Permissions</span>
            </div>
            <p>
              ReachRadar requests only the minimum read-only permissions (<code>youtube.readonly</code> and <code>yt-analytics.readonly</code>). We have zero ability to publish videos, modify titles, delete content, or make account changes.
            </p>
          </section>

          <section className="p-6 rounded-2xl border border-slate-800 bg-[#0D1322] space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <RefreshCw className="w-5 h-5 text-rose-400" />
              <span>4. Disconnect & Revocation Support</span>
            </div>
            <p>
              Disconnecting a YouTube account immediately halts all background ingestion jobs, purges and disables cached credentials, attempts upstream Google token revocation, and removes the channel from future cohort calculations.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
