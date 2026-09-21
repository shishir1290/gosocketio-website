"use client";

import { motion } from "framer-motion";
import { StepItem } from "./protocol-data";

interface ProtocolOrbitWheelProps {
  steps: StepItem[];
  activeStep: number;
  onSelectStep: (index: number) => void;
  wheelRotation: number;
  stepAngle: number;
}

export function ProtocolOrbitWheel({
  steps,
  activeStep,
  onSelectStep,
  wheelRotation,
  stepAngle,
}: ProtocolOrbitWheelProps) {
  return (
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
          <linearGradient id="cyanArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="1" />
          </linearGradient>

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

        <path
          d="M 68 260 A 192 192 0 0 1 452 260"
          fill="none"
          stroke="url(#cyanArcGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          filter="url(#glowGlow)"
        />
        <polygon
          points="435,250 469,250 452,284"
          fill="#38bdf8"
          filter="url(#glowGlow)"
        />

        <path
          d="M 452 260 A 192 192 0 0 1 68 260"
          fill="none"
          stroke="url(#pinkArcGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          filter="url(#glowGlow)"
        />
        <polygon
          points="51,270 85,270 68,236"
          fill="#f43f5e"
          filter="url(#glowGlow)"
        />

        <circle
          cx="260"
          cy="260"
          r="192"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="2"
        />
      </svg>

      {steps.map((step, idx) => {
        const baseAngle = idx * stepAngle - 90;
        const isSelected = activeStep === idx;
        const r = 192;

        return (
          <div
            key={idx}
            className="absolute"
            style={{
              transform: `rotate(${baseAngle}deg) translate(${r}px)`,
            }}
          >
            <motion.button
              type="button"
              animate={{ rotate: -(wheelRotation + baseAngle) }}
              transition={{ type: "spring", stiffness: 140, damping: 22 }}
              onClick={() => onSelectStep(idx)}
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
  );
}
