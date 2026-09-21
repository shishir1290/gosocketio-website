"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GitBranch,
  Boxes,
  Repeat,
  Share2,
  Binary,
  Database,
} from "lucide-react";
import { ArchitecturePipeline } from "./architecture/ArchitecturePipeline";
import { DataStructuresViewer } from "./architecture/DataStructuresViewer";
import { UpgradeStateMachine } from "./architecture/UpgradeStateMachine";
import { BroadcastConcurrency } from "./architecture/BroadcastConcurrency";
import { ByteFramingViewer } from "./architecture/ByteFramingViewer";

const TABS = [
  { id: "architecture", label: "Go Subsystem Architecture", icon: Boxes },
  { id: "datastructures", label: "Core Structs & Memory Model", icon: Database },
  { id: "upgrade", label: "Transport Upgrade Machine", icon: Repeat },
  { id: "broadcast", label: "Room Fan-Out & Concurrency", icon: Share2 },
  { id: "framing", label: "RFC 6455 Byte Framing", icon: Binary },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function ArchitectureFlowGraph() {
  const [activeTab, setActiveTab] = useState<TabId>("architecture");
  const [selectedNode, setSelectedNode] = useState<string>("engineio");
  const [upgradeStep, setUpgradeStep] = useState<number>(0);
  const [selectedStruct, setSelectedStruct] = useState<string>("server");

  return (
    <section id="architecture" className="pt-4 md:pt-6 pb-14 md:pb-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-purple-500/10 blur-[120px] pointer-events-none -z-10" />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="badge badge-cyan mb-3.5 inline-flex items-center gap-1.5">
            <GitBranch size={13} />
            <span>gsocketio Internal Go Architecture</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-[var(--text-primary)]">
            Pure Go <span className="gradient-cyan-purple">gsocketio Engine</span> Internals
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
            Deep dive into the 100% standard library Go implementation: TCP stream hijacking, handcrafted RFC 6455 framing,
            Engine.IO state machine, and concurrent room fan-out.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] backdrop-blur-xl shadow-lg gap-1 max-w-full overflow-x-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-[var(--accent-cyan)] border border-cyan-500/40 shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === "architecture" && (
          <ArchitecturePipeline
            selectedNode={selectedNode}
            onSelectNode={setSelectedNode}
          />
        )}

        {activeTab === "datastructures" && (
          <DataStructuresViewer
            selectedStruct={selectedStruct}
            onSelectStruct={setSelectedStruct}
          />
        )}

        {activeTab === "upgrade" && (
          <UpgradeStateMachine
            upgradeStep={upgradeStep}
            onSelectStep={setUpgradeStep}
          />
        )}

        {activeTab === "broadcast" && <BroadcastConcurrency />}

        {activeTab === "framing" && <ByteFramingViewer />}
      </div>
    </section>
  );
}
