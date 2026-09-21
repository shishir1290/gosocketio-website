"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { UPGRADE_STEPS } from "./architecture-data";

interface UpgradeStateMachineProps {
  upgradeStep: number;
  onSelectStep: (step: number) => void;
}

export function UpgradeStateMachine({
  upgradeStep,
  onSelectStep,
}: UpgradeStateMachineProps) {
  const current = UPGRADE_STEPS[upgradeStep];

  return (
    <motion.div
      key="upgrade"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel max-w-4xl mx-auto p-6 sm:p-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-xl"
    >
      <div className="flex overflow-x-auto gap-2 pb-4 mb-6 border-b border-[var(--border-subtle)]">
        {UPGRADE_STEPS.map((step, idx) => (
          <button
            key={idx}
            onClick={() => onSelectStep(idx)}
            className={`py-2 px-3.5 rounded-full text-xs font-semibold cursor-pointer whitespace-nowrap transition-all border ${
              upgradeStep === idx
                ? "bg-cyan-500/20 text-[var(--accent-cyan)] border-[var(--accent-cyan)] shadow-md shadow-cyan-500/10"
                : "bg-[var(--bg-input)] text-[var(--text-secondary)] border-[var(--border-subtle)]"
            }`}
          >
            Step {idx + 1}: {step.title.split(". ")[1]}
          </button>
        ))}
      </div>

      <div className="bg-[var(--bg-input)] p-6 rounded-2xl border border-[var(--border-subtle)] mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="badge badge-cyan text-xs">{current.protocol}</span>
          <span className="text-xs text-[var(--text-muted)] font-mono">
            Internal Hook: {current.internalGo}
          </span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
            <div className="text-[0.7rem] text-cyan-400 font-bold mb-1 flex items-center gap-1.5">
              <ArrowRight size={13} /> WIRE PAYLOAD & PROTOCOL TRANSITION
            </div>
            <div className="text-sky-300 break-all whitespace-pre-wrap">
              {current.wirePayload}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-2">
          {current.title}
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          {current.serverAction}
        </p>
      </div>
    </motion.div>
  );
}
