"use client";

import { motion } from "framer-motion";
import { PipelineNodes } from "./PipelineNodes";
import { PipelineInspector } from "./PipelineInspector";

interface ArchitecturePipelineProps {
  selectedNode: string;
  onSelectNode: (node: string) => void;
}

export function ArchitecturePipeline({
  selectedNode,
  onSelectNode,
}: ArchitecturePipelineProps) {
  return (
    <motion.div
      key="architecture"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      <PipelineNodes
        selectedNode={selectedNode}
        onSelectNode={onSelectNode}
      />
      <PipelineInspector selectedNode={selectedNode} />
    </motion.div>
  );
}
