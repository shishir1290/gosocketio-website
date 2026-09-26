"use client";

import { motion } from "framer-motion";
import { NAV_MENU_ITEMS, NavMenuItem } from "./sidebar-data";

interface SidebarMenuProps {
  activeSection: string;
  onLinkClick: (id: string, hash: string) => void;
}

export function SidebarMenu({
  activeSection,
  onLinkClick,
}: SidebarMenuProps) {
  return (
    <div>
      <div className="text-[10.5px] font-bold text-[var(--text-muted)] uppercase tracking-wider px-2 mb-2">
        Documentation Menu
      </div>
      <nav className="flex flex-col gap-0.5">
        {NAV_MENU_ITEMS.map((item: NavMenuItem) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onLinkClick(item.id, item.href)}
              className={`group relative w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                isActive
                  ? "text-[var(--accent-amber)] font-bold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.03]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSidebarHighlight"
                  className="absolute inset-0 rounded-xl bg-amber-500/12 border border-amber-500/30 -z-10 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              {isActive && (
                <motion.div
                  layoutId="activeSidebarBar"
                  className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[var(--accent-amber)] shadow-[0_0_10px_rgba(245,158,11,0.6)]"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              <div className="flex items-center gap-2.5 z-10">
                <Icon
                  size={15}
                  className={
                    isActive
                      ? "text-[var(--accent-amber)]"
                      : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
                  }
                />
                <span>{item.label}</span>
              </div>

              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-1.5 h-1.5 rounded-full bg-[var(--accent-amber)] shadow-[0_0_6px_rgba(245,158,11,0.8)] z-10"
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
