"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CLIENT_PLATFORMS } from "@/lib/client-examples";
import CodeBlock from "./CodeBlock";
import { Terminal, Globe, Smartphone, AppWindow, Bot, Gamepad2, FileCode2 } from "lucide-react";

const getPlatformLucideIcon = (id: string, size = 16) => {
  switch (id) {
    case "javascript":
      return <Globe size={size} />;
    case "python":
      return <Terminal size={size} />;
    case "flutter":
      return <Smartphone size={size} />;
    case "swift":
      return <AppWindow size={size} />;
    case "android":
      return <Bot size={size} />;
    case "unity":
      return <Gamepad2 size={size} />;
    default:
      return <FileCode2 size={size} />;
  }
};

export default function CrossPlatformClients() {
  const [activePlatformId, setActivePlatformId] = useState(CLIENT_PLATFORMS[0].id);
  const activePlatform = CLIENT_PLATFORMS.find((p) => p.id === activePlatformId) || CLIENT_PLATFORMS[0];

  return (
    <section id="clients" className="py-20 md:py-24 relative">
      <div className="container">
        {/* Section Header with Scroll Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <div className="badge badge-emerald mb-3.5">
            <Globe size={13} />
            <span>Universal Compatibility</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-[var(--text-primary)]">
            Connect Any <span className="gradient-blue-emerald">Client Ecosystem</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
            gsocketio implements the standard Socket.IO v4 protocol. Seamlessly interface with web, mobile, desktop, AI services, and game engines.
          </p>
        </motion.div>

        {/* Tab Pills with Hover & Spring Physics */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2.5 mb-8"
        >
          {CLIENT_PLATFORMS.map((platform) => {
            const isSelected = platform.id === activePlatformId;
            return (
              <motion.button
                key={platform.id}
                onClick={() => setActivePlatformId(platform.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 py-2 px-4 rounded-full text-xs sm:text-sm font-semibold cursor-pointer border transition-all duration-200 ${
                  isSelected
                    ? "bg-gradient-to-br from-emerald-500/20 to-indigo-500/20 text-[var(--text-primary)] border-[var(--accent-emerald)] shadow-md shadow-emerald-500/10"
                    : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]"
                }`}
              >
                <span
                  className={`flex items-center ${
                    isSelected ? "text-[var(--accent-emerald)]" : "text-[var(--text-muted)]"
                  }`}
                >
                  {getPlatformLucideIcon(platform.id, 15)}
                </span>
                <span>{platform.name}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePlatform.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="glass-panel p-5 sm:p-7 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl max-w-5xl mx-auto shadow-xl"
          >
            {/* Header with Install Command */}
            <div className="flex flex-wrap items-center justify-between gap-3.5 mb-5 pb-4 border-b border-[var(--border-subtle)]">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-1 flex items-center gap-2">
                  <span className="text-[var(--accent-emerald)]">
                    {getPlatformLucideIcon(activePlatform.id, 20)}
                  </span>
                  <span>{activePlatform.name} Integration</span>
                </h3>
                <p className="text-[var(--text-secondary)] text-xs sm:text-sm">
                  {activePlatform.description}
                </p>
              </div>

              <div className="flex items-center gap-2 py-2 px-3.5 bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-lg text-xs font-mono text-[var(--text-primary)] shadow-sm">
                <Terminal size={14} className="text-[var(--accent-emerald)] shrink-0" />
                <code>{activePlatform.installCmd}</code>
              </div>
            </div>

            {/* Code Block */}
            <CodeBlock
              code={activePlatform.code}
              language={activePlatform.language}
              filename={`client.${activePlatform.language}`}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
