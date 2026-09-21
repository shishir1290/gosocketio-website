import { CheckCircle2, FileCode2 } from "lucide-react";
import { NODE_DETAILS } from "./architecture-data";

interface PipelineInspectorProps {
  selectedNode: string;
}

export function PipelineInspector({ selectedNode }: PipelineInspectorProps) {
  const current = NODE_DETAILS[selectedNode];

  return (
    <div className="lg:col-span-5">
      <div className="sticky top-24 glass-panel p-6 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-xl">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-subtle)]">
          <div>
            <span className="badge badge-cyan text-[0.7rem] mb-1">
              {current.tag}
            </span>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              {current.title}
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              {current.subtitle}
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
          {current.description}
        </p>

        <div className="mb-4">
          <div className="text-xs font-semibold text-[var(--text-primary)] mb-2 uppercase tracking-wider">
            Go Implementation Highlights
          </div>
          <div className="space-y-1.5">
            {current.specs.map((spec, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                <CheckCircle2 size={14} className="text-[var(--accent-emerald)] shrink-0 mt-0.5" />
                <span>{spec}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-[var(--text-primary)] mb-2 uppercase tracking-wider flex items-center gap-1.5">
            <FileCode2 size={13} className="text-[var(--accent-cyan)]" />
            <span>Pure Go Internal Source</span>
          </div>
          <div className="bg-[#080c14] border border-cyan-400/20 rounded-xl p-3.5 font-mono text-[0.75rem] text-sky-300 overflow-x-auto max-h-[220px]">
            <pre>
              <code>{current.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
