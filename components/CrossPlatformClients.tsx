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
    <section id="clients" style={{ padding: "90px 0", position: "relative" }}>
      <div className="container">
        {/* Section Header with Scroll Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          <div className="badge badge-emerald" style={{ marginBottom: "14px" }}>
            <Globe size={13} />
            <span>Universal Compatibility</span>
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Connect Any <span className="gradient-blue-emerald">Client Ecosystem</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: "700px", margin: "0 auto" }}>
            gsocketio implements the standard Socket.IO v4 protocol. Seamlessly interface with web, mobile, desktop, AI services, and game engines.
          </p>
        </motion.div>

        {/* Tab Pills with Hover & Spring Physics */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "32px",
          }}
        >
          {CLIENT_PLATFORMS.map((platform) => {
            const isSelected = platform.id === activePlatformId;
            return (
              <motion.button
                key={platform.id}
                onClick={() => setActivePlatformId(platform.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 18px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  background: isSelected
                    ? "linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(99, 102, 241, 0.22) 100%)"
                    : "var(--bg-card)",
                  color: isSelected ? "var(--text-primary)" : "var(--text-secondary)",
                  border: `1px solid ${isSelected ? "var(--accent-emerald)" : "var(--border-subtle)"}`,
                  boxShadow: isSelected ? "var(--shadow-glow)" : "var(--shadow-sm)",
                  transition: "all 0.2s ease",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", color: isSelected ? "var(--accent-emerald)" : "var(--text-muted)" }}>
                  {getPlatformLucideIcon(platform.id, 16)}
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
            className="glass-panel"
            style={{
              padding: "clamp(18px, 3vw, 28px)",
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              maxWidth: "1020px",
              margin: "0 auto",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            {/* Header with Install Command */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "14px",
                marginBottom: "20px",
                paddingBottom: "18px",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "var(--accent-emerald)" }}>{getPlatformLucideIcon(activePlatform.id, 20)}</span>
                  <span>{activePlatform.name} Integration</span>
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>{activePlatform.description}</p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 14px",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.82rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-primary)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <Terminal size={14} color="var(--accent-emerald)" />
                <code>{activePlatform.installCmd}</code>
              </div>
            </div>

            {/* Code Block */}
            <CodeBlock code={activePlatform.code} language={activePlatform.language} filename={`client.${activePlatform.language}`} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
