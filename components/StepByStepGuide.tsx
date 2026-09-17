"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STEP_BY_STEP_DOCS } from "@/lib/docs-data";
import CodeBlock from "./CodeBlock";
import { CheckCircle2, Lightbulb, ChevronRight } from "lucide-react";

export default function StepByStepGuide() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = STEP_BY_STEP_DOCS[activeStepIndex];

  return (
    <section id="steps" className="py-20 md:py-24 relative">
      <div className="container">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="badge badge-cyan mb-3.5">
            <span>Comprehensive Tutorial</span>
          </div>
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
                  whileHover={{ scale: 1.015, x: 3 }}
                  whileTap={{ scale: 0.985 }}
                  className={`glass-panel flex items-center gap-4 p-4 text-left cursor-pointer rounded-xl transition-all duration-200 border ${
                    isSelected
                      ? "bg-indigo-500/15 border-[var(--accent-indigo)] shadow-lg shadow-indigo-500/20"
                      : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-active)]"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0 transition-all ${
                      isSelected
                        ? "bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-indigo)] text-[#07090e]"
                        : "bg-white/5 text-[var(--text-secondary)]"
                    }`}
                  >
                    {step.number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div
                      className={`font-bold text-sm sm:text-base mb-0.5 truncate ${
                        isSelected ? "text-[var(--accent-indigo)]" : "text-[var(--text-primary)]"
                      }`}
                    >
                      {step.title}
                    </div>
                    <div
                      className={`text-xs leading-relaxed line-clamp-2 ${
                        isSelected ? "text-[var(--text-secondary)]" : "text-[var(--text-muted)]"
                      }`}
                    >
                      {step.shortDesc}
                    </div>
                  </div>

                  <ChevronRight
                    size={18}
                    className={`shrink-0 transition-transform duration-200 ${
                      isSelected ? "text-[var(--accent-cyan)] translate-x-1" : "text-[var(--text-muted)]"
                    }`}
                  />
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
                initial={{ opacity: 0, y: 12, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.99 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="glass-panel p-5 sm:p-7 bg-[var(--bg-card)] border border-[var(--border-active)] rounded-2xl shadow-xl"
              >
                {/* Step Header */}
                <div className="flex items-center gap-3 mb-3.5">
                  <span className="badge badge-cyan text-xs font-bold">
                    Step {activeStep.number}
                  </span>
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

                {/* Key Takeaways */}
                <div className="flex flex-col gap-2">
                  <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    Key Takeaways
                  </div>
                  {activeStep.highlights.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-[var(--accent-emerald)] mt-0.5 shrink-0"
                      />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Pro Tip if any */}
                {activeStep.tips && (
                  <div className="mt-4 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm text-amber-200">
                    <Lightbulb size={18} className="text-[var(--accent-amber)] shrink-0" />
                    <span className="leading-relaxed">{activeStep.tips[0]}</span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
