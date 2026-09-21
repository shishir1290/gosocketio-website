export function SearchFooter() {
  return (
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
  );
}
