export function SidebarHeader() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-[var(--border-subtle)]">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-[var(--accent-cyan)]/15 border border-[var(--accent-cyan)]/30 flex items-center justify-center text-[var(--accent-cyan)] font-bold text-xs">
            Go
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[var(--text-primary)]">
              Pure Go Library
            </span>
            <span className="text-[10px] text-[var(--text-muted)] font-mono">
              Engine.IO v4 • RFC 6455
            </span>
          </div>
        </div>
        <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[var(--accent-emerald)]/15 text-[var(--accent-emerald)] font-bold">
          v1.0.4
        </span>
      </div>
    </div>
  );
}
