"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Cpu, Laptop, Server } from "lucide-react";

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
    <section id="protocol" className="pt-4 md:pt-6 pb-14 md:pb-20 relative">
      <div className="container">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-11"
        >
          <div className="badge badge-cyan mb-3.5">
            <Cpu size={13} />
            <span>Wire Protocol Architecture</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-[var(--text-primary)]">
            Engine.IO v4 <span className="gradient-cyan-purple">Wire Lifecycle</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
            Explore the RFC 6455 frame sequence and Engine.IO / Socket.IO packet transitions underneath gsocketio.
          </p>
        </motion.div>

        {/* Interactive Visualizer Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-panel max-w-4xl mx-auto p-5 sm:p-7 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-xl"
        >
          {/* Progress Timeline Pills */}
          <div className="flex overflow-x-auto gap-2 pb-4 mb-6 border-b border-[var(--border-subtle)]">
            {steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <motion.button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`py-2 px-3.5 rounded-full text-xs font-semibold cursor-pointer whitespace-nowrap transition-all duration-200 border ${
                    isSelected
                      ? "bg-cyan-400/20 text-[var(--accent-cyan)] border-[var(--accent-cyan)] shadow-md shadow-cyan-400/10"
                      : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-subtle)]"
                  }`}
                >
                  Step {idx + 1}
                </motion.button>
              );
            })}
          </div>

          {/* Wireframe Diagram Area */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-center mb-7 p-4 sm:p-6 bg-[var(--bg-input)] rounded-xl border border-[var(--border-subtle)]">
            {/* Client Node */}
            <div className="text-center p-3.5 sm:p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
              <div className="inline-flex text-[var(--accent-indigo)] mb-1">
                <Laptop size={22} />
              </div>
              <div className="font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                Client App
              </div>
              <div className="text-[0.72rem] text-[var(--text-muted)]">socket.io-client</div>
            </div>

            {/* Direction Arrow & Layer Indicator */}
            <div className="flex flex-col items-center gap-1.5 my-2 sm:my-0">
              <span className="badge text-[0.7rem] py-0.5 px-2">
                {steps[activeStep].layer}
              </span>
              <div className="flex items-center text-[var(--accent-cyan)]">
                {steps[activeStep].direction === "client-to-server" ? (
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold">SEND</span>
                    <ArrowRight size={16} />
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <ArrowLeft size={16} />
                    <span className="text-xs font-semibold">REPLY</span>
                  </div>
                )}
              </div>
            </div>

            {/* Go Server Node */}
            <div className="text-center p-3.5 sm:p-4 bg-cyan-400/10 border border-cyan-400/30 rounded-xl">
              <div className="inline-flex text-[var(--accent-cyan)] mb-1">
                <Server size={22} />
              </div>
              <div className="font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                gsocketio Server
              </div>
              <div className="text-[0.72rem] text-[var(--accent-cyan)]">Pure Go Stdlib</div>
            </div>
          </div>

          {/* Packet Content Description */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-2">
              {steps[activeStep].title}
            </h3>
            <p className="text-[var(--text-secondary)] text-xs sm:text-sm mb-4 leading-relaxed">
              {steps[activeStep].desc}
            </p>

            <div className="bg-[#080c14] border border-cyan-400/30 rounded-xl p-3.5 sm:p-4 font-mono text-xs sm:text-sm text-sky-400 whitespace-pre-wrap break-all shadow-lg">
              {steps[activeStep].wire}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
