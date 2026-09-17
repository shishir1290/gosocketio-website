"use client";

import { useState, useMemo } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import Prism from "prismjs";
if (typeof window !== "undefined") {
  Prism.manual = true;
}
import "prismjs/components/prism-go";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-json";

import { copyToClipboard } from "@/lib/clipboard";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

const normalizeLanguage = (lang: string): string => {
  const l = (lang || "go").toLowerCase().trim();
  if (l === "golang") return "go";
  if (l === "shell" || l === "sh" || l === "terminal") return "bash";
  if (l === "ts") return "typescript";
  if (l === "js") return "javascript";
  if (l === "py") return "python";
  if (l === "cs") return "csharp";
  if (l === "kt") return "kotlin";
  return l;
};

export default function CodeBlock({
  code,
  language = "go",
  filename,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const cleanCode = code.trim();
  const rawLines = cleanCode.split("\n");
  const langKey = normalizeLanguage(language);

  const highlightedHtml = useMemo(() => {
    const grammar = Prism.languages[langKey] || Prism.languages.go || Prism.languages.plain;
    try {
      return Prism.highlight(cleanCode, grammar, langKey);
    } catch {
      return cleanCode;
    }
  }, [cleanCode, langKey]);

  return (
    <div
      style={{
        background: "rgba(10, 14, 23, 0.95)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
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

      {/* Code body with line numbers */}
      <div
        style={{
          maxHeight: "540px",
          overflow: "auto",
          background: "#080b12",
        }}
      >
        <div
          style={{
            display: "flex",
            minWidth: "fit-content",
            width: "100%",
            padding: "16px 0",
          }}
        >
          {showLineNumbers && (
            <div
              style={{
                padding: "0 14px 0 16px",
                userSelect: "none",
                color: "rgba(255, 255, 255, 0.22)",
                textAlign: "right",
                minWidth: "40px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.86rem",
                lineHeight: "1.65",
                fontVariantNumeric: "tabular-nums",
                flexShrink: 0,
              }}
            >
              {rawLines.map((_, idx) => (
                <div key={idx}>{idx + 1}</div>
              ))}
            </div>
          )}

          <div
            style={{
              padding: "0 16px 0 4px",
              flex: 1,
              fontFamily: "var(--font-mono)",
              fontSize: "0.86rem",
              lineHeight: "1.65",
              minWidth: 0,
            }}
          >
            <pre
              suppressHydrationWarning
              style={{ margin: 0, overflow: "visible", whiteSpace: "pre", color: "#e2e8f0" }}
            >
              <code
                suppressHydrationWarning
                className={`language-${langKey}`}
                dangerouslySetInnerHTML={{ __html: highlightedHtml }}
              />
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
