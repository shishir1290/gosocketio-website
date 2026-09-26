"use client";

import { GUIDE_SUB_ITEMS, GuideSubItem } from "./sidebar-data";

interface SidebarGuidesProps {
  onLinkClick: (id: string, hash: string, options?: { stepIndex?: number }) => void;
}

export function SidebarGuides({ onLinkClick }: SidebarGuidesProps) {
  return (
    <div>
      <div className="text-[10.5px] font-bold text-[var(--text-muted)] uppercase tracking-wider px-2 mb-2 flex items-center justify-between">
        <span>Guides & Recipes</span>
        <span className="text-[10px] font-mono text-[var(--accent-cyan)]">
          8 Topics
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        {GUIDE_SUB_ITEMS.map((guide: GuideSubItem) => {
          const Icon = guide.icon;
          return (
            <button
              key={guide.id}
              type="button"
              onClick={() => onLinkClick("steps", guide.href, { stepIndex: guide.stepIndex })}
              className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11.5px] text-left text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-white/[0.04] transition-all cursor-pointer group"
            >
              <Icon
                size={12}
                className="text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] shrink-0 transition-colors"
              />
              <span className="truncate">{guide.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
