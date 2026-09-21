"use client";

import { RefObject } from "react";
import { Search, X } from "lucide-react";

interface SearchHeaderProps {
  query: string;
  onQueryChange: (q: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  popularTags: Array<{ label: string; q: string }>;
}

export function SearchHeader({
  query,
  onQueryChange,
  inputRef,
  popularTags,
}: SearchHeaderProps) {
  return (
    <>
      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-glass)]">
        <Search size={20} className="text-[var(--accent-cyan)] shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search documentation, guides, APIs, SDKs, or protocols... (Press Esc to close)"
          className="w-full bg-transparent border-none text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm sm:text-base outline-none focus:ring-0"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              onQueryChange("");
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

      <div className="flex items-center gap-1.5 px-4 py-2 bg-white/[0.02] border-b border-[var(--border-subtle)] overflow-x-auto text-xs scrollbar-none">
        <span className="text-[var(--text-muted)] text-[11px] font-medium mr-1 shrink-0">
          Trending:
        </span>
        {popularTags.map((tag) => (
          <button
            key={tag.label}
            type="button"
            onClick={() => {
              onQueryChange(tag.q);
              inputRef.current?.focus();
            }}
            className="px-2 py-0.5 rounded-full bg-white/5 hover:bg-[var(--accent-indigo)]/20 hover:text-[var(--accent-cyan)] text-[var(--text-secondary)] border border-[var(--border-subtle)] transition-colors shrink-0 text-[11px] cursor-pointer"
          >
            {tag.label}
          </button>
        ))}
      </div>
    </>
  );
}
