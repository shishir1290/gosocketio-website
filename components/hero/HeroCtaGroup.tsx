"use client";

import { useState } from "react";
import { ArrowRight, Check, Copy, Radio } from "lucide-react";
import confetti from "canvas-confetti";
import { copyToClipboard } from "@/lib/clipboard";

export function HeroCtaGroup() {
  const [copied, setCopied] = useState(false);

  const handleCopyCmd = async () => {
    await copyToClipboard("go get github.com/shishir1290/gsocketio@latest");
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#00f2fe", "#4facfe", "#6366f1"],
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="hero-cta-group flex flex-col items-center gap-5 mb-14">
      <div
        onClick={handleCopyCmd}
        className="inline-flex items-center gap-3 px-4 py-2 bg-[var(--bg-glass)] border border-[var(--border-active)] rounded-full cursor-pointer shadow-[var(--shadow-cyan-glow)] transition-all duration-250 max-w-full hover:border-[var(--accent-cyan)]"
      >
        <span className="text-[var(--accent-cyan)] font-mono text-sm font-semibold">$</span>
        <code className="text-[var(--text-primary)] text-xs sm:text-sm font-mono truncate">
          go get github.com/shishir1290/gsocketio@latest
        </code>
        <button
          type="button"
          aria-label="Copy installation command"
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full shrink-0 transition-colors ${
            copied
              ? "bg-emerald-500/20 text-[var(--accent-emerald)]"
              : "bg-indigo-500/15 text-[var(--text-primary)] hover:bg-indigo-500/25"
          }`}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-3.5">
        <a href="#steps" className="btn-primary">
          <span>Explore Step-by-Step Guide</span>
          <ArrowRight size={17} />
        </a>
        <a href="#playground" className="btn-secondary">
          <Radio size={17} className="text-[var(--accent-cyan)]" />
          <span>Launch Live Simulator</span>
        </a>
      </div>
    </div>
  );
}
