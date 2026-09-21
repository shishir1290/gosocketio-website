import { Zap, Repeat, Cpu, Terminal, Share2, ArrowDown } from "lucide-react";

interface PipelineLayerMiddleProps {
  selectedNode: string;
  onSelectNode: (node: string) => void;
}

export function PipelineLayerMiddle({
  selectedNode,
  onSelectNode,
}: PipelineLayerMiddleProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <div
          onClick={() => onSelectNode("websocket")}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            selectedNode === "websocket"
              ? "bg-purple-500/20 border-purple-500 shadow-md shadow-purple-500/10"
              : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-active)]"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Zap size={15} className="text-purple-400" />
            <span className="font-bold text-xs text-[var(--text-primary)]">RFC 6455 Engine</span>
          </div>
          <div className="text-[0.72rem] text-[var(--text-secondary)]">
            SHA-1 Handshake, Frame masking, XOR unmasking
          </div>
        </div>

        <div
          onClick={() => onSelectNode("polling")}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            selectedNode === "polling"
              ? "bg-amber-500/20 border-amber-500 shadow-md shadow-amber-500/10"
              : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-active)]"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Repeat size={15} className="text-amber-400" />
            <span className="font-bold text-xs text-[var(--text-primary)]">HTTP Long-Polling</span>
          </div>
          <div className="text-[0.72rem] text-[var(--text-secondary)]">
            Go channel queues, 20s timeout, Noop packets
          </div>
        </div>
      </div>

      <div className="flex justify-center text-[var(--accent-cyan)]">
        <ArrowDown size={16} />
      </div>

      <div
        onClick={() => onSelectNode("engineio")}
        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
          selectedNode === "engineio"
            ? "bg-cyan-500/15 border-cyan-500 shadow-md shadow-cyan-500/10"
            : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-active)]"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Cpu size={20} />
            </div>
            <div>
              <div className="font-bold text-sm text-[var(--text-primary)]">
                3. Engine.IO v4 State Machine
              </div>
              <div className="text-xs text-[var(--text-secondary)]">
                sync.Map session store, 25s ping tickers, 20s timeout detection
              </div>
            </div>
          </div>
          <span className="badge badge-cyan text-[0.7rem]">Session & Heartbeat</span>
        </div>
      </div>

      <div className="flex justify-center text-[var(--accent-cyan)]">
        <ArrowDown size={16} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div
          onClick={() => onSelectNode("socketio")}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            selectedNode === "socketio"
              ? "bg-indigo-500/20 border-indigo-500 shadow-md shadow-indigo-500/10"
              : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-active)]"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Terminal size={15} className="text-indigo-400" />
            <span className="font-bold text-xs text-[var(--text-primary)]">Socket.IO Codec</span>
          </div>
          <div className="text-[0.72rem] text-[var(--text-secondary)]">
            Packet framing, Namespaces, Atomic ACK IDs
          </div>
        </div>

        <div
          onClick={() => onSelectNode("rooms")}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            selectedNode === "rooms"
              ? "bg-emerald-500/20 border-emerald-500 shadow-md shadow-emerald-500/10"
              : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-active)]"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Share2 size={15} className="text-emerald-400" />
            <span className="font-bold text-xs text-[var(--text-primary)]">Room Hub & Fan-Out</span>
          </div>
          <div className="text-[0.72rem] text-[var(--text-secondary)]">
            sync.RWMutex registry & Goroutine fan-out
          </div>
        </div>
      </div>
    </>
  );
}
