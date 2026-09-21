"use client";

import { motion } from "framer-motion";
import { DocStep } from "@/lib/docs/types";
import { ChevronRight } from "lucide-react";

interface StepSelectorListProps {
  steps: DocStep[];
  activeStepIndex: number;
  onSelectStep: (index: number) => void;
}

export function StepSelectorList({
  steps,
  activeStepIndex,
  onSelectStep,
}: StepSelectorListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="lg:col-span-5 flex flex-col gap-2.5"
    >
      {steps.map((step, index) => {
        const isSelected = index === activeStepIndex;
        return (
          <motion.button
            key={step.id}
            onClick={() => onSelectStep(index)}
            whileHover={{ scale: 1.015, x: 4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`relative flex items-center gap-4 p-4 text-left cursor-pointer rounded-2xl transition-colors duration-200 border ${
              isSelected
                ? "bg-indigo-500/15 border-[var(--accent-indigo)] shadow-lg shadow-indigo-500/20"
                : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-active)]"
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId="activeStepPill"
                className="absolute inset-0 rounded-2xl bg-indigo-500/10 border-2 border-[var(--accent-indigo)] -z-10 shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}

            <motion.div
              animate={{
                scale: isSelected ? 1.05 : 1,
                rotate: isSelected ? [0, -5, 5, 0] : 0,
              }}
              transition={{ duration: 0.3 }}
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0 transition-all ${
                isSelected
                  ? "bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-indigo)] text-[#07090e] shadow-md shadow-cyan-500/25"
                  : "bg-white/5 text-[var(--text-secondary)]"
              }`}
            >
              {step.number}
            </motion.div>

            <div className="flex-1 min-w-0">
              <div
                className={`font-bold text-sm sm:text-base mb-0.5 truncate transition-colors ${
                  isSelected ? "text-[var(--accent-cyan)]" : "text-[var(--text-primary)]"
                }`}
              >
                {step.title}
              </div>
              <div
                className={`text-xs leading-relaxed line-clamp-2 transition-colors ${
                  isSelected ? "text-[var(--text-secondary)]" : "text-[var(--text-muted)]"
                }`}
              >
                {step.shortDesc}
              </div>
            </div>

            <motion.div
              animate={{ x: isSelected ? 4 : 0 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ChevronRight
                size={18}
                className={`shrink-0 transition-colors ${
                  isSelected ? "text-[var(--accent-cyan)]" : "text-[var(--text-muted)]"
                }`}
              />
            </motion.div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
