"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { HeroBadge } from "./hero/HeroBadge";
import { HeroCtaGroup } from "./hero/HeroCtaGroup";
import { HeroStatsCards } from "./hero/HeroStatsCards";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".hero-badge", { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 })
        .fromTo(".hero-title", { y: 15 }, { y: 0, duration: 0.5, clearProps: "all" }, "-=0.2")
        .fromTo(".hero-sub", { y: 15 }, { y: 0, duration: 0.5, clearProps: "all" }, "-=0.3")
        .fromTo(".hero-cta-group", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, "-=0.25")
        .fromTo(
          ".hero-stats-card",
          { scale: 0.96, opacity: 0, y: 15 },
          { scale: 1, opacity: 1, y: 0, stagger: 0.08, duration: 0.5, clearProps: "all" },
          "-=0.2"
        );

      gsap.to(".floating-indicator", {
        y: -6,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative pt-6 md:pt-8 pb-12 md:pb-16 overflow-visible text-center"
    >
      <div className="hero-glow" />
      <div className="grid-overlay" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-[1240px]">
        <HeroBadge />

        <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] max-w-4xl mx-auto mb-5 text-[var(--text-primary)]">
          High-Performance <span className="gradient-cyan-purple">Socket.IO v4</span> Server Built Purely in Go
        </h1>

        <p className="hero-sub text-base sm:text-lg text-[var(--text-secondary)] max-w-3xl mx-auto mb-8 leading-relaxed">
          Zero Gorilla. Zero external packages. Hand-crafted RFC 6455 WebSocket framing, Engine.IO v4 long-polling, 
          instant client connection upgrades, string & binary event broadcasting, thread-safe rooms, and sub-millisecond latencies.
        </p>

        <HeroCtaGroup />
        <HeroStatsCards />
      </div>
    </section>
  );
}
