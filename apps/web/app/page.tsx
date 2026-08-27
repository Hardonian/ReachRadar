import Link from "next/link";
import { brand, PRICING_PLANS } from "@reachradar/config";
import { Logo, WeatherGauge, SurfaceCard, ShiftBadge } from "@reachradar/ui";
import { DEMO_PUBLIC_SHIFTS } from "@reachradar/providers";
import {
  ArrowRight,
  ShieldCheck,
  Radar,
  TrendingDown,
  Layers,
  Sparkles,
  CheckCircle2,
  Lock,
  BarChart3,
  HelpCircle,
  Users,
  Compass,
} from "lucide-react";

export default function LandingPage() {
  const activeShift = DEMO_PUBLIC_SHIFTS[0];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header / Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070A12]/90 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded">
            <Logo size="md" />
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <Link href="/weather/youtube" className="hover:text-emerald-400 transition-colors">
              YouTube Weather
            </Link>
            <Link href="/methodology" className="hover:text-emerald-400 transition-colors">
              Methodology
            </Link>
            <Link href="/pricing" className="hover:text-emerald-400 transition-colors">
              Pricing
            </Link>
            <Link href="/for-creators" className="hover:text-emerald-400 transition-colors">
              For Creators
            </Link>
            <Link href="/for-agencies" className="hover:text-emerald-400 transition-colors">
              For Agencies
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-300 hover:text-white px-3 py-1.5 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/app/onboarding"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#070A12]"
            >
              <span>Connect Channel</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1">
        {/* 2. Hero Section */}
        <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-slate-800/60">
          {/* Subtle radar background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

          <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-6 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Telemetry Active · Monitored Cohorts
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
              The algorithm changed. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-300 to-teal-200">
                Know before your competitors do.
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {brand.hero.body}
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/weather/youtube"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 border border-emerald-500/40 px-6 py-3.5 text-base font-bold text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400 transition-all font-mono shadow-[0_0_20px_rgba(16,185,129,0.15)]"
              >
                <Radar className="w-5 h-5 text-emerald-400 animate-spin [animation-duration:8s]" />
                <span>{brand.hero.primaryCta}</span>
              </Link>
              <Link
                href="/app/onboarding"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-base font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)]"
              >
                <span>{brand.hero.secondaryCta}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <p className="mt-4 text-xs text-slate-500 font-mono">
              {brand.supportingStatement} · Read-only access · No video modification
            </p>
          </div>

          {/* 3. Live Weather Preview Widget */}
          <div className="container mx-auto px-4 max-w-5xl mt-14">
            <div className="rounded-2xl border border-slate-800 bg-[#0D1322]/90 p-6 md:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-800/80 pb-6 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                      YouTube Weather Radar
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                      LIVE RADAR
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mt-1">
                    Global Distribution Volatility Index
                  </h2>
                </div>
                <div className="text-xs font-mono text-slate-400 flex items-center gap-3">
                  <span>Detected Shifts: <strong className="text-amber-400">2</strong></span>
                  <span>High-Confidence: <strong className="text-rose-400">1</strong></span>
                  <span>Freshness: <strong className="text-slate-200">18m ago</strong></span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6 items-center">
                <div className="lg:col-span-2 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
                  <WeatherGauge score={27} size="lg" />
                </div>

                <div className="lg:col-span-3 grid grid-cols-2 gap-3.5">
                  <SurfaceCard surfaceName="Browse Features" score={18} deltaPercentage={-1.2} cohortDeltaPercentage={-0.8} />
                  <SurfaceCard surfaceName="Suggested Videos" score={31} deltaPercentage={3.4} cohortDeltaPercentage={1.2} />
                  <SurfaceCard surfaceName="YouTube Search" score={22} deltaPercentage={-0.5} cohortDeltaPercentage={0.1} />
                  <SurfaceCard surfaceName="Shorts Feed" score={74} deltaPercentage={-14.8} cohortDeltaPercentage={-12.4} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Is it you — or the algorithm? */}
        <section className="py-20 border-b border-slate-800/60 bg-slate-950/40">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                The Core Creator Dilemma
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
                “My views dropped 30%. What happened?”
              </h2>
              <p className="mt-3 text-slate-400">
                Creators currently have no way to separate content failure from platform-wide recommendation redistribution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="rounded-2xl border border-rose-900/30 bg-rose-950/10 p-7">
                <div className="flex items-center gap-2 text-rose-400 font-bold font-mono text-sm uppercase tracking-wider">
                  <TrendingDown className="w-5 h-5" />
                  Creator Folklore & Guesswork
                </div>
                <ul className="mt-5 space-y-3.5 text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>“Did YouTube shadowban my channel because of my last video?”</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>Redesigning 50 thumbnails on a Tuesday because of normal weekly variance.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>Relying on anonymous Twitter rumors and unsubstantiated guru claims.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>Changing publishing frequency in panic when content engagement is actually healthy.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-7">
                <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono text-sm uppercase tracking-wider">
                  <Radar className="w-5 h-5" />
                  ReachRadar Measured Evidence
                </div>
                <ul className="mt-5 space-y-3.5 text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Instant matched cohort comparison: See if 60%+ of peers experienced the exact same drop.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Distribution surface isolation: Know if the decline was 100% Browse while Search was unaffected.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Cross-metric coherence: Validate whether CTR and retention held steady before changing strategy.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Prescriptive action: Clear deterministic advice—Hold Strategy vs Review Packaging.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. The Three Questions Workflow */}
        <section className="py-20 border-b border-slate-800/60">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                Product Architecture
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
                Three questions. Clear mathematical answers.
              </h2>
              <p className="mt-3 text-slate-400">
                Every ReachRadar report translates complex telemetry into high-confidence strategic clarity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-mono font-bold text-lg mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-white">Did something unusual change?</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed flex-1">
                  Our statistical ensemble combines robust z-scores, CUSUM change detection, EWMA trend momentum, and multi-day persistence to verify genuine platform volatility.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800 font-mono text-xs text-sky-300">
                  Volatilty: 74/100 (ELEVATED)
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-lg mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-white">Is it affecting channels like mine?</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed flex-1">
                  Hierarchical cohort matching benchmarks your channel against matched peers in your niche, size band, and format to isolate cohort consensus from channel-specific drops.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800 font-mono text-xs text-emerald-300">
                  Consensus: 64% of cohort shifted
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-lg mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-white">Should I change anything?</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed flex-1">
                  Deterministic recommendations provide actionable guidance: Hold Strategy during platform redistribution, or Review Packaging if the issue is isolated to your channel.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800 font-mono text-xs text-amber-300">
                  Action: HOLD CURRENT STRATEGY
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Active Shift Scenario Deep Dive */}
        <section className="py-20 border-b border-slate-800/60 bg-slate-950/60">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                  Live Detected Shift Case Study
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
                  {activeShift.cohortName} · {activeShift.surface.toUpperCase()}
                </h2>
              </div>
              <ShiftBadge score={activeShift.evidenceScore} />
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-slate-800/80 pb-6 font-mono">
                <div>
                  <div className="text-xs text-slate-500 uppercase">First Detected</div>
                  <div className="text-sm font-bold text-slate-200 mt-1">Aug 25, 2026</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase">Affected Channels</div>
                  <div className="text-sm font-bold text-rose-400 mt-1">{activeShift.affectedChannelsPercentage}%</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase">Median Movement</div>
                  <div className="text-sm font-bold text-rose-400 mt-1">{activeShift.medianDistributionMovement}%</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase">Independent Owners</div>
                  <div className="text-sm font-bold text-slate-200 mt-1">{activeShift.distinctOwners} accounts</div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Observed Pattern & Interpretation
                </h3>
                <p className="text-sm text-slate-200 mt-2 leading-relaxed">
                  {activeShift.summary} The decline is occurring across a broad matched cohort while content-response metrics remain stable. This is consistent with an algorithmic distribution shift rather than a creator-specific decline.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono mb-2">
                  Metrics That Did NOT Change (Negative Controls)
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                  {activeShift.metricsThatDidNotChange.map((m, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                  Recommended Strategic Action
                </div>
                <div className="text-base font-extrabold text-white mt-1">HOLD CURRENT STRATEGY</div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Avoid broad thumbnail or publishing-frequency changes until additional evidence develops. Your content-response metrics are healthy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 11 & 12. Methodology & Trust */}
        <section className="py-20 border-b border-slate-800/60">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Independent observability. <br />
              <span className="text-slate-400">Not creator folklore.</span>
            </h2>
            <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-base leading-relaxed">
              ReachRadar observes aggregate distribution outcomes through authorized, read-only analytics telemetry. We do not claim to possess internal YouTube ranking weights or reverse-engineered code.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 text-left">
              <div className="p-5 rounded-xl border border-slate-800 bg-[#0D1322]">
                <Lock className="w-5 h-5 text-emerald-400 mb-2" />
                <div className="font-bold text-white text-sm">Read-Only Scopes</div>
                <div className="text-xs text-slate-400 mt-1">
                  We only request read permissions. We cannot edit videos, post content, or alter settings.
                </div>
              </div>
              <div className="p-5 rounded-xl border border-slate-800 bg-[#0D1322]">
                <Layers className="w-5 h-5 text-sky-400 mb-2" />
                <div className="font-bold text-white text-sm">Strict Privacy Thresholds</div>
                <div className="text-xs text-slate-400 mt-1">
                  Cohorts require at least 25 channels and 10 distinct owners. Individual private analytics are never leaked.
                </div>
              </div>
              <div className="p-5 rounded-xl border border-slate-800 bg-[#0D1322]">
                <BarChart3 className="w-5 h-5 text-amber-400 mb-2" />
                <div className="font-bold text-white text-sm">AES-256-GCM Encryption</div>
                <div className="text-xs text-slate-400 mt-1">
                  OAuth refresh tokens are encrypted application-side with rotating keys and authenticated tags.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 13. Pricing Summary */}
        <section className="py-20 border-b border-slate-800/60 bg-slate-950/40">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Transparent Pricing
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
                Know what changed before you change strategy.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {/* Observer */}
              <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-7 flex flex-col">
                <div className="text-lg font-bold text-white">{PRICING_PLANS.observer.name}</div>
                <div className="text-xs text-slate-400 mt-1">{PRICING_PLANS.observer.description}</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">$0</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300 flex-1">
                  {PRICING_PLANS.observer.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/app/onboarding"
                  className="mt-6 w-full py-2.5 rounded-lg border border-slate-700 bg-slate-800/80 text-center text-sm font-bold text-white hover:bg-slate-700 transition-colors"
                >
                  Start Free
                </Link>
              </div>

              {/* Creator */}
              <div className="rounded-2xl border-2 border-emerald-500 bg-[#0D1322] p-7 flex flex-col relative shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                <div className="absolute -top-3 right-6 bg-emerald-500 text-slate-950 font-mono font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full">
                  Most Popular
                </div>
                <div className="text-lg font-bold text-white">{PRICING_PLANS.creator.name}</div>
                <div className="text-xs text-slate-400 mt-1">{PRICING_PLANS.creator.description}</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">${PRICING_PLANS.creator.monthlyPriceUsd}</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300 flex-1">
                  {PRICING_PLANS.creator.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/app/onboarding?plan=creator"
                  className="mt-6 w-full py-2.5 rounded-lg bg-emerald-500 text-center text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg"
                >
                  Connect Creator Account
                </Link>
              </div>

              {/* Studio */}
              <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-7 flex flex-col">
                <div className="text-lg font-bold text-white">{PRICING_PLANS.studio.name}</div>
                <div className="text-xs text-slate-400 mt-1">{PRICING_PLANS.studio.description}</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">${PRICING_PLANS.studio.monthlyPriceUsd}</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300 flex-1">
                  {PRICING_PLANS.studio.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/app/onboarding?plan=studio"
                  className="mt-6 w-full py-2.5 rounded-lg border border-slate-700 bg-slate-800/80 text-center text-sm font-bold text-white hover:bg-slate-700 transition-colors"
                >
                  Get Studio Workspace
                </Link>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href="/pricing" className="text-sm font-mono text-emerald-400 hover:underline">
                View all plans (Pro, Scale, Enterprise) and full feature comparison →
              </Link>
            </div>
          </div>
        </section>

        {/* 14. FAQ */}
        <section className="py-20 border-b border-slate-800/60">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-extrabold text-white text-center">Frequently Asked Questions</h2>
            <div className="mt-10 space-y-6">
              <div className="p-6 rounded-xl border border-slate-800 bg-[#0D1322]">
                <h3 className="font-bold text-white text-base">How does ReachRadar know when an algorithm shifts?</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  We continuously monitor longitudinal time series across anonymized, opt-in creator cohorts. When 60%+ of channels in a matched niche experience a statistically significant deviation in impressions (e.g. Browse) while engagement metrics like CTR and retention stay steady, our ensemble flags a high-confidence distribution shift.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-slate-800 bg-[#0D1322]">
                <h3 className="font-bold text-white text-base">Do you reverse engineer YouTube’s source code or neural networks?</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  No. We provide independent observability of distribution outcomes. Just as Doppler weather radar measures rainfall patterns across a region without controlling the atmosphere, ReachRadar measures recommendation movements across creator cohorts.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-slate-800 bg-[#0D1322]">
                <h3 className="font-bold text-white text-base">Will my channel metrics ever be visible to other creators?</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  Never. We enforce strict privacy invariants (MIN_PUBLIC_CHANNELS = 25, MIN_DISTINCT_OWNERS = 10). Public radar metrics are strictly pre-aggregated medians. Your private raw analytics are protected by database Row Level Security.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 15. Final CTA */}
        <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#070A12] to-[#0D1322]">
          <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">
              Stop guessing what happened to your reach.
            </h2>
            <p className="mt-4 text-slate-300 text-base md:text-lg max-w-xl mx-auto">
              Get instant visibility into whether sudden reach changes are isolated to your video or spreading across your entire niche.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/app/onboarding"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 text-base font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(16,185,129,0.35)]"
              >
                <span>Connect My Channel</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 16. Footer */}
      <footer className="border-t border-slate-800/80 bg-[#04060A] py-12 text-slate-400 text-xs">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="max-w-sm">
              <Logo size="sm" />
              <p className="mt-3 text-slate-500 leading-relaxed">
                {brand.category}. {brand.tagline}
              </p>
              <p className="mt-3 text-[11px] text-slate-600">
                {brand.legalDisclaimer}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 font-medium">
              <div>
                <div className="text-slate-200 font-bold uppercase font-mono mb-3">Product</div>
                <ul className="space-y-2">
                  <li><Link href="/weather/youtube" className="hover:text-emerald-400">YouTube Weather</Link></li>
                  <li><Link href="/methodology" className="hover:text-emerald-400">Methodology</Link></li>
                  <li><Link href="/pricing" className="hover:text-emerald-400">Pricing</Link></li>
                  <li><Link href="/app/onboarding" className="hover:text-emerald-400">Demo Mode</Link></li>
                </ul>
              </div>

              <div>
                <div className="text-slate-200 font-bold uppercase font-mono mb-3">Solutions</div>
                <ul className="space-y-2">
                  <li><Link href="/for-creators" className="hover:text-emerald-400">For Creators</Link></li>
                  <li><Link href="/for-agencies" className="hover:text-emerald-400">For Agencies</Link></li>
                  <li><Link href="/for-publishers" className="hover:text-emerald-400">For Publishers</Link></li>
                </ul>
              </div>

              <div>
                <div className="text-slate-200 font-bold uppercase font-mono mb-3">Trust & Legal</div>
                <ul className="space-y-2">
                  <li><Link href="/security" className="hover:text-emerald-400">Security Architecture</Link></li>
                  <li><Link href="/privacy" className="hover:text-emerald-400">Data & Privacy</Link></li>
                  <li><Link href="/terms" className="hover:text-emerald-400">Terms of Service</Link></li>
                </ul>
              </div>

              <div>
                <div className="text-slate-200 font-bold uppercase font-mono mb-3">System</div>
                <ul className="space-y-2">
                  <li><Link href="/api/health" className="hover:text-emerald-400 font-mono">/api/health</Link></li>
                  <li><span className="text-emerald-400 font-mono">All Systems Operational</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-600">
            <div>© {new Date().getFullYear()} ReachRadar Inc. All rights reserved.</div>
            <div className="mt-2 sm:mt-0 font-mono text-[11px]">Scoring Engine v1.0.0 · SHA-256 Verified</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
