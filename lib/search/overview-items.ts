import { SearchItem } from "./types";

export const OVERVIEW_SEARCH_ITEMS: SearchItem[] = [
  {
    id: "overview-home",
    title: "gsocketio Overview & High Throughput",
    category: "Overview",
    description: "Zero-dependency pure-Go Socket.IO v4 server with maximum throughput and client compatibility.",
    href: "#",
    keywords: ["home", "overview", "intro", "performance", "features", "throughput", "golang", "socket.io", "v4"],
    badge: "v1.0.4",
  },
  {
    id: "overview-architecture",
    title: "Architecture & Flow Graph",
    category: "Overview",
    description: "Interactive architectural flow graph showing transport upgrades, session manager, rooms, and packet codecs.",
    href: "#architecture",
    keywords: ["architecture", "flow", "graph", "diagram", "transport", "polling", "websocket", "codec", "concurrency"],
    badge: "Interactive",
  },
  {
    id: "overview-protocol",
    title: "Engine.IO & Socket.IO Wire Protocol",
    category: "Protocol",
    description: "Interactive step-by-step trace of Engine.IO v4 handshakes, ping/pong heartbeats, and packet framing.",
    href: "#protocol",
    keywords: ["protocol", "engine.io", "socket.io", "wire", "packet", "frame", "handshake", "ping", "pong", "upgrade"],
  },
  {
    id: "overview-simulator",
    title: "Live WebSocket Simulator Playground",
    category: "Overview",
    description: "Test real-time packet exchange, event emissions, latency benchmarks, and room broadcasting in the browser.",
    href: "#playground",
    keywords: ["simulator", "playground", "test", "websocket", "latency", "benchmark", "emit", "broadcast", "packets"],
    badge: "Live Tool",
  },
];
