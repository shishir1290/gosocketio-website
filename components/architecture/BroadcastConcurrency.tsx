"use client";

import { motion } from "framer-motion";
import { Terminal, Lock, Server } from "lucide-react";

export function BroadcastConcurrency() {
  const broadcastCode = `// Thread-safe concurrent room broadcast in pure Go
func (ns *Namespace) ToRoom(room, event string, sender sio.Conn, data any) {
    ns.mu.RLock()
    defer ns.mu.RUnlock()

    members, exists := ns.rooms[room]
    if !exists || len(members) == 0 {
        return
    }

    packet := encodeEvent(ns.name, event, data)
    
    for _, conn := range members {
        if sender != nil && conn.ID() == sender.ID() {
            continue // Filter out sender
        }
        go conn.SendFrame(packet) // Non-blocking write
    }
}`;

  return (
    <motion.div
      key="broadcast"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel max-w-4xl mx-auto p-6 sm:p-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-xl"
    >
      <div className="text-center max-w-xl mx-auto mb-8">
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
          Thread-Safe Room Fan-Out Architecture
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
          How gsocketio uses Go&apos;s sync.RWMutex and goroutines to achieve lock-safe, non-blocking broadcasts across
          thousands of concurrent connections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch p-6 bg-[var(--bg-input)] rounded-2xl border border-[var(--border-subtle)] mb-6">
        <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-center min-h-[150px] flex flex-col justify-center items-center">
          <Terminal size={24} className="text-indigo-400 mb-2" />
          <div className="font-bold text-xs text-[var(--text-primary)]">Inbound Event Ingestion</div>
          <div className="text-[0.7rem] text-[var(--text-muted)] font-mono mt-1">
            OnEvent(&quot;chat&quot;, args)
          </div>
        </div>

        <div className="p-4 bg-cyan-500/10 border border-cyan-500/40 rounded-xl text-center min-h-[150px] flex flex-col justify-center items-center">
          <div className="inline-flex items-center justify-center gap-1.5 badge badge-cyan text-[0.68rem] py-0.5 px-2.5 mb-2 whitespace-nowrap">
            <Lock size={11} />
            <span>sync.RWMutex RLock</span>
          </div>
          <Server size={22} className="text-cyan-400 mb-1.5" />
          <div className="font-bold text-xs text-[var(--text-primary)]">gsocketio Namespace Hub</div>
          <div className="text-[0.7rem] text-sky-400 font-mono mt-0.5">
            srv.ToRoom(&quot;general&quot;, ...)
          </div>
        </div>

        <div className="space-y-2 min-h-[150px] flex flex-col justify-center">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-between text-xs">
            <span className="font-semibold text-[var(--text-primary)]">Goroutine 1 → Conn B</span>
            <span className="text-[0.7rem] text-emerald-400 font-mono">WS Write ✓</span>
          </div>
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-between text-xs">
            <span className="font-semibold text-[var(--text-primary)]">Goroutine 2 → Conn C</span>
            <span className="text-[0.7rem] text-emerald-400 font-mono">WS Write ✓</span>
          </div>
          <div className="p-2 bg-white/5 border border-[var(--border-subtle)] rounded-lg flex items-center justify-between text-xs opacity-60">
            <span className="text-[var(--text-muted)]">Sender Socket</span>
            <span className="text-[0.7rem] text-amber-400 font-mono">Skip Filter ✕</span>
          </div>
        </div>
      </div>

      <div className="bg-[#080c14] border border-cyan-400/20 rounded-xl p-4 font-mono text-xs text-sky-300 overflow-x-auto">
        <pre>
          <code>{broadcastCode}</code>
        </pre>
      </div>
    </motion.div>
  );
}
