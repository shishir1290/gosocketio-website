"use client";

import { useState } from "react";
import { API_REFERENCE_DATA } from "@/lib/docs-data";
import { Search, Code2, BookOpen } from "lucide-react";

export default function ApiReference() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = API_REFERENCE_DATA.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <section id="api" style={{ padding: "90px 0", background: "rgba(10, 14, 22, 0.4)", position: "relative" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div className="badge badge-cyan" style={{ marginBottom: "14px" }}>
            <Code2 size={13} />
            <span>Go API Reference</span>
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Complete <span className="gradient-cyan-purple">API Reference</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: "680px", margin: "0 auto 30px auto" }}>
            Explore every method, interface, and configuration field provided by the pure-Go gsocketio library.
          </p>

          {/* Search bar */}
          <div style={{ maxWidth: "480px", margin: "0 auto", position: "relative" }}>
            <Search
              size={18}
              color="var(--text-muted)"
              style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search methods (e.g. Emit, OnConnect, ToRoom)..."
              style={{
                width: "100%",
                padding: "13px 18px 13px 44px",
                background: "rgba(18, 24, 38, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "var(--radius-full)",
                color: "#fff",
                fontSize: "0.92rem",
                outline: "none",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              }}
            />
          </div>
        </div>

        {/* Categories */}
        <div style={{ display: "flex", flexDirection: "column", gap: "36px", maxWidth: "1020px", margin: "0 auto" }}>
          {filteredCategories.map((cat, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: "28px" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff", marginBottom: "18px" }}>
                {cat.category}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {cat.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    style={{
                      padding: "14px 18px",
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      borderRadius: "var(--radius-sm)",
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <code
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--accent-cyan)",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                      }}
                    >
                      {item.name}
                    </code>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem", flex: 1, minWidth: "260px" }}>
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
              No methods found matching &quot;{searchQuery}&quot;.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
