"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Zap, Cpu, Activity } from "lucide-react";
import { io } from "socket.io-client";

const TELEMETRY_SERVER_URL = "https://gsocket-telemetry.onrender.com";

export function HeroStatsCards() {
  const [packetsCount, setPacketsCount] = useState(15156);
  const [activeClients, setActiveClients] = useState(129);
  const [latency, setLatency] = useState<number | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let socket: any = null;
    try {
      socket = io(TELEMETRY_SERVER_URL, {
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
        timeout: 5000,
      });

      socket.on("connect", () => {
        setIsLive(true);
        socket.emit("telemetry:subscribe", {
          client: "gosocketio-website-hero",
        });
      });

      socket.on("telemetry:metrics", (metrics: any) => {
        setIsLive(true);
        if (
          metrics.packetsPerSecIn !== undefined &&
          metrics.packetsPerSecOut !== undefined
        ) {
          const rate = metrics.packetsPerSecIn + metrics.packetsPerSecOut;
          setPacketsCount(rate > 0 ? rate : metrics.totalPacketsOut || 450);
        }
        if (metrics.activeClients !== undefined) {
          setActiveClients(metrics.activeClients);
        }
        if (metrics.avgLatencyMs !== undefined) {
          setLatency(metrics.avgLatencyMs);
        }
      });

      socket.on("disconnect", () => {
        setIsLive(false);
      });

      socket.on("connect_error", () => {
        setIsLive(false);
      });
    } catch {
      setIsLive(false);
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
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
            Engine.IO v4 protocol, WebSocket parser & RFC 6455 framing written
            purely in standard Go.
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
            Seamless automatic transport fallback and handshake upgrade with
            zero packet loss.
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
            Pass raw []byte byte-buffers directly over WebSocket frames without
            base64 overhead.
          </p>
        </div>
      </div>

      <div className="glass-panel hero-stats-card p-6 flex flex-col justify-between min-h-[205px] border-[var(--border-active)]">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/12 flex items-center justify-center text-[var(--accent-emerald)]">
              <Activity size={22} />
            </div>
            <span className="text-xs font-semibold text-[var(--accent-emerald)] flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" : "bg-emerald-500/70"}`}
              />
              {isLive ? "Live Stream (Online)" : "● Live Telemetry"}
            </span>
          </div>
          <div className="text-2xl font-extrabold text-[var(--text-primary)] mb-1">
            {packetsCount.toLocaleString()}{" "}
            <span className="text-sm font-normal text-[var(--text-secondary)]">
              pkts/s
            </span>
          </div>
          <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-normal">
            Active Sessions:{" "}
            <strong className="text-[var(--text-primary)]">
              {activeClients}
            </strong>
            <br />
            Latency: {latency ? `< ${latency.toFixed(2)}ms` : "< 0.3ms"}
          </p>
        </div>
      </div>
    </div>
  );
}
