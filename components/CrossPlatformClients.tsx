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
    <section id="clients" style={{ padding: "90px 0", background: "rgba(10, 14, 22, 0.5)", position: "relative" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
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
        </div>

        {/* Tab Pills */}
        <div
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
              <button
                key={platform.id}
                onClick={() => setActivePlatformId(platform.id)}
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
                    ? "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(99, 102, 241, 0.25) 100%)"
                    : "rgba(255, 255, 255, 0.04)",
                  color: isSelected ? "#fff" : "var(--text-secondary)",
                  border: `1px solid ${isSelected ? "rgba(16, 185, 129, 0.5)" : "var(--border-subtle)"}`,
                  boxShadow: isSelected ? "0 0 20px rgba(16, 185, 129, 0.2)" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", color: isSelected ? "var(--accent-emerald)" : "var(--text-muted)" }}>
                  {getPlatformLucideIcon(platform.id, 16)}
                </span>
                <span>{platform.name}</span>
              </button>
            );
          })}
        </div>

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
              padding: "28px",
              background: "rgba(13, 17, 26, 0.92)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              maxWidth: "1020px",
              margin: "0 auto",
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
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: "4px", display: "flex", alignItems: "center", gap: "8px" }}>
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
                  background: "rgba(0, 0, 0, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.82rem",
                  fontFamily: "var(--font-mono)",
                  color: "#94a3b8",
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
