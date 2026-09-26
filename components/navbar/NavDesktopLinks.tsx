"use client";

import { NAV_LINKS } from "./nav-links";
import { scrollToSection } from "@/lib/navigation";

export function NavDesktopLinks() {
  return (
    <nav className="hidden 2xl:flex items-center gap-5 shrink-0" aria-label="Main Navigation">
      {NAV_LINKS.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.href}
            type="button"
            onClick={() => scrollToSection(item.href)}
            aria-label={item.aria}
            className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-medium transition-colors whitespace-nowrap cursor-pointer"
          >
            <Icon size={14} className="text-[var(--text-muted)]" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
