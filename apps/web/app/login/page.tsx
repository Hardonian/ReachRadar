"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@reachradar/ui";
import { brand } from "@reachradar/config";
import { ArrowRight, Mail, Lock, Sparkles, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMagicLink, setIsMagicLink] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sentMessage, setSentMessage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isMagicLink) {
      setTimeout(() => {
        setIsLoading(false);
        setSentMessage(true);
      }, 600);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        router.push("/app");
      }, 600);
    }
  };

  const handleDemoLogin = () => {
    router.push("/app?demo=true");
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block">
          <Logo size="lg" />
        </Link>
        <h1 className="mt-6 text-2xl font-extrabold text-white">
          Sign in to your Radar
        </h1>
        <p className="mt-2 text-xs text-slate-400">
          Know when distribution shifts — before your strategy does.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-8 shadow-2xl space-y-6">
          {/* Quick Demo Login Option */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500/20 via-sky-500/20 to-emerald-500/20 border border-emerald-500/40 p-3 text-xs font-bold font-mono text-emerald-300 hover:border-emerald-400 hover:text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)]"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Launch Instant Demo Workspace →</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase font-mono">
              <span className="bg-[#0D1322] px-2 text-slate-500">or continue with email</span>
            </div>
          </div>

          {sentMessage ? (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <div className="text-sm font-bold text-white">Magic Link Dispatched</div>
              <p className="text-xs text-slate-300 mt-1">
                We sent a secure login link to <strong className="text-emerald-300">{email}</strong>. Check your inbox to sign in.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="creator@yourchannel.com"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-2.5 pl-10 text-sm text-slate-100 placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {!isMagicLink && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-mono font-bold uppercase text-slate-400">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsMagicLink(true)}
                      className="text-[11px] font-mono text-emerald-400 hover:underline"
                    >
                      Use Magic Link instead
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-2.5 pl-10 text-sm text-slate-100 placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              )}

              {isMagicLink && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setIsMagicLink(false)}
                    className="text-[11px] font-mono text-slate-400 hover:text-white"
                  >
                    Use Password instead
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-all font-mono shadow-md disabled:opacity-50"
              >
                {isLoading ? "Authenticating..." : isMagicLink ? "Send Magic Link" : "Sign In"}
              </button>
            </form>
          )}

          <div className="text-center text-xs text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-bold text-emerald-400 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
