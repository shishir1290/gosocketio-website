"use client";

import { motion } from "framer-motion";
import { Search, Globe, Github, Star, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import PortfolioLink from "@/components/PortfolioLink";

interface NavActionButtonsProps {
  onOpenSearch: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export function NavActionButtons({
  onOpenSearch,
  mobileMenuOpen,
  onToggleMobileMenu,
}: NavActionButtonsProps) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
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

      <div className="shrink-0">
        <ThemeToggle />
      </div>

      <motion.button
        type="button"
        className="flex 2xl:hidden items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 border border-[var(--border-subtle)] text-[var(--text-primary)] cursor-pointer shrink-0"
        onClick={onToggleMobileMenu}
        whileTap={{ scale: 0.9 }}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
      </motion.button>
    </div>
  );
}
