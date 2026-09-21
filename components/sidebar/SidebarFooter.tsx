import { Github, Code2, ExternalLink, Globe } from "lucide-react";
import PortfolioLink from "@/components/PortfolioLink";

export function SidebarFooter() {
  return (
    <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex flex-col gap-1.5">
      <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] px-2">
        Ecosystem
      </div>

      <a
        href="https://github.com/shishir1290/gsocketio"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors no-underline"
      >
        <div className="flex items-center gap-2">
          <Github size={14} />
          <span>GitHub</span>
        </div>
        <ExternalLink size={12} className="text-[var(--text-muted)]" />
      </a>

      <a
        href="https://pkg.go.dev/github.com/shishir1290/gsocketio"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors no-underline"
      >
        <div className="flex items-center gap-2">
          <Code2 size={14} className="text-[var(--accent-cyan)]" />
          <span>pkg.go.dev Docs</span>
        </div>
        <ExternalLink size={12} className="text-[var(--text-muted)]" />
      </a>

      <PortfolioLink className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--accent-amber)] hover:bg-amber-500/10 transition-all no-underline">
        <div className="flex items-center gap-2">
          <Globe size={14} className="text-[var(--accent-amber)]" />
          <span className="font-semibold text-[var(--text-primary)]">
            Portfolio
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--accent-amber)] bg-amber-500/15 px-1.5 py-0.2 rounded">
          shishir.click
        </span>
      </PortfolioLink>
    </div>
  );
}
