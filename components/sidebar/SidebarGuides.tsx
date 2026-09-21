"use client";

import Link from "next/link";
import { GUIDE_SUB_ITEMS } from "./sidebar-data";

interface SidebarGuidesProps {
  onLinkClick: (id: string, hash: string) => void;
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
        {GUIDE_SUB_ITEMS.map((guide, idx) => {
          const Icon = guide.icon;
          return (
            <Link
              key={idx}
              href={guide.href}
              onClick={() => onLinkClick("steps", guide.href)}
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
  );
}
