"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Radio, ArrowRight, ArrowLeft, RefreshCw, Cpu, Activity, Laptop, Server } from "lucide-react";

export default function ProtocolVisualizer() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      direction: "client-to-server",
      title: "1. HTTP WebSocket Handshake Upgrade",
      wire: 'GET /socket.io/?EIO=4&transport=websocket HTTP/1.1\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==',
      desc: "Client requests Engine.IO v4 upgrade over standard HTTP/1.1 or HTTP/2.",
      layer: "HTTP / RFC 6455"
    },
    {
      direction: "server-to-client",
      title: "2. Engine.IO Session Initialization",
      wire: '101 Switching Protocols\n0{"sid":"eX3_8kP...","pingInterval":25000,"pingTimeout":20000,"maxPayload":1000000}',
      desc: "Server accepts connection, assigns unique 128-bit SID, and negotiates heartbeat timings.",
      layer: "Engine.IO 0 (Open)"
    },
    {
      direction: "client-to-server",
      title: "3. Socket.IO Namespace Connection",
      wire: '40/chat,{"token":"jwt-secret-token"}',
      desc: "Client attaches to namespace '/chat' with authentication payload (Engine.IO 4 + SIO 0).",
      layer: "Socket.IO 0 (Connect)"
    },
    {
      direction: "server-to-client",
      title: "4. Namespace Handshake Ack",
      wire: '40/chat,{"sid":"eX3_8kP..."}',
      desc: "Server executes OnConnect handlers. If authorized, confirms connection to '/chat'.",
      layer: "Socket.IO 0 (Connect Ack)"
    },
    {
      direction: "client-to-server",
      title: "5. Real-Time Event Dispatch",
      wire: '42/chat,["send_message",{"user":"Alice","text":"Hello Go!"}]',
      desc: "Client transmits JSON event arguments. Server executes registered OnEvent callbacks.",
      layer: "Socket.IO 2 (Event)"
    },
    {
      direction: "server-to-client",
      title: "6. Broadcast & Room Distribution",
      wire: '42/chat,["new_message",{"user":"Alice","text":"Hello Go!"}]',
      desc: "gsocketio distributes packet to room members asynchronously with RWMutex safety.",
      layer: "Socket.IO 2 (Broadcast)"
    },
    {
      direction: "server-to-client",
      title: "7. Periodic Engine.IO Heartbeat",
      wire: '2  (Server Ping -> Client replies with 3 Pong within 20s)',
      desc: "Automatic liveness monitoring protects against half-open TCP connections.",
      layer: "Engine.IO 2/3 (Heartbeat)"
    }
  ];

  return (
    <section id="protocol" style={{ padding: "90px 0", position: "relative" }}>
      <div className="container">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "45px" }}
        >
          <div className="badge badge-cyan" style={{ marginBottom: "14px" }}>
            <Cpu size={13} />
            <span>Wire Protocol Architecture</span>
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Engine.IO v4 <span className="gradient-cyan-purple">Wire Lifecycle</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: "680px", margin: "0 auto" }}>
            Explore the RFC 6455 frame sequence and Engine.IO / Socket.IO packet transitions underneath gsocketio.
          </p>
        </motion.div>

        {/* Interactive Visualizer Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-panel"
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            padding: "clamp(18px, 3vw, 28px)",
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {/* Progress Timeline Pills */}
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              gap: "8px",
              paddingBottom: "16px",
              marginBottom: "24px",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            {steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <motion.button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    background: isSelected ? "rgba(0, 242, 254, 0.18)" : "var(--bg-card)",
                    color: isSelected ? "var(--accent-cyan)" : "var(--text-secondary)",
                    border: `1px solid ${isSelected ? "var(--accent-cyan)" : "var(--border-subtle)"}`,
                    boxShadow: isSelected ? "var(--shadow-cyan-glow)" : "var(--shadow-sm)",
                    transition: "all 0.2s ease",
                  }}
                >
                  Step {idx + 1}
                </motion.button>
              );
            })}
          </div>

          {/* Wireframe Diagram Area */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              gap: "12px",
              alignItems: "center",
              marginBottom: "28px",
              padding: "clamp(14px, 2.5vw, 24px) 12px",
              background: "var(--bg-input)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            {/* Client Node */}
            <div
              style={{
                textAlign: "center",
                padding: "clamp(10px, 2vw, 16px)",
                background: "rgba(99, 102, 241, 0.12)",
                border: "1px solid rgba(99, 102, 241, 0.35)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <div style={{ display: "inline-flex", color: "var(--accent-indigo)", marginBottom: "4px" }}>
                <Laptop size={22} />
              </div>
              <div style={{ fontWeight: 700, fontSize: "clamp(0.82rem, 2vw, 0.95rem)", color: "var(--text-primary)" }}>Client App</div>
              <div style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>socket.io-client</div>
            </div>

            {/* Direction Arrow & Layer Indicator */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <span className="badge" style={{ fontSize: "0.7rem", padding: "2px 6px" }}>
                {steps[activeStep].layer}
              </span>
              <div style={{ display: "flex", alignItems: "center", color: "var(--accent-cyan)" }}>
                {steps[activeStep].direction === "client-to-server" ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ fontSize: "0.76rem", fontWeight: 600 }}>SEND</span>
                    <ArrowRight size={18} />
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <ArrowLeft size={18} />
                    <span style={{ fontSize: "0.76rem", fontWeight: 600 }}>REPLY</span>
                  </div>
                )}
              </div>
            </div>

            {/* Go Server Node */}
            <div
              style={{
                textAlign: "center",
                padding: "clamp(10px, 2vw, 16px)",
                background: "rgba(0, 242, 254, 0.12)",
                border: "1px solid rgba(0, 242, 254, 0.35)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <div style={{ display: "inline-flex", color: "var(--accent-cyan)", marginBottom: "4px" }}>
                <Server size={22} />
              </div>
              <div style={{ fontWeight: 700, fontSize: "clamp(0.82rem, 2vw, 0.95rem)", color: "var(--text-primary)" }}>gsocketio Server</div>
              <div style={{ fontSize: "0.74rem", color: "var(--accent-cyan)" }}>Pure Go Stdlib</div>
            </div>
          </div>

          {/* Packet Content Description */}
          <div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
              {steps[activeStep].title}
            </h4>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", marginBottom: "16px", lineHeight: 1.5 }}>
              {steps[activeStep].desc}
            </p>

            <div
              style={{
                background: "#080c14",
                border: "1px solid rgba(0, 242, 254, 0.3)",
                borderRadius: "var(--radius-sm)",
                padding: "14px 18px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.88rem",
                color: "#38bdf8",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
              }}
            >
              {steps[activeStep].wire}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
