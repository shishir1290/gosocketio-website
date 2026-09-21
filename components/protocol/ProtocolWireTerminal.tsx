"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { StepItem } from "./protocol-data";

interface ProtocolWireTerminalProps {
  steps: StepItem[];
  activeStep: number;
  currentStep: StepItem;
  copied: boolean;
  onCopy: () => void;
  onSelectStep: (index: number) => void;
}

export function ProtocolWireTerminal({
  steps,
  activeStep,
  currentStep,
  copied,
  onCopy,
  onSelectStep,
}: ProtocolWireTerminalProps) {
  return (
    <>
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
            onClick={onCopy}
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

      <div className="flex flex-wrap justify-center gap-1.5 mt-5">
        {steps.map((step, idx) => {
          const isSelected = activeStep === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectStep(idx)}
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
    </>
  );
}
