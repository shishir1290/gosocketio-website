"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Check, Copy, ShieldCheck, Zap, Activity, Cpu, Radio, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

import { copyToClipboard } from "@/lib/clipboard";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [packetsCount, setPacketsCount] = useState(15156);
  const [activeClients, setActiveClients] = useState(129);

  // Live telemetry ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setPacketsCount((prev) => prev + Math.floor(Math.random() * 45) + 12);
      setActiveClients((prev) => prev + (Math.random() > 0.6 ? (Math.random() > 0.5 ? 1 : -1) : 0));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".hero-badge", { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 })
        .fromTo(".hero-title", { y: 15 }, { y: 0, duration: 0.5, clearProps: "all" }, "-=0.2")
        .fromTo(".hero-sub", { y: 15 }, { y: 0, duration: 0.5, clearProps: "all" }, "-=0.3")
        .fromTo(".hero-cta-group", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, "-=0.25")
        .fromTo(
          ".hero-stats-card",
          { scale: 0.96, opacity: 0, y: 15 },
          { scale: 1, opacity: 1, y: 0, stagger: 0.08, duration: 0.5, clearProps: "all" },
          "-=0.2"
        );

      gsap.to(".floating-indicator", {
        y: -6,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  const handleCopyCmd = async () => {
    await copyToClipboard("go get github.com/shishir1290/gsocketio@latest");
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#00f2fe", "#4facfe", "#6366f1"],
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative pt-6 md:pt-8 pb-12 md:pb-16 overflow-visible text-center"
    >
      <div className="hero-glow" />
      <div className="grid-overlay" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-[1240px]">
        {/* Top Feature Badge */}
        <div className="hero-badge mb-6 flex justify-center">
          <div className="badge badge-cyan pulse-glow">
            <Sparkles size={14} />
            <span>Zero Third-Party Dependencies • Pure Go Standard Library</span>
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] max-w-4xl mx-auto mb-5 text-[var(--text-primary)]">
          High-Performance <span className="gradient-cyan-purple">Socket.IO v4</span> Server Built Purely in Go
        </h1>

        {/* Subtitle */}
        <p className="hero-sub text-base sm:text-lg text-[var(--text-secondary)] max-w-3xl mx-auto mb-8 leading-relaxed">
          Zero Gorilla. Zero external packages. Hand-crafted RFC 6455 WebSocket framing, Engine.IO v4 long-polling, 
          instant client connection upgrades, string & binary event broadcasting, thread-safe rooms, and sub-millisecond latencies.
        </p>

        {/* Install Command & Action Buttons */}
        <div className="hero-cta-group flex flex-col items-center gap-5 mb-14">
          {/* Quick Install Bar */}
          <div
            onClick={handleCopyCmd}
            className="inline-flex items-center gap-3 px-4 py-2 bg-[var(--bg-glass)] border border-[var(--border-active)] rounded-full cursor-pointer shadow-[var(--shadow-cyan-glow)] transition-all duration-250 max-w-full hover:border-[var(--accent-cyan)]"
          >
            <span className="text-[var(--accent-cyan)] font-mono text-sm font-semibold">$</span>
            <code className="text-[var(--text-primary)] text-xs sm:text-sm font-mono truncate">
              go get github.com/shishir1290/gsocketio@latest
            </code>
            <button
              type="button"
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full shrink-0 transition-colors ${
                copied
                  ? "bg-emerald-500/20 text-[var(--accent-emerald)]"
                  : "bg-indigo-500/15 text-[var(--text-primary)] hover:bg-indigo-500/25"
              }`}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap justify-center gap-3.5">
            <a href="#steps" className="btn-primary">
              <span>Explore Step-by-Step Guide</span>
              <ArrowRight size={17} />
            </a>
            <a href="#playground" className="btn-secondary">
              <Radio size={17} className="text-[var(--accent-cyan)]" />
              <span>Launch Live Simulator</span>
            </a>
          </div>
        </div>

        {/* Live Feature & Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1140px] mx-auto text-left items-stretch">
          {/* Card 1 */}
          <div className="glass-panel hero-stats-card p-6 flex flex-col justify-between min-h-[205px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/12 flex items-center justify-center text-[var(--accent-cyan)]">
                  <ShieldCheck size={22} />
                </div>
                <span className="badge badge-emerald">0 Dependencies</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                100% Go Stdlib
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Engine.IO v4 protocol, WebSocket parser & RFC 6455 framing written purely in standard Go.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-panel hero-stats-card p-6 flex flex-col justify-between min-h-[205px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/12 flex items-center justify-center text-[var(--accent-indigo)]">
                  <Zap size={22} />
                </div>
                <span className="badge badge-cyan floating-indicator flex items-center gap-1">
                  <Zap size={12} />
                  <span>Upgrade</span>
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                HTTP Polling → WS
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Seamless automatic transport fallback and handshake upgrade with zero packet loss.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel hero-stats-card p-6 flex flex-col justify-between min-h-[205px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/12 flex items-center justify-center text-[var(--accent-purple)]">
                  <Cpu size={22} />
                </div>
                <span className="badge text-[var(--accent-purple)] border-purple-500/30">
                  Binary 0x02
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                Native Binary Streams
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Pass raw []byte byte-buffers directly over WebSocket frames without base64 overhead.
              </p>
            </div>
          </div>

          {/* Card 4 - Live Telemetry */}
          <div className="glass-panel hero-stats-card p-6 flex flex-col justify-between min-h-[205px] border-[var(--border-active)]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/12 flex items-center justify-center text-[var(--accent-emerald)]">
                  <Activity size={22} />
                </div>
                <span className="text-xs font-semibold text-[var(--accent-emerald)]">● Live Telemetry</span>
              </div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)] mb-1">
                {packetsCount.toLocaleString()} <span className="text-sm font-normal text-[var(--text-secondary)]">pkts/s</span>
              </div>
              <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-normal">
                Active Sessions: <strong className="text-[var(--text-primary)]">{activeClients}</strong> • Latency: &lt; 0.2ms
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
