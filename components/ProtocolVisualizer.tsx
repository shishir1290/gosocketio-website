"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Cpu,
  Laptop,
  Server,
  Play,
  Pause,
  Copy,
  Check,
  Radio,
  Zap,
  Globe,
  Layers,
  Activity,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";

interface StepItem {
  number: number;
  direction: "client-to-server" | "server-to-client";
  title: string;
  shortTitle: string;
  wire: string;
  desc: string;
  layer: string;
  badge: string;
  icon: any;
}

export default function ProtocolVisualizer() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const steps: StepItem[] = [
    {
      number: 1,
      direction: "client-to-server",
      title: "1. HTTP WebSocket Handshake Upgrade",
      shortTitle: "1. Upgrade Handshake",
      wire: "GET /socket.io/?EIO=4&transport=websocket HTTP/1.1\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==",
      desc: "Client requests Engine.IO v4 upgrade over standard HTTP/1.1 or HTTP/2.",
      layer: "HTTP / RFC 6455",
      badge: "HTTP 101",
      icon: Globe,
    },
    {
      number: 2,
      direction: "server-to-client",
      title: "2. Engine.IO Session Initialization",
      shortTitle: "2. Session Open",
      wire: '101 Switching Protocols\n0{"sid":"eX3_8kP...","pingInterval":25000,"pingTimeout":20000,"maxPayload":1000000}',
      desc: "Server accepts connection, assigns unique 128-bit SID, and negotiates heartbeat timings.",
      layer: "Engine.IO 0 (Open)",
      badge: "SID & Ping",
      icon: Radio,
    },
    {
      number: 3,
      direction: "client-to-server",
      title: "3. Socket.IO Namespace Connection",
      shortTitle: "3. Connect Namespace",
      wire: '40/chat,{"token":"jwt-secret-token"}',
      desc: "Client attaches to namespace '/chat' with authentication payload (Engine.IO 4 + SIO 0).",
      layer: "Socket.IO 0 (Connect)",
      badge: "SIO Connect",
      icon: Layers,
    },
    {
      number: 4,
      direction: "server-to-client",
      title: "4. Namespace Handshake Ack",
      shortTitle: "4. Connect Ack",
      wire: '40/chat,{"sid":"eX3_8kP..."}',
      desc: "Server executes OnConnect handlers. If authorized, confirms connection to '/chat'.",
      layer: "Socket.IO 0 (Connect Ack)",
      badge: "SIO Ack",
      icon: Zap,
    },
    {
      number: 5,
      direction: "client-to-server",
      title: "5. Real-Time Event Dispatch",
      shortTitle: "5. Event Emit",
      wire: '42/chat,["send_message",{"user":"Alice","text":"Hello Go!"}]',
      desc: "Client transmits JSON event arguments. Server executes registered OnEvent callbacks.",
      layer: "Socket.IO 2 (Event)",
      badge: "Event Frame",
      icon: Activity,
    },
    {
      number: 6,
      direction: "server-to-client",
      title: "6. Broadcast & Room Distribution",
      shortTitle: "6. Room Broadcast",
      wire: '42/chat,["new_message",{"user":"Alice","text":"Hello Go!"}]',
      desc: "gsocketio distributes packet to room members asynchronously with RWMutex safety.",
      layer: "Socket.IO 2 (Broadcast)",
      badge: "Room Fanout",
      icon: Server,
    },
    {
      number: 7,
      direction: "server-to-client",
      title: "7. Periodic Engine.IO Heartbeat",
      shortTitle: "7. Ping / Pong",
      wire: "2  (Server Ping -> Client replies with 3 Pong within 20s)",
      desc: "Automatic liveness monitoring protects against half-open TCP connections.",
      layer: "Engine.IO 2/3 (Heartbeat)",
      badge: "Heartbeat",
      icon: Cpu,
    },
  ];

  // Auto-play rotation timer
  useEffect(() => {
    if (isPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 3500);
    } else {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPlaying, steps.length]);

  const handleCopy = async () => {
    await copyToClipboard(steps[activeStep].wire);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const currentStep = steps[activeStep];
  const stepAngle = 360 / steps.length;
  // Always rotate so the active step is placed at the exact 12 o'clock (top) position (-90deg)
  const wheelRotation = -activeStep * stepAngle;

  return (
    <section id="protocol" className="pt-4 md:pt-6 pb-14 md:pb-20 relative overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8"
        >
          <div className="badge badge-cyan mb-3.5 inline-flex items-center gap-1.5">
            <Cpu size={13} />
            <span>Wire Protocol Architecture</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-[var(--text-primary)]">
            Engine.IO v4 <span className="gradient-cyan-purple">Wire Lifecycle</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
            Interactive dual-arrow circular visualizer: follow the cyclic RFC 6455 and Engine.IO state machine.
          </p>
        </motion.div>

        {/* Circular Visualizer Container */}
        <div className="relative max-w-4xl mx-auto flex flex-col items-center">
          {/* Top Controls Toolbar */}
          <div className="flex items-center justify-between w-full max-w-lg mb-6 px-4 py-2.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-md z-20">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevStep}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] transition-colors cursor-pointer"
                title="Previous step"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] transition-colors cursor-pointer"
                title="Next step"
              >
                <ChevronRight size={16} />
              </button>
              <span className="text-xs font-mono text-[var(--text-muted)] ml-1">
                Active: <span className="text-[var(--accent-cyan)] font-bold">Step {activeStep + 1}</span> of {steps.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                isPlaying
                  ? "bg-cyan-500/20 text-[var(--accent-cyan)] border-cyan-500/40 shadow-sm shadow-cyan-500/20"
                  : "bg-white/5 text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]"
              }`}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
              <span>{isPlaying ? "Pause Rotation" : "Auto-Rotate"}</span>
            </button>
          </div>

          {/* MAIN CIRCULAR ROTATING ARROWS VIEWPORT */}
          <div className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] lg:w-[540px] lg:h-[540px] flex items-center justify-center select-none">
            {/* Ambient Radial Background Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/15 via-indigo-500/10 to-pink-500/15 blur-3xl pointer-events-none" />

            {/* DUAL-ARROW CIRCULAR ROTATING SVG WHEEL */}
            <motion.div
              animate={{ rotate: wheelRotation }}
              transition={{ type: "spring", stiffness: 140, damping: 22 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              <svg
                viewBox="0 0 520 520"
                className="w-full h-full overflow-visible drop-shadow-[0_0_25px_rgba(0,242,254,0.25)]"
              >
                <defs>
                  {/* Cyan Arrow Gradient (Top-Right Arc) */}
                  <linearGradient id="cyanArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.3" />
                    <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="1" />
                  </linearGradient>

                  {/* Hot Pink / Magenta Arrow Gradient (Bottom-Left Arc) */}
                  <linearGradient id="pinkArcGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
                    <stop offset="60%" stopColor="#f43f5e" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#e11d48" stopOpacity="1" />
                  </linearGradient>

                  <filter id="glowGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Outer Subtle Orbit Guide Ring */}
                <circle
                  cx="260"
                  cy="260"
                  r="230"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                  className="text-[var(--border-subtle)] opacity-40"
                />

                {/* 1. TOP-RIGHT CYAN ROTATING ARROW ARC */}
                <path
                  d="M 68 260 A 192 192 0 0 1 452 260"
                  fill="none"
                  stroke="url(#cyanArcGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  filter="url(#glowGlow)"
                />
                {/* Arrowhead on Right side pointing downwards */}
                <polygon
                  points="435,250 469,250 452,284"
                  fill="#38bdf8"
                  filter="url(#glowGlow)"
                />

                {/* 2. BOTTOM-LEFT HOT PINK ROTATING ARROW ARC */}
                <path
                  d="M 452 260 A 192 192 0 0 1 68 260"
                  fill="none"
                  stroke="url(#pinkArcGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  filter="url(#glowGlow)"
                />
                {/* Arrowhead on Left side pointing upwards */}
                <polygon
                  points="51,270 85,270 68,236"
                  fill="#f43f5e"
                  filter="url(#glowGlow)"
                />

                {/* Pulsing Core Orbit Ring */}
                <circle
                  cx="260"
                  cy="260"
                  r="192"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="2"
                />
              </svg>

              {/* 7 Orbiting Step Node Buttons on the Circle Track (Starting from Top at -90deg) */}
              {steps.map((step, idx) => {
                const baseAngle = idx * stepAngle - 90; // Step 0 begins at -90deg (12 o'clock TOP)
                const isSelected = activeStep === idx;
                const r = 192; // Track radius

                return (
                  <div
                    key={idx}
                    className="absolute"
                    style={{
                      transform: `rotate(${baseAngle}deg) translate(${r}px)`,
                    }}
                  >
                    {/* Counter-rotate so numbers remain upright while circle spins */}
                    <motion.button
                      type="button"
                      animate={{ rotate: -(wheelRotation + baseAngle) }}
                      transition={{ type: "spring", stiffness: 140, damping: 22 }}
                      onClick={() => setActiveStep(idx)}
                      whileHover={{ scale: 1.25 }}
                      whileTap={{ scale: 0.9 }}
                      className={`relative flex items-center justify-center rounded-full transition-all cursor-pointer ${
                        isSelected
                          ? "w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#00f2fe] to-[#ec4899] text-[#07090e] font-extrabold shadow-2xl shadow-cyan-500/50 ring-4 ring-cyan-400/50 z-30 scale-110"
                          : "w-8 h-8 sm:w-9 sm:h-9 bg-[var(--bg-card)] text-[var(--text-secondary)] border-2 border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] hover:text-[var(--text-primary)] shadow-md z-10"
                      }`}
                      title={step.title}
                    >
                      <span className="font-mono text-xs sm:text-base font-extrabold">
                        {step.number}
                      </span>
                    </motion.button>
                  </div>
                );
              })}
            </motion.div>

            {/* DETAILS CONTAINER (IN THE MIDDLE OF THE CIRCLE) */}
            <div className="relative z-20 w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px] rounded-full p-4 sm:p-7 bg-[var(--bg-card)]/95 border-2 border-[var(--border-active)] shadow-2xl backdrop-blur-2xl flex flex-col items-center justify-center text-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.88, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.88, rotate: 8 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center w-full h-full"
                >
                  {/* Step & Layer Badge */}
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="badge badge-cyan text-[10px] sm:text-xs font-mono font-bold py-0.5 px-2">
                      {currentStep.layer}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/15 text-pink-400 border border-pink-500/30 font-mono">
                      Phase {currentStep.number}/7
                    </span>
                  </div>

                  {/* Client ⟷ Server Transmission Visualizer */}
                  <div className="flex items-center justify-center gap-2 sm:gap-3 w-full my-1.5 text-xs">
                    {/* Client Box */}
                    <div className="flex flex-col items-center p-1 sm:p-1.5 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                      <Laptop size={14} />
                      <span className="text-[8.5px] sm:text-[9px] font-bold">Client</span>
                    </div>

                    {/* Transmission Direction */}
                    <div className="flex flex-col items-center px-1">
                      <span className="text-[8px] sm:text-[9px] font-mono font-bold text-[var(--accent-cyan)]">
                        {currentStep.direction === "client-to-server" ? "SEND →" : "← REPLY"}
                      </span>
                      <div className="flex items-center text-[var(--accent-cyan)]">
                        {currentStep.direction === "client-to-server" ? (
                          <ArrowRight size={13} className="animate-pulse text-cyan-400" />
                        ) : (
                          <ArrowLeft size={13} className="animate-pulse text-pink-400" />
                        )}
                      </div>
                    </div>

                    {/* Server Box */}
                    <div className="flex flex-col items-center p-1 sm:p-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                      <Server size={14} />
                      <span className="text-[8.5px] sm:text-[9px] font-bold">gsocketio</span>
                    </div>
                  </div>

                  {/* Step Title */}
                  <h4 className="text-xs sm:text-sm lg:text-base font-extrabold text-[var(--text-primary)] line-clamp-1 mt-1 mb-0.5">
                    {currentStep.title}
                  </h4>

                  {/* Description */}
                  <p className="text-[10px] sm:text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 px-1 mb-2">
                    {currentStep.desc}
                  </p>

                  {/* Action: Copy payload */}
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] text-[10px] sm:text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer shadow-sm"
                    title="Copy packet frame"
                  >
                    {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                    <span className="font-mono">{copied ? "Copied" : "Copy Frame"}</span>
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Wireframe Code Payload Terminal (Below Circle) */}
          <div className="w-full max-w-2xl mt-4">
            <div className="flex items-center justify-between px-4 py-2 bg-[#0c121d] border-t border-x border-[var(--border-subtle)] rounded-t-xl text-xs font-mono text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <span className="text-[var(--text-secondary)] font-semibold">
                  Live Wireframe Frame (Step {activeStep + 1}: {currentStep.badge})
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <div className="bg-[#050811] border border-[var(--border-subtle)] rounded-b-xl p-3.5 sm:p-4 font-mono text-xs sm:text-sm text-cyan-300 whitespace-pre-wrap break-all shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentStep.wire}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Quick Direct Step Selector Pills */}
          <div className="flex flex-wrap justify-center gap-1.5 mt-5">
            {steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all border ${
                    isSelected
                      ? "bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold shadow-md shadow-pink-500/20 scale-105"
                      : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-active)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {step.number}. {step.badge}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
