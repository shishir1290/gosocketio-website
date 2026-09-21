"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DocStep } from "@/lib/docs/types";
import CodeBlock from "../CodeBlock";
import { CheckCircle2, Lightbulb } from "lucide-react";

interface StepDetailCardProps {
  activeStep: DocStep;
}

export function StepDetailCard({ activeStep }: StepDetailCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="lg:col-span-7 relative min-w-0"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeStep.id}
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel p-5 sm:p-7 bg-[var(--bg-card)] border border-[var(--border-active)] rounded-2xl shadow-xl"
        >
          <div className="flex items-center gap-3 mb-3.5">
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="badge badge-cyan text-xs font-bold"
            >
              Step {activeStep.number}
            </motion.span>
            <h3 className="text-lg sm:text-xl font-extrabold text-[var(--text-primary)]">
              {activeStep.title}
            </h3>
          </div>

          <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed mb-5">
            {activeStep.summary}
          </p>

          <div className="mb-5">
            <CodeBlock
              code={activeStep.code}
              filename={activeStep.filename}
              language={activeStep.language}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
              Key Takeaways
            </div>
            {activeStep.highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]"
              >
                <CheckCircle2
                  size={16}
                  className="text-[var(--accent-emerald)] mt-0.5 shrink-0"
                />
                <span className="leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>

          {activeStep.tips && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm text-amber-200"
            >
              <Lightbulb size={18} className="text-[var(--accent-amber)] shrink-0" />
              <span className="leading-relaxed">{activeStep.tips[0]}</span>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
