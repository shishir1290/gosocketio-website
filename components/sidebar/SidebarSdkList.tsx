"use client";

import Link from "next/link";
import { CLIENT_LANGUAGES } from "./sidebar-data";

interface SidebarSdkListProps {
  onLinkClick: (id: string, hash: string) => void;
}

export function SidebarSdkList({ onLinkClick }: SidebarSdkListProps) {
  return (
    <div>
      <div className="text-[10.5px] font-bold text-[var(--text-muted)] uppercase tracking-wider px-2 mb-2 flex items-center justify-between">
        <span>Client SDKs</span>
        <span className="text-[10px] font-mono text-[var(--accent-purple)]">
          6 SDKs
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        {CLIENT_LANGUAGES.map((client, idx) => (
          <Link
            key={idx}
            href={client.href}
            onClick={() => onLinkClick("clients", client.href)}
            className="flex items-center justify-between px-3 py-1.5 rounded-lg text-[11.5px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.03] transition-colors no-underline group"
          >
            <span className="truncate group-hover:text-[var(--accent-purple)] transition-colors">
              {client.label}
            </span>
            <span className="text-[9.5px] font-mono text-[var(--text-muted)] bg-white/5 px-1.5 py-0.2 rounded shrink-0">
              {client.tag}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
