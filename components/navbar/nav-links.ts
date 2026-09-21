import {
  BookOpen,
  Terminal,
  Layers,
  Play,
  Code2,
  GitBranch,
  HelpCircle,
} from "lucide-react";

export const NAV_LINKS = [
  { href: "#steps", label: "Guide", icon: BookOpen, aria: "Implementation Guide" },
  { href: "#clients", label: "Multi-Client", icon: Layers, aria: "Cross Platform Client SDKs" },
  { href: "#architecture", label: "Architecture", icon: GitBranch, aria: "Architecture Flow" },
  { href: "#protocol", label: "Protocol", icon: Terminal, aria: "Wire Protocol" },
  { href: "#playground", label: "Simulator", icon: Play, aria: "Live Simulator" },
  { href: "#api", label: "API Docs", icon: Code2, aria: "API Reference" },
  { href: "#faq", label: "FAQ", icon: HelpCircle, aria: "Frequently Asked Questions" },
];
