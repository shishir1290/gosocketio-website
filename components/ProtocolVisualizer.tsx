"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Cpu, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";
import { PROTOCOL_STEPS } from "./protocol/protocol-data";
import { ProtocolOrbitWheel } from "./protocol/ProtocolOrbitWheel";
import { ProtocolCenterHub } from "./protocol/ProtocolCenterHub";
import { ProtocolWireTerminal } from "./protocol/ProtocolWireTerminal";

export default function ProtocolVisualizer() {
  const [activeStep, setActiveStep] = useState(0);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const stepAngle = 360 / PROTOCOL_STEPS.length;

  const goToStep = (targetIndex: number) => {
    setActiveStep((currentStep) => {
      if (currentStep === targetIndex) return currentStep;
      const total = PROTOCOL_STEPS.length;
      let diff = ((targetIndex - currentStep) % total + total) % total;
      if (diff > total / 2) {
        diff -= total;
      }
      setWheelRotation((prevRotation) => prevRotation - diff * stepAngle);
      return targetIndex;
    });
  };

  const nextStep = () => {
    setActiveStep((currentStep) => {
      const next = (currentStep + 1) % PROTOCOL_STEPS.length;
      setWheelRotation((prev) => prev - stepAngle);
      return next;
    });
  };

  const prevStep = () => {
    setActiveStep((currentStep) => {
      const prev = (currentStep - 1 + PROTOCOL_STEPS.length) % PROTOCOL_STEPS.length;
      setWheelRotation((rot) => rot + stepAngle);
      return prev;
    });
  };

  useEffect(() => {
    if (isPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextStep();
      }, 3500);
    } else {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPlaying, stepAngle]);

  const handleCopy = async () => {
    await copyToClipboard(PROTOCOL_STEPS[activeStep].wire);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentStep = PROTOCOL_STEPS[activeStep];

  return (
    <section id="protocol" className="pt-4 md:pt-6 pb-14 md:pb-20 relative overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8"
        >
          <div className="badge badge-cyan mb-3.5 inline-flex items-center gap-1.5">
            <Cpu size={13} />
            <span>Wire Protocol Architecture</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-[var(--text-primary)]">
            Engine.IO v4 <span className="gradient-cyan-purple">Wire Lifecycle</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
            Interactive dual-arrow circular visualizer: follow the cyclic RFC 6455 and Engine.IO state machine.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex items-center justify-between w-full max-w-lg mb-6 px-4 py-2.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-md z-20">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevStep}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] transition-colors cursor-pointer"
                title="Previous step"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] transition-colors cursor-pointer"
                title="Next step"
              >
                <ChevronRight size={16} />
              </button>
              <span className="text-xs font-mono text-[var(--text-muted)] ml-1">
                Active: <span className="text-[var(--accent-cyan)] font-bold">Step {activeStep + 1}</span> of {PROTOCOL_STEPS.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                isPlaying
                  ? "bg-cyan-500/20 text-[var(--accent-cyan)] border-cyan-500/40 shadow-sm shadow-cyan-500/20"
                  : "bg-white/5 text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]"
              }`}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
              <span>{isPlaying ? "Pause Rotation" : "Auto-Rotate"}</span>
            </button>
          </div>

          <div className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] lg:w-[540px] lg:h-[540px] flex items-center justify-center select-none">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/15 via-indigo-500/10 to-pink-500/15 blur-3xl pointer-events-none" />

            <ProtocolOrbitWheel
              steps={PROTOCOL_STEPS}
              activeStep={activeStep}
              onSelectStep={goToStep}
              wheelRotation={wheelRotation}
              stepAngle={stepAngle}
            />

            <ProtocolCenterHub
              currentStep={currentStep}
              activeStep={activeStep}
              copied={copied}
              onCopy={handleCopy}
            />
          </div>

          <ProtocolWireTerminal
            steps={PROTOCOL_STEPS}
            activeStep={activeStep}
            currentStep={currentStep}
            copied={copied}
            onCopy={handleCopy}
            onSelectStep={goToStep}
          />
        </div>
      </div>
    </section>
  );
}
