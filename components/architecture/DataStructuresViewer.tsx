"use client";

import { motion } from "framer-motion";
import { ShieldCheck, FileCode2 } from "lucide-react";
import { STRUCT_DETAILS } from "./architecture-data";

interface DataStructuresViewerProps {
  selectedStruct: string;
  onSelectStruct: (id: string) => void;
}

const STRUCT_LIST = [
  { id: "server", title: "type Server", tag: "server.go", desc: "Master server struct & sync.Map registry" },
  { id: "namespace", title: "type Namespace", tag: "namespace.go", desc: "sync.RWMutex room index & handlers" },
  { id: "session", title: "type Session", tag: "session.go", desc: "Engine.IO session & heartbeat ticker" },
  { id: "frameHeader", title: "type FrameHeader", tag: "websocket.go", desc: "RFC 6455 0-alloc bitwise header" },
];

export function DataStructuresViewer({
  selectedStruct,
  onSelectStruct,
}: DataStructuresViewerProps) {
  const current = STRUCT_DETAILS[selectedStruct];

  return (
    <motion.div
      key="datastructures"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      <div className="lg:col-span-4 space-y-3">
        {STRUCT_LIST.map((s) => {
          const isSelected = selectedStruct === s.id;
          return (
            <div
              key={s.id}
              onClick={() => onSelectStruct(s.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? "bg-cyan-500/15 border-cyan-500 shadow-md shadow-cyan-500/10"
                  : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-active)]"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-bold text-[var(--text-primary)]">{s.title}</span>
                <span className="badge badge-cyan text-[0.65rem] py-0 px-2">{s.tag}</span>
              </div>
              <div className="text-[0.75rem] text-[var(--text-secondary)]">{s.desc}</div>
            </div>
          );
        })}
      </div>

      <div className="lg:col-span-8">
        <div className="glass-panel p-6 sm:p-7 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-subtle)]">
            <div>
              <h3 className="text-lg font-mono font-bold text-[var(--accent-cyan)]">
                {current.name}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                File: <span className="font-mono text-sky-400">{current.file}</span>
              </p>
            </div>
            <span className="badge badge-emerald text-xs">Standard Go Model</span>
          </div>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4">
            {current.purpose}
          </p>

          <div className="p-3.5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl mb-5 flex items-start gap-2.5">
            <ShieldCheck size={18} className="text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">Concurrency & Memory Model:</strong>{" "}
              {current.memoryModel}
            </div>
          </div>

          <div className="mb-5 overflow-x-auto">
            <div className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-2.5">
              Field Definitions & Memory Role
            </div>
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[var(--text-muted)] font-mono">
                  <th className="py-2 pr-3">Field</th>
                  <th className="py-2 pr-3">Go Type</th>
                  <th className="py-2">Role & Safety</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {current.fields.map((f, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02]">
                    <td className="py-2 pr-3 text-cyan-300 font-bold">{f.name}</td>
                    <td className="py-2 pr-3 text-purple-300">{f.type}</td>
                    <td className="py-2 text-[var(--text-secondary)] font-sans">{f.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <div className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileCode2 size={13} className="text-[var(--accent-cyan)]" />
              <span>Go Source Definition</span>
            </div>
            <div className="bg-[#080c14] border border-cyan-400/20 rounded-xl p-3.5 font-mono text-[0.75rem] text-sky-300 overflow-x-auto">
              <pre>
                <code>{current.code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
