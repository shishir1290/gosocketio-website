"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PanelLeftClose, PanelLeft } from "lucide-react";
import Logo from "@/components/Logo";
import { NavDesktopLinks } from "./navbar/NavDesktopLinks";
import { NavActionButtons } from "./navbar/NavActionButtons";
import { NavMobileDrawer } from "./navbar/NavMobileDrawer";

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[var(--border-subtle)] backdrop-blur-xl ${
        scrolled ? "bg-[var(--bg-nav)] shadow-md" : "bg-[var(--bg-glass)]"
      }`}
    >
      <div className="w-full px-3 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-2 sm:gap-4">
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
            onClick={() => setMobileMenuOpen(false)}
          >
            <Logo size={28} showText={true} badge="v1.0.4" />
          </Link>
        </div>

        <NavDesktopLinks />

        <NavActionButtons
          onOpenSearch={onOpenSearch}
          mobileMenuOpen={mobileMenuOpen}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
      </div>

      <NavMobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenSearch={onOpenSearch}
      />
    </header>
  );
}
