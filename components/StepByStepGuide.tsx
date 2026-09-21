"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STEP_BY_STEP_DOCS } from "@/lib/docs-data";
import CodeBlock from "./CodeBlock";
import { CheckCircle2, Lightbulb, ChevronRight, Sparkles } from "lucide-react";

export default function StepByStepGuide() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = STEP_BY_STEP_DOCS[activeStepIndex];

  return (
    <section id="steps" className="pt-4 md:pt-6 pb-14 md:pb-20 relative">
      <div className="container">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="badge badge-cyan mb-3.5 inline-flex items-center gap-1.5"
          >
            <Sparkles size={13} />
            <span>Comprehensive Tutorial</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-[var(--text-primary)]">
            Step-by-Step <span className="gradient-cyan-purple">Implementation Guide</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
            Follow these step-by-step recipes to build secure, high-throughput, real-time Go backends using gsocketio.
          </p>
        </motion.div>

        {/* Main Grid: Steps List on Left, Active Step Code on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Step Selector Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col gap-2.5"
          >
            {STEP_BY_STEP_DOCS.map((step, index) => {
              const isSelected = index === activeStepIndex;
              return (
                <motion.button
                  key={step.id}
                  onClick={() => setActiveStepIndex(index)}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={`relative flex items-center gap-4 p-4 text-left cursor-pointer rounded-2xl transition-colors duration-200 border ${
                    isSelected
                      ? "bg-indigo-500/15 border-[var(--accent-indigo)] shadow-lg shadow-indigo-500/20"
                      : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-active)]"
                  }`}
                >
                  {/* Framer Motion Active Indicator Pill */}
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

          {/* Active Step Content & Code Viewer */}
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
                {/* Step Header */}
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

                {/* Code Block */}
                <div className="mb-5">
                  <CodeBlock
                    code={activeStep.code}
                    filename={activeStep.filename}
                    language={activeStep.language}
                  />
                </div>

                {/* Key Takeaways with Stagger Animation */}
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

                {/* Pro Tip if any */}
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
        </div>
      </div>
    </section>
  );
}
