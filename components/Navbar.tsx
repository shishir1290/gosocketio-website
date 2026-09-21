"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Terminal,
  Layers,
  Play,
  Github,
  Star,
  Menu,
  X,
  Code2,
  GitBranch,
  Search,
  PanelLeftClose,
  PanelLeft,
  Globe,
} from "lucide-react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import PortfolioLink from "@/components/PortfolioLink";

interface NavbarProps {
  onOpenSearch: () => void;
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export default function Navbar({
  onOpenSearch,
  sidebarOpen = true,
  onToggleSidebar,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#steps", label: "Guide", icon: BookOpen, aria: "Implementation Guide" },
    { href: "#clients", label: "Multi-Client", icon: Layers, aria: "Cross Platform Client SDKs" },
    { href: "#architecture", label: "Architecture", icon: GitBranch, aria: "Architecture Flow" },
    { href: "#protocol", label: "Protocol", icon: Terminal, aria: "Wire Protocol" },
    { href: "#playground", label: "Simulator", icon: Play, aria: "Live Simulator" },
    { href: "#api", label: "API Docs", icon: Code2, aria: "API Reference" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[var(--border-subtle)] backdrop-blur-xl ${
        scrolled ? "bg-[var(--bg-nav)] shadow-md" : "bg-[var(--bg-glass)]"
      }`}
    >
      <div className="w-full px-3 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-2 sm:gap-4">
        {/* Left Side: Sidebar Toggle & Brand */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {onToggleSidebar && (
            <motion.button
              type="button"
              onClick={onToggleSidebar}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.86, rotate: sidebarOpen ? -12 : 12 }}
              transition={{ type: "spring", stiffness: 450, damping: 20 }}
              className={`relative flex items-center justify-center p-2 rounded-xl border transition-all cursor-pointer shrink-0 ${
                sidebarOpen
                  ? "bg-white/[0.04] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)] hover:border-[var(--accent-cyan)]/50 hover:bg-white/[0.08]"
                  : "bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] border-[var(--accent-cyan)]/40 shadow-[0_0_15px_rgba(0,242,254,0.25)]"
              }`}
              title={sidebarOpen ? "Collapse sidebar (Hide menu)" : "Expand sidebar (Show menu)"}
              aria-label="Toggle Sidebar"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={sidebarOpen ? "open" : "closed"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  {sidebarOpen ? (
                    <PanelLeftClose size={18} className="hidden lg:block" />
                  ) : (
                    <PanelLeft size={18} className="hidden lg:block text-[var(--accent-cyan)]" />
                  )}
                  <PanelLeft size={18} className="lg:hidden text-[var(--accent-cyan)]" />
                </motion.div>
              </AnimatePresence>
            </motion.button>
          )}

          <Link
            href="/"
            className="inline-flex items-center no-underline shrink-0"
            onClick={handleLinkClick}
          >
            <Logo size={28} showText={true} badge="v1.0.4" />
          </Link>
        </div>

        {/* Center: Desktop Navigation Links (Only shown on 2xl where width permits without wrapping) */}
        <nav className="hidden 2xl:flex items-center gap-5 shrink-0" aria-label="Main Navigation">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.aria}
                className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-medium transition-colors whitespace-nowrap"
              >
                <Icon size={14} className="text-[var(--text-muted)]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Search, Portfolio, GitHub, Theme */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Quick Search Button */}
          <motion.button
            type="button"
            onClick={onOpenSearch}
            whileHover={{ scale: 1.04, borderColor: "rgba(0, 242, 254, 0.4)" }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex items-center justify-between gap-2 sm:gap-3 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/50 transition-all text-xs text-[var(--text-secondary)] cursor-pointer group shadow-sm shrink-0 whitespace-nowrap"
            aria-label="Search documentation"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] whitespace-nowrap">
              <Search size={14} className="text-[var(--accent-cyan)] shrink-0" />
              <span className="hidden md:inline font-medium">Search docs...</span>
              <span className="inline md:hidden font-medium">Search</span>
            </div>
            <div className="hidden sm:flex items-center gap-0.5 font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-[var(--border-subtle)] text-[var(--text-muted)] shrink-0">
              <span>Ctrl</span>
              <span>K</span>
            </div>
          </motion.button>

          {/* Developer Portfolio Link */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="hidden md:block shrink-0"
          >
            <PortfolioLink className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold text-[var(--accent-amber)] bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 transition-all no-underline inline-flex items-center gap-1.5 shadow-sm whitespace-nowrap shrink-0">
              <Globe size={13} className="shrink-0" />
              <span>Portfolio</span>
            </PortfolioLink>
          </motion.div>

          {/* GitHub Star Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="hidden sm:block shrink-0"
          >
            <a
              href="https://github.com/shishir1290/gsocketio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Star gsocketio on GitHub"
              className="btn-secondary py-1.5 sm:py-2 px-3 text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Github size={14} className="shrink-0" />
              <span className="hidden xl:inline">GitHub</span>
              <span className="flex items-center gap-0.5 text-[var(--accent-amber)]">
                <Star size={12} fill="currentColor" />
              </span>
            </a>
          </motion.div>

          {/* Theme Toggle */}
          <div className="shrink-0">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button (Below 2xl when top nav links are in drawer) */}
          <motion.button
            type="button"
            className="flex 2xl:hidden items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 border border-[var(--border-subtle)] text-[var(--text-primary)] cursor-pointer shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
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
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-[var(--bg-nav)] backdrop-blur-2xl border-b border-[var(--border-subtle)] 2xl:hidden"
          >
            <div className="p-4 sm:p-6 flex flex-col gap-3">
              {/* Quick Search on Mobile */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-[var(--border-subtle)] text-sm text-[var(--text-secondary)] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Search size={16} className="text-[var(--accent-cyan)]" />
                  <span>Search documentation...</span>
                </div>
                <span className="text-xs font-mono bg-white/5 px-2 py-0.5 rounded text-[var(--text-muted)]">
                  Ctrl K
                </span>
              </button>

              <div className="flex flex-col gap-1.5">
                {navLinks.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <Link
                        href={item.href}
                        onClick={handleLinkClick}
                        className="flex items-center gap-3 p-2.5 rounded-lg text-[var(--text-primary)] text-sm font-semibold bg-white/[0.02] border border-[var(--border-subtle)] hover:border-[var(--border-active)] transition-colors no-underline"
                      >
                        <span className="text-[var(--accent-cyan)] flex">
                          <Icon size={16} />
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile Portfolio & GitHub Actions */}
              <div className="pt-2 flex flex-col gap-2">
                <PortfolioLink className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-[var(--accent-amber)] no-underline">
                  <Globe size={15} />
                  <span>Developer Portfolio (shishir.click)</span>
                </PortfolioLink>

                <a
                  href="https://github.com/shishir1290/gsocketio"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="btn-primary w-full justify-center py-2.5 text-xs"
                >
                  <Github size={16} />
                  <span>Star on GitHub</span>
                  <Star size={13} fill="currentColor" className="text-[var(--accent-amber)]" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
