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
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full cursor-pointer outline-none relative overflow-hidden transition-colors duration-200 border ${
        isDark
          ? "bg-white/5 border-white/15 text-[var(--accent-amber)] hover:bg-white/10"
          : "bg-black/5 border-black/15 text-[var(--accent-indigo)] hover:bg-black/10"
      } ${className}`}
    >
      <motion.div
        key={theme}
        initial={{ y: -16, opacity: 0, rotate: -45 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: 16, opacity: 0, rotate: 45 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Moon size={size} fill="currentColor" className="opacity-90" />
        ) : (
          <Sun size={size} fill="currentColor" className="opacity-90" />
        )}
      </motion.div>
    </motion.button>
  );
}
