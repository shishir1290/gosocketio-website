"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { STEP_BY_STEP_DOCS } from "@/lib/docs-data";
import { Sparkles } from "lucide-react";
import { StepSelectorList } from "./guide/StepSelectorList";
import { StepDetailCard } from "./guide/StepDetailCard";

export default function StepByStepGuide() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = STEP_BY_STEP_DOCS[activeStepIndex];

  return (
    <section id="steps" className="pt-4 md:pt-6 pb-14 md:pb-20 relative">
      <div className="container">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <StepSelectorList
            steps={STEP_BY_STEP_DOCS}
            activeStepIndex={activeStepIndex}
            onSelectStep={setActiveStepIndex}
          />
          <StepDetailCard activeStep={activeStep} />
        </div>
      </div>
    </section>
  );
}
