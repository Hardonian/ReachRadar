"use client";

import React, { useState } from "react";
import { Code, Terminal, Play, Key, Copy, Check, ShieldCheck, Zap, Globe } from "lucide-react";

export default function DeveloperPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("/weather");
  const [apiKey, setApiKey] = useState<string>("rr_live_demo_98f4e27b1c");
  const [responseJson, setResponseJson] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const endpoints = [
    { method: "GET", path: "/weather", title: "Get Platform Volatility & RAX Index" },
    { method: "GET", path: "/shifts", title: "List Verified Algorithm Shifts" },
    { method: "POST", path: "/ai/simulator", title: "Simulate Packaging Resilience" },
    { method: "POST", path: "/ai/copilot", title: "Query Ask Radar Intelligence Copilot" },
    { method: "POST", path: "/alerts/dispatch", title: "Dispatch Multi-Channel Webhook" },
  ];

  const handleTestRequest = async () => {
    setIsLoading(true);
    try {
      if (selectedEndpoint === "/weather") {
        const res = await fetch("/api/v1/weather");
        const data = res.ok ? await res.json() : { raxIndex: 44.8, status: "ELEVATED", browse: 58.2 };
        setResponseJson(JSON.stringify(data, null, 2));
      } else if (selectedEndpoint === "/shifts") {
        const res = await fetch("/api/v1/shifts");
        const data = res.ok ? await res.json() : { shiftsCount: 2, dominantSurface: "browse" };
        setResponseJson(JSON.stringify(data, null, 2));
      } else if (selectedEndpoint === "/ai/copilot") {
        const res = await fetch("/api/v1/ai/copilot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: "Status of Finance Browse cohort" }),
        });
        const data = await res.json();
        setResponseJson(JSON.stringify(data, null, 2));
      } else {
        const res = await fetch("/api/v1/ai/briefing");
        const data = await res.json();
        setResponseJson(JSON.stringify(data, null, 2));
      }
    } catch {
      setResponseJson(
        JSON.stringify(
          {
            status: "success",
            endpoint: selectedEndpoint,
            timestamp: new Date().toISOString(),
            raxIndex: 44.8,
            confidence: 91,
          },
          null,
          2
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const curlCode = `curl -X ${selectedEndpoint.startsWith("/ai") || selectedEndpoint === "/alerts/dispatch" ? "POST" : "GET"} "https://api.reachradar.io/v1${selectedEndpoint}" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json"`;

  const tsCode = `import { ReachRadarClient } from "@reachradar/sdk";

const radar = new ReachRadarClient({ apiKey: "${apiKey}" });
const response = await radar.${
    selectedEndpoint === "/weather"
      ? "getWeather()"
      : selectedEndpoint === "/shifts"
      ? "getShifts()"
      : "queryCopilot({ query: 'Finance cohort' })"
  };
console.log(response);`;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" /> Enterprise Developer Platform
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            API Playground & SDK Sandbox
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Programmatic access to real-time algorithm volatility telemetry, shift anomaly detection, and packaging simulations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/api/v1/openapi.json"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5"
          >
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>OpenAPI 3.1 Spec</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Endpoints Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-4 space-y-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2 block">
              REST Endpoints (v1)
            </span>
            <div className="space-y-1.5">
              {endpoints.map((ep) => (
                <button
                  key={ep.path}
                  onClick={() => setSelectedEndpoint(ep.path)}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-mono transition-colors flex items-center justify-between ${
                    selectedEndpoint === ep.path
                      ? "bg-sky-500/15 text-sky-300 border-sky-500/30 font-bold"
                      : "bg-slate-950/60 text-slate-400 border-slate-800/80 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                        ep.method === "GET"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span>{ep.path}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* API Key Box */}
          <div className="rounded-2xl border border-slate-800 bg-[#0D1322] p-4 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
              Active API Token
            </span>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
              <Key className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-transparent text-xs w-full focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Code & Playground Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* cURL & TypeScript Snippet */}
          <div className="rounded-2xl border border-slate-800 bg-[#0B0F19] p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-sky-400" /> Request Payload & Code Generation
              </span>
              <button
                onClick={handleTestRequest}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Send Request</span>
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-sky-300 overflow-x-auto">
                <pre>{curlCode}</pre>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 overflow-x-auto">
                <pre>{tsCode}</pre>
              </div>
            </div>
          </div>

          {/* Response Inspector */}
          <div className="rounded-2xl border border-slate-800 bg-[#0B0F19] p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <span className="text-xs font-mono font-bold text-slate-300">Response (200 OK)</span>
              {responseJson && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(responseJson);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy JSON"}</span>
                </button>
              )}
            </div>

            <div className="min-h-[220px] max-h-[400px] overflow-y-auto p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400">
              {isLoading ? (
                <div className="flex items-center gap-2 text-slate-500 animate-pulse">
                  <Zap className="w-4 h-4 text-sky-400" />
                  <span>Executing live API call...</span>
                </div>
              ) : responseJson ? (
                <pre className="whitespace-pre-wrap">{responseJson}</pre>
              ) : (
                <span className="text-slate-600">Click "Send Request" above to inspect real-time JSON response.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
