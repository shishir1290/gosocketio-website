"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, PanelLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/DocsSidebar";
import SearchModal from "@/components/SearchModal";
import Footer from "@/components/Footer";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Global keyboard shortcut for Search (Ctrl+K or Cmd+K or /)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if focus is inside an input, textarea or contenteditable
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === "/" && !isInput && !searchOpen) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [searchOpen]);

  // Lock scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileSidebarOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Top Navbar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => {
          if (window.innerWidth < 1024) {
            setMobileSidebarOpen((prev) => !prev);
          } else {
            setSidebarOpen((prev) => !prev);
          }
        }}
      />

      {/* Main Container Layout with Sidebar & Content */}
      <div className="pt-16 flex-1 flex w-full relative">
        {/* Desktop Sticky Sidebar (TanStack Docs Style) with Smooth Slide Animation */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block w-64 xl:w-72 shrink-0 border-r border-[var(--border-subtle)] bg-[var(--bg-primary)]/90 backdrop-blur-md sticky top-16 h-[calc(100vh-4rem)] overflow-hidden z-20"
            >
              <div className="w-64 xl:w-72 h-full">
                <DocsSidebar />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Mobile Slide-Out Sidebar Drawer */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              />

              {/* Sidebar Sheet */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-80 max-w-[85vw] h-full bg-[var(--bg-secondary)] border-r border-[var(--border-subtle)] shadow-2xl flex flex-col z-10"
              >
                {/* Header in mobile drawer */}
                <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2">
                    <PanelLeft size={18} className="text-[var(--accent-cyan)]" />
                    <span className="font-bold text-sm text-[var(--text-primary)]">
                      Documentation Index
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors cursor-pointer"
                    aria-label="Close sidebar"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Sidebar Navigation */}
                <div className="flex-1 overflow-hidden">
                  <DocsSidebar
                    onOpenSearch={() => {
                      setMobileSidebarOpen(false);
                      setSearchOpen(true);
                    }}
                    mobileOpen={mobileSidebarOpen}
                    onCloseMobile={() => setMobileSidebarOpen(false)}
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 flex flex-col overflow-x-hidden">
          <div className="flex-1">{children}</div>
          <Footer />
        </main>
      </div>

      {/* Quick Search Modal Command Palette */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
