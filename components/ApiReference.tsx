"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { API_REFERENCE_DATA } from "@/lib/docs-data";
import { Search, Code2 } from "lucide-react";

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
    <section id="api" className="py-20 md:py-24 relative">
      <div className="container">
        {/* Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <div className="badge badge-cyan mb-3.5">
            <Code2 size={13} />
            <span>Go API Reference</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-[var(--text-primary)]">
            Complete <span className="gradient-cyan-purple">API Reference</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-2xl mx-auto mb-8">
            Explore every method, interface, and configuration field provided by the pure-Go gsocketio library.
          </p>

          {/* Search bar */}
          <div className="max-w-lg mx-auto relative">
            <Search
              size={18}
              className="text-[var(--text-muted)] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search methods (e.g. Emit, OnConnect, ToRoom)..."
              className="w-full py-3 pr-4 pl-11 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-full text-[var(--text-primary)] text-sm sm:text-base outline-none shadow-sm focus:border-[var(--accent-cyan)] transition-colors"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-col gap-8 max-w-5xl mx-auto">
          {filteredCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="glass-panel p-5 sm:p-7 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-xl"
            >
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-4">
                {cat.category}
              </h3>

              <div className="flex flex-col gap-2.5">
                {cat.items.map((item, itemIdx) => (
                  <motion.div
                    key={itemIdx}
                    whileHover={{ scale: 1.01, x: 3 }}
                    className="p-3.5 sm:p-4 bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl flex flex-wrap items-center justify-between gap-3 cursor-default hover:border-[var(--border-active)] transition-all"
                  >
                    <code className="font-mono text-[var(--accent-cyan)] text-xs sm:text-sm font-semibold">
                      {item.name}
                    </code>
                    <span className="text-[var(--text-secondary)] text-xs sm:text-sm flex-1 min-w-[240px]">
                      {item.desc}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center py-10 text-[var(--text-muted)] text-sm sm:text-base">
              No methods found matching &quot;{searchQuery}&quot;.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
