"use client";

import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  badge?: string;
  glow?: boolean;
}

export default function Logo({
  size = 36,
  className = "",
  showText = false,
  badge,
  glow = true,
}: LogoProps) {
  return (
    <div
      className={`gosocketio-logo-wrapper ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        userSelect: "none",
        textDecoration: "none",
      }}
    >
      {/* Emblem SVG */}
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          position: "relative",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox="0 0 128 128"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: glow ? "drop-shadow(0 0 14px rgba(0, 242, 254, 0.45))" : "none",
            transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease",
          }}
          className="gosocketio-emblem"
        >
          <defs>
            {/* Background Gradient */}
            <linearGradient id="logo-emblem-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0b1120" />
              <stop offset="50%" stopColor="#07090e" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Border Gradient */}
            <linearGradient id="logo-emblem-border" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.9" />
            </linearGradient>

            {/* Cyan-Purple Gradient */}
            <linearGradient id="logo-emblem-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe" />
              <stop offset="45%" stopColor="#38bdf8" />
              <stop offset="80%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            {/* Lightning Spark Gradient */}
            <linearGradient id="logo-emblem-spark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#00f2fe" />
            </linearGradient>

            {/* Ambient Glow Filter */}
            <filter id="logo-emblem-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Squircle Glass Background */}
          <rect
            x="5"
            y="5"
            width="118"
            height="118"
            rx="28"
            fill="url(#logo-emblem-bg)"
            stroke="url(#logo-emblem-border)"
            strokeWidth="2.5"
          />

          {/* Ambient Glows */}
          <circle cx="64" cy="64" r="34" fill="#00f2fe" opacity="0.16" filter="url(#logo-emblem-glow)" />
          <circle cx="80" cy="64" r="24" fill="#818cf8" opacity="0.16" filter="url(#logo-emblem-glow)" />

          {/* Outer 'G' Socket Track */}
          <path
            d="M 88 44
               A 38 38 0 1 0 88 84
               L 88 74
               A 28 28 0 1 1 88 54"
            fill="none"
            stroke="url(#logo-emblem-grad)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 'G' Crossbar & Socket Connection Port */}
          <path
            d="M 60 64 L 94 64"
            stroke="url(#logo-emblem-grad)"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Lightning Duplex Spark */}
          <path
            d="M 67 36 L 55 60 L 69 60 L 59 90 L 81 56 L 69 56 Z"
            fill="url(#logo-emblem-spark)"
            filter="url(#logo-emblem-glow)"
            opacity="0.95"
          />

          {/* Real-time Socket Connection Nodes */}
          <circle cx="96" cy="42" r="5" fill="#00f2fe" filter="url(#logo-emblem-glow)" />
          <circle cx="96" cy="86" r="5" fill="#a855f7" filter="url(#logo-emblem-glow)" />
          <circle cx="106" cy="64" r="3.5" fill="#38bdf8" opacity="0.9" />
        </svg>
      </div>

      {/* Brand Name Typography */}
      {showText && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontWeight: 800,
              fontSize: size > 32 ? "1.25rem" : "1.1rem",
              letterSpacing: "-0.025em",
              color: "var(--text-primary)",
              lineHeight: 1,
            }}
          >
            g<span className="gradient-cyan-purple">socketio</span>
          </span>

          {badge && (
            <span
              className="badge badge-cyan"
              style={{
                fontSize: "0.7rem",
                padding: "2px 8px",
                lineHeight: "1.2",
              }}
            >
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
