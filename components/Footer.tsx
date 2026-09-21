import Link from "next/link";
import { Github, Heart, ExternalLink, Share2, Globe } from "lucide-react";
import Logo from "@/components/Logo";
import PortfolioLink from "@/components/PortfolioLink";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-nav)] pt-14 pb-8 relative z-10">
      <div className="container">
        <div className="flex flex-wrap justify-between items-start gap-8 mb-10">
          {/* Logo & Desc */}
          <div className="max-w-md">
            <div className="mb-3">
              <Logo size={32} showText={true} glow={false} />
            </div>
            <p className="text-[var(--text-muted)] text-xs sm:text-sm leading-relaxed">
              Pure-Go Socket.IO v4 & Engine.IO v4 server. Zero third-party dependencies, maximum throughput, and cross-platform client compatibility.
            </p>
          </div>

          {/* Links & Social Share */}
          <div className="flex gap-9 sm:gap-14 flex-wrap">
            <div>
              <div className="font-bold text-xs text-[var(--text-primary)] uppercase tracking-wider mb-3">
                Documentation
              </div>
              <ul className="list-none p-0 m-0 flex flex-col gap-2 text-xs sm:text-sm">
                <li>
                  <Link href="#steps" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline transition-colors">
                    Implementation Guide
                  </Link>
                </li>
                <li>
                  <Link href="#clients" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline transition-colors">
                    Multi-Client SDKs
                  </Link>
                </li>
                <li>
                  <Link href="#protocol" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline transition-colors">
                    Wireframe Protocol
                  </Link>
                </li>
                <li>
                  <Link href="#playground" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline transition-colors">
                    WebSocket Simulator
                  </Link>
                </li>
                <li>
                  <Link href="#api" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline transition-colors">
                    Go API Reference
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-xs text-[var(--text-primary)] uppercase tracking-wider mb-3">
                Community
              </div>
              <ul className="list-none p-0 m-0 flex flex-col gap-2 text-xs sm:text-sm">
                <li>
                  <a
                    href="https://github.com/shishir1290/gsocketio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Github size={14} /> GitHub Repository
                  </a>
                </li>
                <li>
                  <a
                    href="https://pkg.go.dev/github.com/shishir1290/gsocketio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline inline-flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink size={14} /> pkg.go.dev Package Docs
                  </a>
                </li>
                <li>
                  <PortfolioLink className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline inline-flex items-center gap-1.5 transition-colors">
                    <Globe size={14} className="text-[var(--accent-cyan)]" /> Developer Portfolio
                  </PortfolioLink>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-xs text-[var(--text-primary)] uppercase tracking-wider mb-3">
                Share & Reach
              </div>
              <ul className="list-none p-0 m-0 flex flex-col gap-2 text-xs sm:text-sm">
                <li>
                  <a
                    href="https://twitter.com/intent/tweet?text=Check%20out%20gsocketio%20%E2%80%94%20A%20zero-dependency%20Socket.IO%20v4%20server%20built%20purely%20in%20Go!&url=https%3A%2F%2Fgsocketio.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Share2 size={14} className="text-[var(--accent-cyan)]" /> Share on X / Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fgsocketio.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline inline-flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink size={14} className="text-[var(--accent-indigo)]" /> Share on LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://reddit.com/submit?url=https%3A%2F%2Fgsocketio.vercel.app&title=gsocketio%20%E2%80%94%20Pure-Go%20Socket.IO%20v4%20Server"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline inline-flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink size={14} className="text-[var(--accent-amber)]" /> Share on Reddit
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-wrap justify-between items-center gap-3 text-xs sm:text-sm text-[var(--text-muted)]">
          <div>
            MIT Licensed • Built with Go, Next.js, GSAP & Framer Motion
          </div>
          <div className="flex items-center gap-1">
            Crafted with <Heart size={13} className="text-pink-500 fill-current" /> by{" "}
            <PortfolioLink className="font-semibold text-[var(--text-primary)] hover:text-[var(--accent-cyan)] transition-colors underline decoration-dotted decoration-[var(--border-active)] hover:decoration-solid">
              Md. Sadmanur Islam Shishir
            </PortfolioLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
