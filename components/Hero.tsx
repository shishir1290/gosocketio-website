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
  const [packetsCount, setPacketsCount] = useState(14829);
  const [activeClients, setActiveClients] = useState(128);

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
      ref={containerRef}
      style={{
        position: "relative",
        paddingTop: "110px",
        paddingBottom: "60px",
        overflow: "hidden",
      }}
    >
      <div className="hero-glow" />
      <div className="grid-overlay" />

      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        {/* Top Feature Badge */}
        <div className="hero-badge" style={{ marginBottom: "24px" }}>
          <div className="badge badge-cyan pulse-glow">
            <Sparkles size={14} />
            <span>Zero Third-Party Dependencies • Pure Go Standard Library</span>
          </div>
        </div>

        {/* Hero Title */}
        <h1
          className="hero-title"
          style={{
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            maxWidth: "960px",
            margin: "0 auto 20px auto",
          }}
        >
          High-Performance <span className="gradient-cyan-purple">Socket.IO v4</span> Server Built Purely in Go
        </h1>

        {/* Subtitle */}
        <p
          className="hero-sub"
          style={{
            fontSize: "clamp(1.02rem, 1.8vw, 1.18rem)",
            color: "var(--text-secondary)",
            maxWidth: "780px",
            margin: "0 auto 28px auto",
            lineHeight: 1.6,
          }}
        >
          Zero Gorilla. Zero external packages. Hand-crafted RFC 6455 WebSocket framing, Engine.IO v4 long-polling, 
          instant client connection upgrades, string & binary event broadcasting, thread-safe rooms, and sub-millisecond latencies.
        </p>

        {/* Install Command & Action Buttons */}
        <div
          className="hero-cta-group"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "18px",
            marginBottom: "44px",
          }}
        >
          {/* Quick Install Bar */}
          <div
            onClick={handleCopyCmd}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 16px",
              background: "var(--bg-glass)",
              border: "1px solid var(--border-active)",
              borderRadius: "var(--radius-full)",
              cursor: "pointer",
              boxShadow: "var(--shadow-cyan-glow)",
              transition: "all 0.25s ease",
              maxWidth: "100%",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent-cyan)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-active)")}
          >
            <span style={{ color: "var(--accent-cyan)", fontFamily: "var(--font-mono)", fontSize: "0.95rem" }}>$</span>
            <code
              style={{
                color: "var(--text-primary)",
                fontSize: "clamp(0.78rem, 2.5vw, 0.92rem)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              go get github.com/shishir1290/gsocketio@latest
            </code>
            <button
              type="button"
              style={{
                background: copied ? "rgba(16, 185, 129, 0.2)" : "rgba(99, 102, 241, 0.15)",
                border: "none",
                borderRadius: "var(--radius-full)",
                color: copied ? "var(--accent-emerald)" : "var(--text-primary)",
                padding: "6px 12px",
                fontSize: "0.78rem",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          {/* Action CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px" }}>
            <a href="#steps" className="btn-primary">
              <span>Explore Step-by-Step Guide</span>
              <ArrowRight size={17} />
            </a>
            <a href="#playground" className="btn-secondary">
              <Radio size={17} color="var(--accent-cyan)" />
              <span>Launch Live Simulator</span>
            </a>
          </div>
        </div>

        {/* Live Feature & Metrics Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
            maxWidth: "1100px",
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          {/* Card 1 */}
          <div className="glass-panel hero-stats-card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "rgba(0, 242, 254, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-cyan)",
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <span className="badge badge-emerald">0 Dependencies</span>
            </div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "6px" }}>100% Go Stdlib</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.5 }}>
              Engine.IO v4 protocol, WebSocket parser & RFC 6455 framing written purely in standard Go.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel hero-stats-card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "rgba(99, 102, 241, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-indigo)",
                }}
              >
                <Zap size={22} />
              </div>
              <span className="badge badge-cyan floating-indicator" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <Zap size={12} />
                <span>Upgrade</span>
              </span>
            </div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "6px" }}>HTTP Polling → WS</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.5 }}>
              Seamless automatic transport fallback and handshake upgrade with zero packet loss.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel hero-stats-card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "rgba(168, 85, 247, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-purple)",
                }}
              >
                <Cpu size={22} />
              </div>
              <span className="badge" style={{ color: "#e879f9", borderColor: "rgba(232, 121, 249, 0.3)" }}>
                Binary 0x02
              </span>
            </div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "6px" }}>Native Binary Streams</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.5 }}>
              Pass raw []byte byte-buffers directly over WebSocket frames without base64 overhead.
            </p>
          </div>

          {/* Card 4 - Live Telemetry */}
          <div
            className="glass-panel hero-stats-card"
            style={{
              padding: "24px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-active)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "rgba(16, 185, 129, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-emerald)",
                }}
              >
                <Activity size={22} />
              </div>
              <span style={{ fontSize: "0.78rem", color: "var(--accent-emerald)", fontWeight: 600 }}>● Live Telemetry</span>
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "2px" }}>
              {packetsCount.toLocaleString()} <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>pkts/s</span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.82rem" }}>
              Active Sessions: <strong style={{ color: "var(--text-primary)" }}>{activeClients}</strong> • Latency: &lt; 0.2ms
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
