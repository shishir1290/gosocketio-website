"use client";

import { motion } from "framer-motion";

export function ByteFramingViewer() {
  return (
    <motion.div
      key="framing"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel max-w-4xl mx-auto p-6 sm:p-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-xl"
    >
      <div className="text-center max-w-xl mx-auto mb-8">
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
          RFC 6455 Handcrafted Byte Framing & Unmasking
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
          Visual breakdown of the bitwise binary header parsing and in-place XOR masking algorithm executed in pure Go standard library.
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-purple-400">1. RFC 6455 Frame Header Structure</span>
            <span className="font-mono text-[0.7rem] text-purple-300">Byte 0: 0x81 (FIN=1, Opcode=0x1)</span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center font-mono text-[0.7rem]">
            <div className="p-2 bg-purple-500/20 rounded border border-purple-500/40">FIN (1 bit)</div>
            <div className="p-2 bg-purple-500/20 rounded border border-purple-500/40">Opcode (4 bits)</div>
            <div className="p-2 bg-purple-500/20 rounded border border-purple-500/40">Mask Bit (1 bit)</div>
            <div className="p-2 bg-purple-500/20 rounded border border-purple-500/40">Payload Len (7-64b)</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-cyan-400">2. 4-Byte XOR Masking Key & Unmasking Loop</span>
            <span className="font-mono text-[0.7rem] text-cyan-300">payload[i] ^= maskKey[i % 4]</span>
          </div>
          <div className="p-2.5 bg-cyan-500/20 rounded border border-cyan-500/40 font-mono text-xs text-sky-200">
            <span className="text-amber-400 font-bold">RFC 6455 Requirement:</span> Clients MUST mask all frames with a 4-byte key. Go server unmasks in-place with zero memory allocation.
          </div>
        </div>

        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-indigo-400">3. Encapsulated Engine.IO & Socket.IO Payload</span>
            <span className="font-mono text-[0.7rem] text-indigo-300">Engine.IO &apos;4&apos; + SIO &apos;2&apos;</span>
          </div>
          <div className="p-3 bg-[#080c14] rounded-lg border border-indigo-500/30 font-mono text-xs text-[var(--text-primary)] space-y-1">
            <div>
              <span className="text-amber-400 font-bold">4</span>
              <span className="text-purple-400 font-bold">2</span>
              <span className="text-cyan-400">/chat,</span>
              <span className="text-emerald-400">12</span>
              <span className="text-sky-300">{`["send_msg", {"text":"Hello Go!"}]`}</span>
            </div>
            <div className="text-[0.7rem] text-[var(--text-muted)] pt-2 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div><span className="text-amber-400 font-bold">4</span> : Engine.IO Msg</div>
              <div><span className="text-purple-400 font-bold">2</span> : SIO Event</div>
              <div><span className="text-cyan-400 font-bold">/chat,</span> : Namespace</div>
              <div><span className="text-emerald-400 font-bold">12</span> : Ack ID</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
