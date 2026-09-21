"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, Github, Star } from "lucide-react";
import PortfolioLink from "@/components/PortfolioLink";
import { NAV_LINKS } from "./nav-links";

interface NavMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export function NavMobileDrawer({
  isOpen,
  onClose,
  onOpenSearch,
}: NavMobileDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden bg-[var(--bg-nav)] backdrop-blur-2xl border-b border-[var(--border-subtle)] 2xl:hidden"
        >
          <div className="p-4 sm:p-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
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
              {NAV_LINKS.map((item, idx) => {
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
                      onClick={onClose}
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

            <div className="pt-2 flex flex-col gap-2">
              <PortfolioLink className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-[var(--accent-amber)] no-underline">
                <Globe size={15} />
                <span>Developer Portfolio (shishir.click)</span>
              </PortfolioLink>

              <a
                href="https://github.com/shishir1290/gsocketio"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
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
  );
}
