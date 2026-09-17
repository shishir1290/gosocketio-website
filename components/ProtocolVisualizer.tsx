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
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "45px" }}>
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
        </div>

        {/* Interactive Visualizer Card */}
        <div
          className="glass-panel"
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            padding: "28px",
            background: "rgba(12, 16, 26, 0.95)",
            border: "1px solid rgba(0, 242, 254, 0.2)",
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
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  background: activeStep === idx ? "rgba(0, 242, 254, 0.18)" : "rgba(255, 255, 255, 0.04)",
                  color: activeStep === idx ? "var(--accent-cyan)" : "var(--text-secondary)",
                  border: `1px solid ${activeStep === idx ? "rgba(0, 242, 254, 0.4)" : "rgba(255, 255, 255, 0.06)"}`,
                  transition: "all 0.2s ease",
                }}
              >
                Step {idx + 1}
              </button>
            ))}
          </div>

          {/* Wireframe Diagram Area */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              gap: "20px",
              alignItems: "center",
              marginBottom: "28px",
              padding: "24px 16px",
              background: "rgba(0, 0, 0, 0.35)",
              borderRadius: "var(--radius-md)",
            }}
          >
            {/* Client Node */}
            <div
              style={{
                textAlign: "center",
                padding: "16px",
                background: "rgba(99, 102, 241, 0.12)",
                border: "1px solid rgba(99, 102, 241, 0.3)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <div style={{ display: "inline-flex", color: "var(--accent-indigo)", marginBottom: "6px" }}>
                <Laptop size={24} />
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Client App</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>socket.io-client</div>
            </div>

            {/* Direction Arrow & Layer Indicator */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <span className="badge" style={{ fontSize: "0.72rem", padding: "2px 8px" }}>
                {steps[activeStep].layer}
              </span>
              <div style={{ display: "flex", alignItems: "center", color: "var(--accent-cyan)" }}>
                {steps[activeStep].direction === "client-to-server" ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>SEND</span>
                    <ArrowRight size={20} />
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <ArrowLeft size={20} />
                    <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>REPLY</span>
                  </div>
                )}
              </div>
            </div>

            {/* Go Server Node */}
            <div
              style={{
                textAlign: "center",
                padding: "16px",
                background: "rgba(0, 242, 254, 0.12)",
                border: "1px solid rgba(0, 242, 254, 0.3)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <div style={{ display: "inline-flex", color: "var(--accent-cyan)", marginBottom: "6px" }}>
                <Server size={24} />
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>gsocketio Server</div>
              <div style={{ fontSize: "0.78rem", color: "var(--accent-cyan)" }}>Pure Go Stdlib</div>
            </div>
          </div>

          {/* Packet Content Description */}
          <div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
              {steps[activeStep].title}
            </h4>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", marginBottom: "16px", lineHeight: 1.5 }}>
              {steps[activeStep].desc}
            </p>

            <div
              style={{
                background: "#080c14",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "var(--radius-sm)",
                padding: "14px 18px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.88rem",
                color: "#67e8f9",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              {steps[activeStep].wire}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
