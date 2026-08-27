import Link from "next/link";
import { Metadata } from "next";
import { Logo } from "@reachradar/ui";
import { brand } from "@reachradar/config";

export const metadata: Metadata = {
  title: "Terms of Service | ReachRadar",
  description: "Terms of Service and commercial usage agreement for ReachRadar.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070A12] text-slate-100">
      <header className="border-b border-slate-800/80 bg-[#070A12]/90 sticky top-0 z-40 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
          <Link href="/"><Logo size="md" /></Link>
          <Link href="/" className="text-xs font-mono text-slate-400 hover:text-white">← Return Home</Link>
        </div>
      </header>

      <main id="main-content" className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
        <p className="text-xs font-mono text-slate-500 mt-1">Last updated: August 26, 2026</p>

        <div className="mt-8 space-y-6 text-sm text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Agreement to Terms</h2>
            <p>
              By creating an account or accessing {brand.name}, you agree to be bound by these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Independent Service Disclaimer</h2>
            <p className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
              {brand.legalDisclaimer} ReachRadar is an independent statistical intelligence service. We do not represent, partner with, or act on behalf of YouTube or Google LLC.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Subscription & Cancellation</h2>
            <p>
              Paid subscriptions are billed on a recurring monthly or annual basis. You may cancel at any time through the in-app Billing Portal.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
