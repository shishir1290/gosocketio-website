"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { BookOpen, Terminal, Layers, Play, Github, Star } from "lucide-react";
import Logo from "@/components/Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(7, 9, 14, 0.92)" : "rgba(7, 9, 14, 0.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        padding: scrolled ? "12px 0" : "16px 0",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Brand Logo */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <Logo size={36} showText={true} badge="v1.0.4" />
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "28px" }} aria-label="Main Navigation">
          <Link
            href="#steps"
            aria-label="Implementation Guide Tutorial"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "0.92rem",
              fontWeight: 500,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            <BookOpen size={16} /> Guide
          </Link>

          <Link
            href="#clients"
            aria-label="Cross Platform Client SDKs"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "0.92rem",
              fontWeight: 500,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            <Layers size={16} /> Multi-Client
          </Link>

          <Link
            href="#protocol"
            aria-label="Engine.IO Wire Protocol Specification"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "0.92rem",
              fontWeight: 500,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            <Terminal size={16} /> Protocol
          </Link>

          <Link
            href="#playground"
            aria-label="Interactive Live WebSocket Simulator"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "0.92rem",
              fontWeight: 500,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            <Play size={16} /> Simulator
          </Link>

          <Link
            href="#api"
            aria-label="Browse Go API Reference"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "0.92rem",
              fontWeight: 500,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            API Reference
          </Link>
        </nav>

        {/* GitHub Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a
            href="https://github.com/shishir1290/gsocketio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Star gsocketio on GitHub"
            className="btn-secondary"
            style={{ padding: "8px 16px", fontSize: "0.86rem" }}
          >
            <Github size={17} />
            <span>GitHub</span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--accent-amber)" }}>
              <Star size={13} fill="currentColor" />
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
