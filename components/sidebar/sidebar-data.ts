import {
  BookOpen,
  Terminal,
  Layers,
  Play,
  Code2,
  GitBranch,
  Home,
  Cpu,
  Radio,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
  HelpCircle,
  Shield,
} from "lucide-react";

export const NAV_MENU_ITEMS = [
  { href: "#", label: "Overview", id: "home", icon: Home },
  { href: "#steps", label: "Guide Recipes", id: "steps", icon: BookOpen },
  {
    href: "#clients",
    label: "Multi-Client SDKs",
    id: "clients",
    icon: Layers,
  },
  {
    href: "#compare",
    label: "Ecosystem Compare",
    id: "compare",
    icon: Shield,
  },
  {
    href: "#architecture",
    label: "Architecture Flow",
    id: "architecture",
    icon: GitBranch,
  },
  {
    href: "#protocol",
    label: "Wire Protocol",
    id: "protocol",
    icon: Terminal,
  },
  {
    href: "#playground",
    label: "Live Simulator",
    id: "playground",
    icon: Play,
  },
  { href: "#api", label: "Go API Reference", id: "api", icon: Code2 },
  { href: "#faq", label: "FAQ & Tech Q&A", id: "faq", icon: HelpCircle },
];

export const GUIDE_SUB_ITEMS = [
  { href: "#steps", label: "01. Installation & Module", icon: Zap },
  { href: "#steps", label: "02. Minimal Server & SIO", icon: CheckCircle2 },
  { href: "#steps", label: "03. Auth & Context Handling", icon: ShieldCheck },
  { href: "#steps", label: "04. Namespaces & Routing", icon: Radio },
  { href: "#steps", label: "05. Rooms & Broadcasting", icon: Radio },
  { href: "#steps", label: "06. Event Acknowledgment", icon: CheckCircle2 },
  { href: "#steps", label: "07. Binary Buffers", icon: Sparkles },
  { href: "#steps", label: "08. Production Config", icon: Cpu },
];

export const CLIENT_LANGUAGES = [
  { label: "JavaScript / TypeScript", tag: "React / Node", href: "#clients" },
  { label: "Python Socket.IO", tag: "AsyncIO", href: "#clients" },
  { label: "Flutter & Dart", tag: "Mobile SDK", href: "#clients" },
  { label: "Swift (iOS / macOS)", tag: "Native Swift", href: "#clients" },
  { label: "Kotlin (Android)", tag: "Coroutines", href: "#clients" },
  { label: "Unity (C#)", tag: "Game Engine", href: "#clients" },
];
