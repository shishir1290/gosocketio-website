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
  LucideIcon,
} from "lucide-react";

export interface NavMenuItem {
  href: string;
  label: string;
  id: string;
  icon: LucideIcon;
}

export interface GuideSubItem {
  id: string;
  stepIndex: number;
  href: string;
  label: string;
  icon: LucideIcon;
}

export interface ClientLanguageItem {
  id: string;
  label: string;
  tag: string;
  href: string;
}

export const NAV_MENU_ITEMS: NavMenuItem[] = [
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

export const GUIDE_SUB_ITEMS: GuideSubItem[] = [
  { id: "step-1-installation", stepIndex: 0, href: "#steps", label: "01. Installation & Module", icon: Zap },
  { id: "step-2-minimal-server", stepIndex: 1, href: "#steps", label: "02. Minimal Server & SIO", icon: CheckCircle2 },
  { id: "step-3-auth-context", stepIndex: 2, href: "#steps", label: "03. Auth & Context Handling", icon: ShieldCheck },
  { id: "step-4-namespaces", stepIndex: 3, href: "#steps", label: "04. Namespaces & Routing", icon: Radio },
  { id: "step-5-rooms-broadcast", stepIndex: 4, href: "#steps", label: "05. Rooms & Broadcasting", icon: Radio },
  { id: "step-6-acknowledgments", stepIndex: 5, href: "#steps", label: "06. Event Acknowledgment", icon: CheckCircle2 },
  { id: "step-7-binary-events", stepIndex: 6, href: "#steps", label: "07. Binary Buffers", icon: Sparkles },
  { id: "step-8-engineio-options", stepIndex: 7, href: "#steps", label: "08. Production Config", icon: Cpu },
];

export const CLIENT_LANGUAGES: ClientLanguageItem[] = [
  { id: "javascript", label: "JavaScript / TypeScript", tag: "React / Node", href: "#clients" },
  { id: "python", label: "Python Socket.IO", tag: "AsyncIO", href: "#clients" },
  { id: "flutter", label: "Flutter & Dart", tag: "Mobile SDK", href: "#clients" },
  { id: "swift", label: "Swift (iOS / macOS)", tag: "Native Swift", href: "#clients" },
  { id: "android", label: "Kotlin (Android)", tag: "Coroutines", href: "#clients" },
  { id: "unity", label: "Unity (C#)", tag: "Game Engine", href: "#clients" },
];
