"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Terminal,
  Layers,
  Play,
  Github,
  Code2,
  ExternalLink,
  GitBranch,
  Home,
  Cpu,
  Globe,
  Radio,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import PortfolioLink from "@/components/PortfolioLink";

interface DocsSidebarProps {
  onOpenSearch?: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function DocsSidebar({ onCloseMobile }: DocsSidebarProps) {
  const [activeSection, setActiveSection] = useState<string>("home");
  const isClickScrolling = useRef(false);

  // Track active section via scroll with debouncing / click priority
  useEffect(() => {
    const sections = [
      { id: "hero", navId: "home" },
      { id: "steps", navId: "steps" },
      { id: "clients", navId: "clients" },
      { id: "architecture", navId: "architecture" },
      { id: "protocol", navId: "protocol" },
      { id: "playground", navId: "playground" },
      { id: "api", navId: "api" },
    ];

    const handleScroll = () => {
      if (isClickScrolling.current) return;

      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.id === "hero") {
          if (window.scrollY < 300) {
            setActiveSection("home");
            break;
          }
        } else {
          const el = document.getElementById(section.id);
          if (el) {
            const top = el.offsetTop;
            if (scrollPosition >= top) {
              setActiveSection(section.navId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (id: string, hash: string) => {
    setActiveSection(id);
    isClickScrolling.current = true;
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);

    if (onCloseMobile) onCloseMobile();
    if (hash === "#" || hash === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navMenuItems = [
    { href: "#", label: "Overview", id: "home", icon: Home },
    { href: "#steps", label: "Guide Recipes", id: "steps", icon: BookOpen },
    {
      href: "#clients",
      label: "Multi-Client SDKs",
      id: "clients",
      icon: Layers,
    },
    {
      href: "#architecture",
      label: "Architecture Flow",
      id: "architecture",
      icon: GitBranch,
    },
    {
      href: "#protocol",
      label: "Wire Protocol",
      id: "protocol",
      icon: Terminal,
    },
    {
      href: "#playground",
      label: "Live Simulator",
      id: "playground",
      icon: Play,
    },
    { href: "#api", label: "Go API Reference", id: "api", icon: Code2 },
  ];

  const guideSubItems = [
    { href: "#steps", label: "01. Installation & Module", icon: Zap },
    { href: "#steps", label: "02. Minimal Server & SIO", icon: CheckCircle2 },
    { href: "#steps", label: "03. Auth & Context Handling", icon: ShieldCheck },
    { href: "#steps", label: "04. Namespaces & Routing", icon: Radio },
    { href: "#steps", label: "05. Rooms & Broadcasting", icon: Radio },
    { href: "#steps", label: "06. Event Acknowledgment", icon: CheckCircle2 },
    { href: "#steps", label: "07. Binary Buffers", icon: Sparkles },
    { href: "#steps", label: "08. Production Config", icon: Cpu },
  ];

  const clientLanguages = [
    { label: "JavaScript / TypeScript", tag: "React / Node", href: "#clients" },
    { label: "Python Socket.IO", tag: "AsyncIO", href: "#clients" },
    { label: "Flutter & Dart", tag: "Mobile SDK", href: "#clients" },
    { label: "Swift (iOS / macOS)", tag: "Native Swift", href: "#clients" },
    { label: "Kotlin (Android)", tag: "Coroutines", href: "#clients" },
    { label: "Unity (C#)", tag: "Game Engine", href: "#clients" },
  ];

  return (
    <aside className="w-full h-full flex flex-col justify-between py-5 px-3.5 select-none overflow-y-auto custom-scrollbar">
      <div className="flex flex-col gap-5">
        {/* Framework & Version Badges */}
        <div className="flex flex-col gap-2">
          {/* Framework Pill Box */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-[var(--border-subtle)]">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-[var(--accent-cyan)]/15 border border-[var(--accent-cyan)]/30 flex items-center justify-center text-[var(--accent-cyan)] font-bold text-xs">
                Go
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[var(--text-primary)]">
                  Pure Go Library
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">
                  Engine.IO v4 • RFC 6455
                </span>
              </div>
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[var(--accent-emerald)]/15 text-[var(--accent-emerald)] font-bold">
              v1.0.4
            </span>
          </div>
        </div>

        {/* Primary MENU Section */}
        <div>
          <div className="text-[10.5px] font-bold text-[var(--text-muted)] uppercase tracking-wider px-2 mb-2">
            Documentation Menu
          </div>
          <nav className="flex flex-col gap-0.5">
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => handleLinkClick(item.id, item.href)}
                  className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors no-underline ${
                    isActive
                      ? "text-[var(--accent-amber)] font-bold"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.03]"
                  }`}
                >
                  {/* Framer Motion Gliding Active Indicator Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSidebarHighlight"
                      className="absolute inset-0 rounded-xl bg-amber-500/12 border border-amber-500/30 -z-10 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Left Accent Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSidebarBar"
                      className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[var(--accent-amber)] shadow-[0_0_10px_rgba(245,158,11,0.6)]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  <div className="flex items-center gap-2.5 z-10">
                    <Icon
                      size={15}
                      className={
                        isActive
                          ? "text-[var(--accent-amber)]"
                          : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
                      }
                    />
                    <span>{item.label}</span>
                  </div>

                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-1.5 h-1.5 rounded-full bg-[var(--accent-amber)] shadow-[0_0_6px_rgba(245,158,11,0.8)] z-10"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* GUIDES Section */}
        <div>
          <div className="text-[10.5px] font-bold text-[var(--text-muted)] uppercase tracking-wider px-2 mb-2 flex items-center justify-between">
            <span>Guides & Recipes</span>
            <span className="text-[10px] font-mono text-[var(--accent-cyan)]">
              8 Topics
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            {guideSubItems.map((guide, idx) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={idx}
                  href={guide.href}
                  onClick={() => handleLinkClick("steps", guide.href)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11.5px] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-white/[0.03] transition-colors no-underline group"
                >
                  <Icon
                    size={12}
                    className="text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] shrink-0"
                  />
                  <span className="truncate">{guide.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* CLIENT ECOSYSTEM Section */}
        <div>
          <div className="text-[10.5px] font-bold text-[var(--text-muted)] uppercase tracking-wider px-2 mb-2 flex items-center justify-between">
            <span>Client SDKs</span>
            <span className="text-[10px] font-mono text-[var(--accent-purple)]">
              6 SDKs
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            {clientLanguages.map((client, idx) => (
              <Link
                key={idx}
                href={client.href}
                onClick={() => handleLinkClick("clients", client.href)}
                className="flex items-center justify-between px-3 py-1.5 rounded-lg text-[11.5px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.03] transition-colors no-underline group"
              >
                <span className="truncate group-hover:text-[var(--accent-purple)] transition-colors">
                  {client.label}
                </span>
                <span className="text-[9.5px] font-mono text-[var(--text-muted)] bg-white/5 px-1.5 py-0.2 rounded shrink-0">
                  {client.tag}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER & DEVELOPER PORTFOLIO */}
      <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex flex-col gap-1.5">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] px-2">
          Ecosystem
        </div>

        <a
          href="https://github.com/shishir1290/gsocketio"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors no-underline"
        >
          <div className="flex items-center gap-2">
            <Github size={14} />
            <span>GitHub</span>
          </div>
          <ExternalLink size={12} className="text-[var(--text-muted)]" />
        </a>

        <a
          href="https://pkg.go.dev/github.com/shishir1290/gsocketio"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors no-underline"
        >
          <div className="flex items-center gap-2">
            <Code2 size={14} className="text-[var(--accent-cyan)]" />
            <span>pkg.go.dev Docs</span>
          </div>
          <ExternalLink size={12} className="text-[var(--text-muted)]" />
        </a>

        {/* Developer Portfolio Link */}
        <PortfolioLink className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--accent-amber)] hover:bg-amber-500/10 transition-all no-underline">
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-[var(--accent-amber)]" />
            <span className="font-semibold text-[var(--text-primary)]">
              Portfolio
            </span>
          </div>
          <span className="text-[10px] font-mono text-[var(--accent-amber)] bg-amber-500/15 px-1.5 py-0.2 rounded">
            shishir.click
          </span>
        </PortfolioLink>
      </div>
    </aside>
  );
}
