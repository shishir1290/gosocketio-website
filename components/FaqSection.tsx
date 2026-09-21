"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";
import { FAQ_ITEMS } from "./faq/faq-data";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="pt-4 md:pt-6 pb-14 md:pb-20 relative">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <div className="badge badge-cyan mb-3.5 inline-flex items-center gap-1.5">
            <HelpCircle size={13} />
            <span>Developer Questions & Technical Answers</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-[var(--text-primary)]">
            Frequently Asked <span className="gradient-cyan-purple">Questions</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
            Everything you need to know about integrating, scaling, and deploying gsocketio in production Go environments.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`glass-panel rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? "bg-[var(--bg-card)] border-[var(--border-active)] shadow-lg shadow-cyan-500/5"
                    : "bg-white/[0.02] border-[var(--border-subtle)] hover:border-[var(--border-active)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="badge badge-cyan text-[10px] uppercase font-bold tracking-wider shrink-0">
                      {item.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] leading-snug">
                      {item.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-[var(--accent-cyan)]"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-white/5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
