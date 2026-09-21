"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SEARCH_INDEX, SearchItem } from "@/lib/search-index";
import { SearchHeader } from "./search/SearchHeader";
import { SearchResultsList } from "./search/SearchResultsList";
import { SearchFooter } from "./search/SearchFooter";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_TAGS = [
  { label: "Quickstart", q: "minimal" },
  { label: "Auth", q: "auth" },
  { label: "Rooms", q: "rooms" },
  { label: "Binary", q: "binary" },
  { label: "React", q: "react" },
  { label: "API", q: "api" },
  { label: "Portfolio", q: "portfolio" },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

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

  const filteredResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return SEARCH_INDEX.slice(0, 8);
    }
    return SEARCH_INDEX.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(trimmed);
      const matchDesc = item.description.toLowerCase().includes(trimmed);
      const matchCategory = item.category.toLowerCase().includes(trimmed);
      const matchKeywords = item.keywords.some((kw) => kw.toLowerCase().includes(trimmed));
      return matchTitle || matchDesc || matchCategory || matchKeywords;
    });
  }, [query]);

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

  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <SearchHeader
              query={query}
              onQueryChange={(q) => {
                setQuery(q);
                setSelectedIndex(0);
              }}
              inputRef={inputRef}
              popularTags={POPULAR_TAGS}
            />

            <SearchResultsList
              results={filteredResults}
              selectedIndex={selectedIndex}
              onSelectIndex={setSelectedIndex}
              onSelectItem={handleSelect}
              containerRef={resultsContainerRef}
            />

            <SearchFooter />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
