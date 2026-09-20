"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Terminal, Layers, Play, Github, Star, Menu, X, Code2, ExternalLink, GitBranch } from "lucide-react";
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
    { href: "#architecture", label: "Architecture", icon: GitBranch, aria: "gsocketio Architecture & Flow Graph" },
    { href: "#protocol", label: "Protocol", icon: Terminal, aria: "Engine.IO Wire Protocol Specification" },
    { href: "#playground", label: "Simulator", icon: Play, aria: "Interactive Live WebSocket Simulator" },
    { href: "#api", label: "API Reference", icon: Code2, aria: "Browse Go API Reference" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[var(--border-subtle)] backdrop-blur-xl ${
        scrolled ? "bg-[var(--bg-nav)] py-2.5 shadow-sm" : "bg-[var(--bg-glass)] py-3.5"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="inline-flex items-center no-underline"
          onClick={handleLinkClick}
        >
          <Logo size={34} showText={true} badge="v1.0.4" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.aria}
                className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-[0.92rem] font-medium transition-colors"
              >
                <Icon size={16} /> {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Group: Theme Toggle & GitHub */}
        <div className="flex items-center gap-2.5">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* GitHub Button (Desktop) */}
          <div className="hidden sm:block">
            <a
              href="https://github.com/shishir1290/gsocketio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Star gsocketio on GitHub"
              className="btn-secondary py-2 px-3.5 text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <Github size={15} />
              <span>GitHub</span>
              <span className="flex items-center gap-0.5 text-[var(--accent-amber)]">
                <Star size={13} fill="currentColor" />
              </span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <motion.button
            type="button"
            className="flex md:hidden items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-[var(--border-subtle)] text-[var(--text-primary)] cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
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
            className="overflow-hidden bg-[var(--bg-nav)] backdrop-blur-2xl border-b border-[var(--border-subtle)] md:hidden"
          >
            <div className="container py-5 px-4 sm:px-6">
              <div className="flex flex-col gap-2">
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
                        className="flex items-center gap-3 p-3 rounded-lg text-[var(--text-primary)] text-sm font-semibold bg-white/[0.03] border border-[var(--border-subtle)] hover:border-[var(--border-active)] transition-colors no-underline"
                      >
                        <span className="text-[var(--accent-cyan)] flex">
                          <Icon size={18} />
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="mt-5 flex flex-col gap-2.5">
                <a
                  href="https://github.com/shishir1290/gsocketio"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="btn-primary w-full justify-center py-3 text-sm"
                >
                  <Github size={18} />
                  <span>Star on GitHub</span>
                  <Star size={14} fill="currentColor" className="text-[var(--accent-amber)]" />
                </a>

                <a
                  href="https://pkg.go.dev/github.com/shishir1290/gsocketio"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="btn-secondary w-full justify-center py-2.5 text-sm"
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
