import Link from "next/link";
import { Metadata } from "next";
import { Logo } from "@reachradar/ui";
import { brand, MIN_PUBLIC_CHANNELS, MIN_DISTINCT_OWNERS } from "@reachradar/config";

export const metadata: Metadata = {
  title: "Privacy Policy | ReachRadar",
  description: "How ReachRadar collects, processes, and protects creator analytics data and privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070A12] text-slate-100">
      <header className="border-b border-slate-800/80 bg-[#070A12]/90 sticky top-0 z-40 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
          <Link href="/"><Logo size="md" /></Link>
          <Link href="/" className="text-xs font-mono text-slate-400 hover:text-white">← Return Home</Link>
        </div>
      </header>

      <main id="main-content" className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
        <p className="text-xs font-mono text-slate-500 mt-1">Last updated: August 26, 2026</p>

        <div className="mt-8 space-y-6 text-sm text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Overview</h2>
            <p>
              {brand.name} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) provides algorithm distribution observability and recommendation volatility intelligence. We are dedicated to maintaining the confidentiality and privacy of our contributors&apos; analytics data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Data We Collect</h2>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li><strong>Account Info:</strong> Name, email address, billing records.</li>
              <li><strong>Authorized Channel Analytics:</strong> Daily view counts, impressions, traffic source distributions (Browse, Suggested, Search, Shorts), and engagement metrics (CTR, AVD).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Aggregation & Public Privacy Invariant</h2>
            <p>
              Public algorithm weather signals are calculated <strong>exclusively in aggregate</strong>. Under our core invariant, no public benchmark or shift event may be published unless it meets both:
            </p>
            <div className="my-3 p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300">
              MIN_PUBLIC_CHANNELS = {MIN_PUBLIC_CHANNELS} (channels) <br />
              MIN_DISTINCT_OWNERS = {MIN_DISTINCT_OWNERS} (independent accounts)
            </div>
            <p>
              Individual channel identities and raw private metrics are strictly partitioned and never revealed in public weather reports.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Data Deletion</h2>
            <p>
              You may request immediate deletion of your telemetry data at any time via Settings &gt; Data & Privacy or by contacting <code className="text-emerald-400">{brand.contacts.privacy}</code>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
