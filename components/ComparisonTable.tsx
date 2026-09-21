"use client";

import { motion } from "framer-motion";
import { Check, X, Shield, Sparkles } from "lucide-react";
import { COMPARISON_FEATURES } from "./comparison/comparison-data";

export default function ComparisonTable() {
  const renderCell = (val: string | boolean, isGsocketio: boolean) => {
    if (typeof val === "boolean") {
      return val ? (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400">
          <Check size={14} />
        </span>
      ) : (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/10 text-rose-400">
          <X size={14} />
        </span>
      );
    }
    return (
      <span
        className={`text-xs font-semibold ${
          isGsocketio ? "text-[var(--accent-cyan)] font-mono" : "text-[var(--text-secondary)] font-mono"
        }`}
      >
        {val}
      </span>
    );
  };

  return (
    <section id="compare" className="pt-4 md:pt-6 pb-14 md:pb-20 relative">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <div className="badge badge-cyan mb-3.5 inline-flex items-center gap-1.5">
            <Shield size={13} />
            <span>Golang Socket & WebSocket Ecosystem Benchmark</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-[var(--text-primary)]">
            How gsocketio <span className="gradient-cyan-purple">Compares in Go</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
            Why gsocketio is the preferred modern Go Socket.IO v4 server over legacy packages and bare-bones WebSocket transports.
          </p>
        </motion.div>

        <div className="glass-panel rounded-2xl border border-[var(--border-subtle)] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] bg-white/[0.03]">
                  <th className="p-4 sm:p-5 font-bold text-[var(--text-primary)]">Capability / Architecture</th>
                  <th className="p-4 sm:p-5 font-bold text-[var(--accent-cyan)] bg-cyan-500/10 border-x border-cyan-500/30 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Sparkles size={13} />
                      <span>gsocketio (v1.0.4)</span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 font-semibold text-[var(--text-muted)] text-center">Legacy go-socket.io</th>
                  <th className="p-4 sm:p-5 font-semibold text-[var(--text-muted)] text-center">Gorilla WebSocket</th>
                  <th className="p-4 sm:p-5 font-semibold text-[var(--text-muted)] text-center">Raw net/http</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {COMPARISON_FEATURES.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-white/[0.02] transition-colors ${
                      item.highlight ? "bg-cyan-500/[0.02]" : ""
                    }`}
                  >
                    <td className="p-3.5 sm:p-4 font-medium text-[var(--text-primary)]">{item.name}</td>
                    <td className="p-3.5 sm:p-4 text-center bg-cyan-500/5 border-x border-cyan-500/20">
                      {renderCell(item.gsocketio, true)}
                    </td>
                    <td className="p-3.5 sm:p-4 text-center text-[var(--text-secondary)]">
                      {renderCell(item.legacySocketIo, false)}
                    </td>
                    <td className="p-3.5 sm:p-4 text-center text-[var(--text-secondary)]">
                      {renderCell(item.gorillaWs, false)}
                    </td>
                    <td className="p-3.5 sm:p-4 text-center text-[var(--text-secondary)]">
                      {renderCell(item.rawNetHttp, false)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
