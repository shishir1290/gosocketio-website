import { Globe, Radio, Layers, Zap, Activity, Server, Cpu } from "lucide-react";

export interface StepItem {
  number: number;
  direction: "client-to-server" | "server-to-client";
  title: string;
  shortTitle: string;
  wire: string;
  desc: string;
  layer: string;
  badge: string;
  icon: any;
}

export const PROTOCOL_STEPS: StepItem[] = [
  {
    number: 1,
    direction: "client-to-server",
    title: "1. HTTP WebSocket Handshake Upgrade",
    shortTitle: "1. Upgrade Handshake",
    wire: "GET /socket.io/?EIO=4&transport=websocket HTTP/1.1\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==",
    desc: "Client requests Engine.IO v4 upgrade over standard HTTP/1.1 or HTTP/2.",
    layer: "HTTP / RFC 6455",
    badge: "HTTP 101",
    icon: Globe,
  },
  {
    number: 2,
    direction: "server-to-client",
    title: "2. Engine.IO Session Initialization",
    shortTitle: "2. Session Open",
    wire: '101 Switching Protocols\n0{"sid":"eX3_8kP...","pingInterval":25000,"pingTimeout":20000,"maxPayload":1000000}',
    desc: "Server accepts connection, assigns unique 128-bit SID, and negotiates heartbeat timings.",
    layer: "Engine.IO 0 (Open)",
    badge: "SID & Ping",
    icon: Radio,
  },
  {
    number: 3,
    direction: "client-to-server",
    title: "3. Socket.IO Namespace Connection",
    shortTitle: "3. Connect Namespace",
    wire: '40/chat,{"token":"jwt-secret-token"}',
    desc: "Client attaches to namespace '/chat' with authentication payload (Engine.IO 4 + SIO 0).",
    layer: "Socket.IO 0 (Connect)",
    badge: "SIO Connect",
    icon: Layers,
  },
  {
    number: 4,
    direction: "server-to-client",
    title: "4. Namespace Handshake Ack",
    shortTitle: "4. Connect Ack",
    wire: '40/chat,{"sid":"eX3_8kP..."}',
    desc: "Server executes OnConnect handlers. If authorized, confirms connection to '/chat'.",
    layer: "Socket.IO 0 (Connect Ack)",
    badge: "SIO Ack",
    icon: Zap,
  },
  {
    number: 5,
    direction: "client-to-server",
    title: "5. Real-Time Event Dispatch",
    shortTitle: "5. Event Emit",
    wire: '42/chat,["send_message",{"user":"Alice","text":"Hello Go!"}]',
    desc: "Client transmits JSON event arguments. Server executes registered OnEvent callbacks.",
    layer: "Socket.IO 2 (Event)",
    badge: "Event Frame",
    icon: Activity,
  },
  {
    number: 6,
    direction: "server-to-client",
    title: "6. Broadcast & Room Distribution",
    shortTitle: "6. Room Broadcast",
    wire: '42/chat,["new_message",{"user":"Alice","text":"Hello Go!"}]',
    desc: "gsocketio distributes packet to room members asynchronously with RWMutex safety.",
    layer: "Socket.IO 2 (Broadcast)",
    badge: "Room Fanout",
    icon: Server,
  },
  {
    number: 7,
    direction: "server-to-client",
    title: "7. Periodic Engine.IO Heartbeat",
    shortTitle: "7. Ping / Pong",
    wire: "2  (Server Ping -> Client replies with 3 Pong within 20s)",
    desc: "Automatic liveness monitoring protects against half-open TCP connections.",
    layer: "Engine.IO 2/3 (Heartbeat)",
    badge: "Heartbeat",
    icon: Cpu,
  },
];
