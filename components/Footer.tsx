import Link from "next/link";
import { Github, Heart, ExternalLink, Share2 } from "lucide-react";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        background: "var(--bg-nav)",
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
            alignItems: "flex-start",
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

          {/* Links & Social Share */}
          <div style={{ display: "flex", gap: "36px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
                Documentation
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.88rem" }}>
                <li><Link href="#steps" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Implementation Guide</Link></li>
                <li><Link href="#clients" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Multi-Client SDKs</Link></li>
                <li><Link href="#protocol" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Wireframe Protocol</Link></li>
                <li><Link href="#playground" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>WebSocket Simulator</Link></li>
                <li><Link href="#api" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Go API Reference</Link></li>
              </ul>
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
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
                    <ExternalLink size={14} /> pkg.go.dev Package Docs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
                Share & Reach
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.88rem" }}>
                <li>
                  <a
                    href="https://twitter.com/intent/tweet?text=Check%20out%20gsocketio%20%E2%80%94%20A%20zero-dependency%20Socket.IO%20v4%20server%20built%20purely%20in%20Go!&url=https%3A%2F%2Fgsocketio.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--text-secondary)", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <Share2 size={14} color="var(--accent-cyan)" /> Share on X / Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fgsocketio.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--text-secondary)", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <ExternalLink size={14} color="var(--accent-indigo)" /> Share on LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://reddit.com/submit?url=https%3A%2F%2Fgsocketio.vercel.app&title=gsocketio%20%E2%80%94%20Pure-Go%20Socket.IO%20v4%20Server"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--text-secondary)", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <ExternalLink size={14} color="var(--accent-amber)" /> Share on Reddit
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
            borderTop: "1px solid var(--border-subtle)",
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
            Crafted with <Heart size={13} color="#ec4899" fill="currentColor" /> by <strong style={{ color: "var(--text-primary)" }}>Md. Sadmanur Islam Shishir</strong>
          </div>
        </div>
      </div>
    </footer>
  );
}
