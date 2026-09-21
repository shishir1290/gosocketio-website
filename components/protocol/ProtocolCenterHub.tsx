"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Laptop, Server, ArrowRight, ArrowLeft, Check, Copy } from "lucide-react";
import { StepItem } from "./protocol-data";

interface ProtocolCenterHubProps {
  currentStep: StepItem;
  activeStep: number;
  copied: boolean;
  onCopy: () => void;
}

export function ProtocolCenterHub({
  currentStep,
  activeStep,
  copied,
  onCopy,
}: ProtocolCenterHubProps) {
  return (
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
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="badge badge-cyan text-[10px] sm:text-xs font-mono font-bold py-0.5 px-2">
              {currentStep.layer}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/15 text-pink-400 border border-pink-500/30 font-mono">
              Phase {currentStep.number}/7
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3 w-full my-1.5 text-xs">
            <div className="flex flex-col items-center p-1 sm:p-1.5 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
              <Laptop size={14} />
              <span className="text-[8.5px] sm:text-[9px] font-bold">Client</span>
            </div>

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

            <div className="flex flex-col items-center p-1 sm:p-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
              <Server size={14} />
              <span className="text-[8.5px] sm:text-[9px] font-bold">gsocketio</span>
            </div>
          </div>

          <h4 className="text-xs sm:text-sm lg:text-base font-extrabold text-[var(--text-primary)] line-clamp-1 mt-1 mb-0.5">
            {currentStep.title}
          </h4>

          <p className="text-[10px] sm:text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 px-1 mb-2">
            {currentStep.desc}
          </p>

          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] text-[10px] sm:text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer shadow-sm"
            title="Copy packet frame"
          >
            {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
            <span className="font-mono">{copied ? "Copied" : "Copy Frame"}</span>
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
