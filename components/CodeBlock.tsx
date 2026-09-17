"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({
  code,
  language = "go",
  filename,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard error
    }
  };

  const lines = code.trim().split("\n");

  return (
    <div
      style={{
        background: "rgba(10, 14, 23, 0.95)",
        border: "1px solid rgba(255, 255, 255, 0.09)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.45)",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          background: "rgba(255, 255, 255, 0.03)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", gap: "6px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
          </div>
          {filename && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "var(--text-secondary)",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginLeft: "8px",
              }}
            >
              <Terminal size={13} /> {filename}
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          style={{
            background: copied ? "rgba(16, 185, 129, 0.18)" : "rgba(255, 255, 255, 0.07)",
            border: `1px solid ${copied ? "rgba(16, 185, 129, 0.4)" : "rgba(255, 255, 255, 0.1)"}`,
            color: copied ? "#6ee7b7" : "var(--text-secondary)",
            padding: "5px 12px",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            fontSize: "0.78rem",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.2s ease",
          }}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code body */}
      <div
        style={{
          padding: "16px",
          maxHeight: "540px",
          overflowY: "auto",
          fontFamily: "var(--font-mono)",
          fontSize: "0.86rem",
          lineHeight: "1.65",
        }}
      >
        <pre style={{ margin: 0 }}>
          <code>
            {lines.map((line, idx) => (
              <div key={idx} style={{ display: "flex", gap: "16px" }}>
                {showLineNumbers && (
                  <span
                    style={{
                      userSelect: "none",
                      color: "rgba(255, 255, 255, 0.2)",
                      minWidth: "24px",
                      textAlign: "right",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {idx + 1}
                  </span>
                )}
                <span style={{ color: "#e2e8f0", wordBreak: "break-all" }}>{line || " "}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
