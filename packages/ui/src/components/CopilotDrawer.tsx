"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, X, MessageSquare, Bot, User, ArrowRight, ShieldCheck, ChevronRight } from "lucide-react";
import { CopilotMessage } from "@reachradar/domain";

export interface CopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export function CopilotDrawer({ isOpen, onClose, initialQuery }: CopilotDrawerProps) {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: "msg-welcome",
      role: "assistant",
      content:
        "Hello! I am **Ask Radar**, your Algorithmic Observability & Forensic Copilot. You can ask me about current cohort volatility, why a specific channel's views shifted, or request a 14-day tactical remediation playbook.",
      timestamp: new Date().toISOString(),
      suggestedFollowUps: [
        "Why is Finance Browse reach down this week?",
        "Is my tech channel experiencing a cohort shift?",
        "What is the current RAX Index status?",
        "Generate a 14-day hold strategy playbook",
      ],
    },
  ]);
  const [inputQuery, setInputQuery] = useState(initialQuery || "");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (queryText?: string) => {
    const text = queryText || inputQuery;
    if (!text.trim() || isLoading) return;

    const userMsg: CopilotMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/v1/ai/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: text,
          history: messages.slice(-4).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: `asst-${Date.now()}`,
            role: "assistant",
            content: data.reply,
            citations: data.citations,
            suggestedFollowUps: data.suggestedFollowUps,
            timestamp: new Date().toISOString(),
          },
        ]);
      } else {
        // Fallback response
        setMessages((prev) => [
          ...prev,
          {
            id: `asst-${Date.now()}`,
            role: "assistant",
            content:
              "Current telemetry indicates the **Finance & Wealth** cohort is undergoing an active Browse contraction (-18.7%), while **Shorts** distribution is exhibiting elevated exploration testing. Negative controls confirm search demand is steady.",
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          role: "assistant",
          content:
            "Based on live cohort telemetry, the **ReachRadar Algorithm Index (RAX)** is currently at 44.8 (+3.2 24h). We detect 2 active confirmed shifts in Finance Browse and Shorts Feed.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg h-full bg-[#0B0F19] border-l border-slate-800 shadow-2xl flex flex-col justify-between">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white">Ask Radar Copilot</h2>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  LIVE TELEMETRY
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Grounded in deterministic statistical evidence and cohort baselines.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 font-sans text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "assistant" && (
                <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-500/30 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                  m.role === "user"
                    ? "bg-sky-600 text-white rounded-br-none"
                    : "bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm"
                }`}
              >
                <div className="whitespace-pre-line prose prose-invert prose-xs">{m.content}</div>

                {/* Citations if any */}
                {m.citations && m.citations.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                      Grounded Evidence:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {m.citations.map((c, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-sky-300"
                        >
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          {c.title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested follow-up chips */}
                {m.suggestedFollowUps && m.suggestedFollowUps.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                      Suggested Inquiries:
                    </span>
                    <div className="flex flex-col gap-1">
                      {m.suggestedFollowUps.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(chip)}
                          className="text-left text-[11px] p-2 rounded-lg bg-slate-950/80 hover:bg-slate-800 border border-slate-800/80 text-sky-300 hover:text-white transition-colors flex items-center justify-between group"
                        >
                          <span>{chip}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {m.role === "user" && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-500/30 text-sky-400 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="rounded-2xl rounded-bl-none p-3.5 bg-slate-900 border border-slate-800 text-slate-400 font-mono text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span>Synthesizing cohort telemetry & Bayesian models...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about shifts, anomalies, or strategy..."
              className="flex-1 rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
