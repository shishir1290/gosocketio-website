"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Terminal, Layers, Play, Github, Star, Menu, X, Code2, ExternalLink } from "lucide-react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "#steps", label: "Guide", icon: BookOpen, aria: "Implementation Guide Tutorial" },
    { href: "#clients", label: "Multi-Client", icon: Layers, aria: "Cross Platform Client SDKs" },
    { href: "#protocol", label: "Protocol", icon: Terminal, aria: "Engine.IO Wire Protocol Specification" },
    { href: "#playground", label: "Simulator", icon: Play, aria: "Interactive Live WebSocket Simulator" },
    { href: "#api", label: "API Reference", icon: Code2, aria: "Browse Go API Reference" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        background: scrolled ? "var(--bg-nav)" : "var(--bg-glass)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border-subtle)",
        padding: scrolled ? "10px 0" : "14px 0",
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
          onClick={handleLinkClick}
        >
          <Logo size={34} showText={true} badge="v1.0.4" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "24px" }} aria-label="Main Navigation">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.aria}
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
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                <Icon size={16} /> {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Group: Theme Toggle & GitHub */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* GitHub Button (Desktop) */}
          <div className="desktop-nav">
            <a
              href="https://github.com/shishir1290/gsocketio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Star gsocketio on GitHub"
              className="btn-secondary"
              style={{ padding: "7px 15px", fontSize: "0.86rem", display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <Github size={16} />
              <span>GitHub</span>
              <span style={{ display: "flex", alignItems: "center", gap: "3px", color: "var(--accent-amber)" }}>
                <Star size={13} fill="currentColor" />
              </span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <motion.button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: "38px",
              height: "38px",
              borderRadius: "var(--radius-sm)",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-primary)",
              cursor: "pointer",
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              overflow: "hidden",
              background: "var(--bg-nav)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            <div className="container" style={{ padding: "20px 24px 28px 24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {navLinks.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={handleLinkClick}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "12px 16px",
                          borderRadius: "var(--radius-sm)",
                          color: "var(--text-primary)",
                          textDecoration: "none",
                          fontSize: "0.98rem",
                          fontWeight: 600,
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        <span style={{ color: "var(--accent-cyan)", display: "flex" }}>
                          <Icon size={18} />
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile CTA Buttons */}
              <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <a
                  href="https://github.com/shishir1290/gsocketio"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", padding: "12px" }}
                >
                  <Github size={18} />
                  <span>Star on GitHub</span>
                  <Star size={14} fill="currentColor" color="var(--accent-amber)" />
                </a>

                <a
                  href="https://pkg.go.dev/github.com/shishir1290/gsocketio"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="btn-secondary"
                  style={{ width: "100%", justifyContent: "center", padding: "11px" }}
                >
                  <ExternalLink size={16} />
                  <span>pkg.go.dev Documentation</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
