"use client";

import { RefObject } from "react";
import { Terminal, Trash2 } from "lucide-react";
import { LogEntry } from "./types";

interface PlaygroundTerminalProps {
  logs: LogEntry[];
  onClearLogs: () => void;
  logContainerRef: RefObject<HTMLDivElement | null>;
}

export function PlaygroundTerminal({
  logs,
  onClearLogs,
  logContainerRef,
}: PlaygroundTerminalProps) {
  return (
    <div className="lg:col-span-7 p-5 bg-[#060910] flex flex-col min-w-0">
      <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-white/10">
        <div className="flex items-center gap-2 text-[var(--text-secondary)] text-xs sm:text-sm font-semibold">
          <Terminal size={15} className="text-[var(--accent-cyan)] shrink-0" />
          <span>Live Wireframe Packet Stream</span>
        </div>

        <button
          type="button"
          onClick={onClearLogs}
          className="bg-transparent border-0 text-[var(--text-muted)] hover:text-white cursor-pointer inline-flex items-center gap-1 text-xs transition-colors"
        >
          <Trash2 size={13} /> Clear
        </button>
      </div>

      <div
        ref={logContainerRef}
        className="flex-1 min-h-[300px] max-h-[440px] overflow-y-auto flex flex-col gap-2 font-mono text-xs"
      >
        {logs.map((log) => {
          let badgeColor = "text-slate-400 bg-slate-500/15";
          let prefix = "SYS";

          if (log.type === "in") {
            badgeColor = "text-emerald-400 bg-emerald-500/15";
            prefix = "RECV";
          } else if (log.type === "out") {
            badgeColor = "text-cyan-400 bg-cyan-400/15";
            prefix = "SEND";
          } else if (log.type === "err") {
            badgeColor = "text-red-400 bg-red-500/15";
            prefix = "ERR";
          }

          return (
            <div
              key={log.id}
              className="p-2.5 bg-white/[0.02] border border-white/[0.04] rounded-lg flex flex-col gap-1"
            >
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                <span
                  className={`text-[0.68rem] font-bold py-0.5 px-1.5 rounded ${badgeColor} shrink-0`}
                >
                  {prefix}
                </span>
                <span className="text-[var(--text-muted)] text-[0.72rem] shrink-0">
                  {log.time}
                </span>
                <span className="text-slate-200 break-all">{log.text}</span>
              </div>

              {log.raw && (
                <div className="text-[var(--accent-cyan)] text-[0.76rem] pl-9 opacity-85 break-all">
                  Raw: {log.raw}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
