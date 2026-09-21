"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ArrowRight,
  BookOpen,
  Layers,
  Code2,
  Terminal,
  ExternalLink,
  Sparkles,
  CornerDownLeft,
} from "lucide-react";
import { SEARCH_INDEX, SearchItem } from "@/lib/search-index";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Filter items based on search query
  const filteredResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return SEARCH_INDEX.slice(0, 8); // default suggestions
    }

    return SEARCH_INDEX.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(trimmed);
      const matchDesc = item.description.toLowerCase().includes(trimmed);
      const matchCategory = item.category.toLowerCase().includes(trimmed);
      const matchKeywords = item.keywords.some((kw) => kw.toLowerCase().includes(trimmed));
      return matchTitle || matchDesc || matchCategory || matchKeywords;
    });
  }, [query]);

  // Keyboard navigation inside modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1 < filteredResults.length ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredResults.length - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          handleSelect(filteredResults[selectedIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, onClose]);

  // Auto scroll active item into view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  const handleSelect = (item: SearchItem) => {
    onClose();
    if (item.isExternal) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      if (item.href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.querySelector(item.href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.hash = item.href;
        }
      }
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Guides":
        return <BookOpen size={15} className="text-[var(--accent-cyan)]" />;
      case "Client SDKs":
        return <Layers size={15} className="text-[var(--accent-purple)]" />;
      case "API Reference":
        return <Code2 size={15} className="text-[var(--accent-blue)]" />;
      case "Protocol":
        return <Terminal size={15} className="text-[var(--accent-amber)]" />;
      case "Community":
        return <ExternalLink size={15} className="text-[var(--accent-emerald)]" />;
      default:
        return <Sparkles size={15} className="text-[var(--accent-indigo)]" />;
    }
  };

  const popularTags = [
    { label: "Quickstart", q: "minimal" },
    { label: "Auth", q: "auth" },
    { label: "Rooms", q: "rooms" },
    { label: "Binary", q: "binary" },
    { label: "React", q: "react" },
    { label: "API", q: "api" },
    { label: "Portfolio", q: "portfolio" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Header Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-glass)]">
              <Search size={20} className="text-[var(--accent-cyan)] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search documentation, guides, APIs, SDKs, or protocols... (Press Esc to close)"
                className="w-full bg-transparent border-none text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm sm:text-base outline-none focus:ring-0"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1 text-[10px] font-semibold text-[var(--text-muted)] bg-white/5 px-2 py-1 rounded border border-[var(--border-subtle)]">
                <span>ESC</span>
              </div>
            </div>

            {/* Quick Filter Tags */}
            <div className="flex items-center gap-1.5 px-4 py-2 bg-white/[0.02] border-b border-[var(--border-subtle)] overflow-x-auto text-xs scrollbar-none">
              <span className="text-[var(--text-muted)] text-[11px] font-medium mr-1 shrink-0">
                Trending:
              </span>
              {popularTags.map((tag) => (
                <button
                  key={tag.label}
                  type="button"
                  onClick={() => {
                    setQuery(tag.q);
                    inputRef.current?.focus();
                  }}
                  className="px-2 py-0.5 rounded-full bg-white/5 hover:bg-[var(--accent-indigo)]/20 hover:text-[var(--accent-cyan)] text-[var(--text-secondary)] border border-[var(--border-subtle)] transition-colors shrink-0 text-[11px] cursor-pointer"
                >
                  {tag.label}
                </button>
              ))}
            </div>

            {/* Results Container */}
            <div
              ref={resultsContainerRef}
              className="overflow-y-auto p-2.5 flex flex-col gap-1.5 flex-1 min-h-[180px] max-h-[380px]"
            >
              {filteredResults.length > 0 ? (
                filteredResults.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      data-index={index}
                      type="button"
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between gap-3 cursor-pointer border ${
                        isSelected
                          ? "bg-[var(--bg-tertiary)] border-[var(--border-active)] shadow-sm"
                          : "bg-transparent border-transparent hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg shrink-0 mt-0.5 border ${
                            isSelected
                              ? "bg-white/10 border-[var(--border-active)]"
                              : "bg-white/5 border-[var(--border-subtle)]"
                          }`}
                        >
                          {getCategoryIcon(item.category)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <span
                              className={`font-semibold text-sm ${
                                isSelected ? "text-[var(--accent-cyan)]" : "text-[var(--text-primary)]"
                              }`}
                            >
                              {item.title}
                            </span>
                            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/5 text-[var(--text-muted)] border border-[var(--border-subtle)]">
                              {item.category}
                            </span>
                            {item.badge && (
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[var(--accent-indigo)]/15 text-[var(--accent-indigo)] border border-[var(--accent-indigo)]/30">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[var(--text-secondary)] line-clamp-1 leading-relaxed m-0">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5 self-center">
                        {isSelected && (
                          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[var(--accent-cyan)] font-medium">
                            <span>Open</span>
                            <CornerDownLeft size={12} />
                          </span>
                        )}
                        {item.isExternal ? (
                          <ExternalLink size={14} className="text-[var(--text-muted)]" />
                        ) : (
                          <ArrowRight
                            size={14}
                            className={isSelected ? "text-[var(--accent-cyan)]" : "text-[var(--text-muted)]"}
                          />
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="py-12 px-4 text-center">
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
                    No matching documentation found
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Try searching for &quot;minimal&quot;, &quot;rooms&quot;, &quot;auth&quot;, &quot;react&quot;, or &quot;api&quot;.
                  </p>
                </div>
              )}
            </div>

            {/* Footer Navigation Hints */}
            <div className="px-4 py-2.5 bg-[var(--bg-glass)] border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-[var(--border-subtle)] font-mono">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-[var(--border-subtle)] font-mono">↓</kbd>
                  <span>to navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-[var(--border-subtle)] font-mono">↵</kbd>
                  <span>to select</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-[var(--border-subtle)] font-mono">esc</kbd>
                  <span>to close</span>
                </span>
              </div>
              <div className="hidden sm:block text-[var(--accent-cyan)] font-medium">
                Pure Go Socket.IO v4
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
