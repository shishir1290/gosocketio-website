"use client";

import { RefObject } from "react";
import {
  BookOpen,
  Layers,
  Code2,
  Terminal,
  ExternalLink,
  Sparkles,
  ArrowRight,
  CornerDownLeft,
} from "lucide-react";
import { SearchItem } from "@/lib/search-index";

interface SearchResultsListProps {
  results: SearchItem[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  onSelectItem: (item: SearchItem) => void;
  containerRef: RefObject<HTMLDivElement | null>;
}

function getCategoryIcon(category: string) {
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
}

export function SearchResultsList({
  results,
  selectedIndex,
  onSelectIndex,
  onSelectItem,
  containerRef,
}: SearchResultsListProps) {
  if (results.length === 0) {
    return (
      <div ref={containerRef} className="py-12 px-4 text-center min-h-[180px]">
        <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
          No matching documentation found
        </p>
        <p className="text-xs text-[var(--text-muted)]">
          Try searching for &quot;minimal&quot;, &quot;rooms&quot;, &quot;auth&quot;, &quot;react&quot;, or &quot;api&quot;.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto p-2.5 flex flex-col gap-1.5 flex-1 min-h-[180px] max-h-[380px]"
    >
      {results.map((item, index) => {
        const isSelected = index === selectedIndex;
        return (
          <button
            key={item.id}
            data-index={index}
            type="button"
            onClick={() => onSelectItem(item)}
            onMouseEnter={() => onSelectIndex(index)}
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
      })}
    </div>
  );
}
