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
    <section id="steps" style={{ padding: "100px 0 80px 0", position: "relative" }}>
      <div className="container">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <div className="badge badge-cyan" style={{ marginBottom: "14px" }}>
            <span>Comprehensive Tutorial</span>
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Step-by-Step <span className="gradient-cyan-purple">Implementation Guide</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: "680px", margin: "0 auto" }}>
            Follow these step-by-step recipes to build secure, high-throughput, real-time Go backends using gsocketio.
          </p>
        </motion.div>

        {/* Main Grid: Steps List on Left, Active Step Code on Right */}
        <div className="steps-grid">
          {/* Step Selector Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {STEP_BY_STEP_DOCS.map((step, index) => {
              const isSelected = index === activeStepIndex;
              return (
                <motion.button
                  key={step.id}
                  onClick={() => setActiveStepIndex(index)}
                  whileHover={{ scale: 1.015, x: 3 }}
                  whileTap={{ scale: 0.985 }}
                  className="glass-panel"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px 20px",
                    textAlign: "left",
                    cursor: "pointer",
                    background: isSelected ? "rgba(99, 102, 241, 0.15)" : "var(--bg-card)",
                    borderColor: isSelected ? "var(--accent-indigo)" : "var(--border-subtle)",
                    boxShadow: isSelected ? "0 0 25px rgba(99, 102, 241, 0.25)" : "none",
                    transition: "all 0.25s ease",
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      background: isSelected
                        ? "linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-indigo) 100%)"
                        : "rgba(255, 255, 255, 0.05)",
                      color: isSelected ? "#07090e" : "var(--text-secondary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "0.95rem",
                      flexShrink: 0,
                    }}
                  >
                    {step.number}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.98rem", color: isSelected ? "var(--accent-indigo)" : "var(--text-primary)", marginBottom: "3px" }}>
                      {step.title}
                    </div>
                    <div style={{ fontSize: "0.82rem", color: isSelected ? "var(--text-secondary)" : "var(--text-muted)", lineHeight: 1.35 }}>
                      {step.shortDesc}
                    </div>
                  </div>

                  <ChevronRight
                    size={18}
                    color={isSelected ? "var(--accent-cyan)" : "var(--text-muted)"}
                    style={{
                      transform: isSelected ? "translateX(4px)" : "none",
                      transition: "transform 0.2s ease",
                    }}
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
            style={{ position: "relative", minWidth: 0 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 12, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.99 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="glass-panel"
                style={{
                  padding: "clamp(18px, 3vw, 28px)",
                  background: "var(--bg-card)",
                  borderColor: "var(--border-active)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {/* Step Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                  <span className="badge badge-cyan" style={{ fontSize: "0.82rem", fontWeight: 700 }}>
                    Step {activeStep.number}
                  </span>
                  <h3 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.4rem)", fontWeight: 800, color: "var(--text-primary)" }}>{activeStep.title}</h3>
                </div>

                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "20px" }}>
                  {activeStep.summary}
                </p>

                {/* Code Block */}
                <div style={{ marginBottom: "22px" }}>
                  <CodeBlock code={activeStep.code} filename={activeStep.filename} language={activeStep.language} />
                </div>

                {/* Key Takeaways */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: activeStep.tips ? "16px" : "0" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Key Takeaways
                  </div>
                  {activeStep.highlights.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                      <CheckCircle2 size={16} color="var(--accent-emerald)" style={{ marginTop: "3px", flexShrink: 0 }} />
                      <span style={{ lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Pro Tip if any */}
                {activeStep.tips && (
                  <div
                    style={{
                      marginTop: "18px",
                      padding: "12px 16px",
                      background: "rgba(245, 158, 11, 0.09)",
                      border: "1px solid rgba(245, 158, 11, 0.3)",
                      borderRadius: "var(--radius-sm)",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "0.86rem",
                      color: "#fde68a",
                    }}
                  >
                    <Lightbulb size={18} color="var(--accent-amber)" style={{ flexShrink: 0 }} />
                    <span style={{ lineHeight: 1.4 }}>{activeStep.tips[0]}</span>
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
