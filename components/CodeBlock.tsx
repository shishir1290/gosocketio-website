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
    <div className="bg-[#0a0e17]/95 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
          </div>
          {filename && (
            <span className="font-mono text-xs text-[var(--text-secondary)] flex items-center gap-1.5 ml-2">
              <Terminal size={13} /> {filename}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-all duration-200 border ${
            copied
              ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
              : "bg-white/5 border-white/10 text-[var(--text-secondary)] hover:bg-white/10 hover:text-white"
          }`}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code body with line numbers */}
      <div className="max-h-[540px] overflow-auto bg-[#080b12]">
        <div className="flex min-w-fit w-full py-4">
          {showLineNumbers && (
            <div className="px-3.5 select-none text-white/20 text-right min-w-[40px] font-mono text-[0.84rem] leading-relaxed tabular-nums shrink-0">
              {rawLines.map((_, idx) => (
                <div key={idx}>{idx + 1}</div>
              ))}
            </div>
          )}

          <div className="pr-4 pl-1 flex-1 font-mono text-[0.84rem] leading-relaxed min-w-0">
            <pre
              suppressHydrationWarning
              className="m-0 overflow-visible whitespace-pre text-slate-200"
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
