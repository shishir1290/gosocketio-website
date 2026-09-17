import Link from "next/link";
import { Github, Heart, ExternalLink } from "lucide-react";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        background: "rgba(5, 7, 11, 0.95)",
        padding: "60px 0 30px 0",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          {/* Logo & Desc */}
          <div style={{ maxWidth: "420px" }}>
            <div style={{ marginBottom: "12px" }}>
              <Logo size={32} showText={true} glow={false} />
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.6 }}>
              Pure-Go Socket.IO v4 & Engine.IO v4 server. Zero third-party dependencies, maximum throughput, and cross-platform client compatibility.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
                Navigation
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.88rem" }}>
                <li><Link href="#steps" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Tutorial Guide</Link></li>
                <li><Link href="#clients" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Client SDKs</Link></li>
                <li><Link href="#protocol" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Wire Protocol</Link></li>
                <li><Link href="#playground" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Simulator</Link></li>
              </ul>
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
                Community
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.88rem" }}>
                <li>
                  <a href="https://github.com/shishir1290/gsocketio" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Github size={14} /> GitHub Repository
                  </a>
                </li>
                <li>
                  <a href="https://pkg.go.dev/github.com/shishir1290/gsocketio" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                    <ExternalLink size={14} /> pkg.go.dev Docs
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            fontSize: "0.82rem",
            color: "var(--text-muted)",
          }}
        >
          <div>
            MIT Licensed • Built with Go, Next.js, GSAP & Framer Motion
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            Crafted with <Heart size={13} color="#ec4899" fill="currentColor" /> by <strong style={{ color: "#fff" }}>Md. Sadmanur Islam Shishir</strong>
          </div>
        </div>
      </div>
    </footer>
  );
}
