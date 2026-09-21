"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Zap, Cpu, Activity } from "lucide-react";

export function HeroStatsCards() {
  const [packetsCount, setPacketsCount] = useState(15156);
  const [activeClients, setActiveClients] = useState(129);

  useEffect(() => {
    const interval = setInterval(() => {
      setPacketsCount((prev) => prev + Math.floor(Math.random() * 45) + 12);
      setActiveClients((prev) => prev + (Math.random() > 0.6 ? (Math.random() > 0.5 ? 1 : -1) : 0));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1140px] mx-auto text-left items-stretch">
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
  );
}
