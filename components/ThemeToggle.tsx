"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
  size?: number;
}

export default function ThemeToggle({ className = "", size = 18 }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "38px",
        height: "38px",
        borderRadius: "var(--radius-full)",
        background: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.05)",
        border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)"}`,
        color: isDark ? "var(--accent-amber)" : "var(--accent-indigo)",
        cursor: "pointer",
        outline: "none",
        transition: "background 0.25s ease, border-color 0.25s ease",
        position: "relative",
        overflow: "hidden",
      }}
      className={className}
    >
      <motion.div
        key={theme}
        initial={{ y: -16, opacity: 0, rotate: -45 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: 16, opacity: 0, rotate: 45 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {isDark ? (
          <Moon size={size} fill="currentColor" opacity={0.9} />
        ) : (
          <Sun size={size} fill="currentColor" opacity={0.9} />
        )}
      </motion.div>
    </motion.button>
  );
}
