import { Network, Code2, ArrowDown } from "lucide-react";
import { PipelineLayerMiddle } from "./PipelineLayerMiddle";

interface PipelineNodesProps {
  selectedNode: string;
  onSelectNode: (node: string) => void;
}

export function PipelineNodes({
  selectedNode,
  onSelectNode,
}: PipelineNodesProps) {
  return (
    <div className="lg:col-span-7 space-y-3.5">
      <div
        onClick={() => onSelectNode("hijacker")}
        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
          selectedNode === "hijacker"
            ? "bg-indigo-500/15 border-indigo-500 shadow-md shadow-indigo-500/10"
            : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-active)]"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Network size={20} />
            </div>
            <div>
              <div className="font-bold text-sm text-[var(--text-primary)]">
                1. TCP Stream & http.Hijacker
              </div>
              <div className="text-xs text-[var(--text-secondary)]">
                Takes over raw TCP net.Conn with TCP_NODELAY & keep-alive
              </div>
            </div>
          </div>
          <span className="badge text-[0.7rem]">net.Conn Hijack</span>
        </div>
      </div>

      <div className="flex justify-center text-[var(--accent-cyan)]">
        <ArrowDown size={16} className="animate-bounce" />
      </div>

      <PipelineLayerMiddle
        selectedNode={selectedNode}
        onSelectNode={onSelectNode}
      />

      <div className="flex justify-center text-[var(--accent-cyan)]">
        <ArrowDown size={16} />
      </div>

      <div
        onClick={() => onSelectNode("api")}
        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
          selectedNode === "api"
            ? "bg-emerald-500/15 border-emerald-500 shadow-md shadow-emerald-500/10"
            : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-active)]"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Code2 size={20} />
            </div>
            <div>
              <div className="font-bold text-sm text-[var(--text-primary)]">
                5. gsocketio Server Public API
              </div>
              <div className="text-xs text-[var(--text-secondary)]">
                srv.OnConnect, srv.OnEvent, srv.ToRoom, srv.OnDisconnect
              </div>
            </div>
          </div>
          <span className="badge badge-emerald text-[0.7rem]">Go Public API</span>
        </div>
      </div>
    </div>
  );
}
