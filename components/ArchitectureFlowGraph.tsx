"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  GitBranch,
  ArrowRight,
  ArrowDown,
  Server,
  Terminal,
  CheckCircle2,
  Share2,
  Zap,
  Repeat,
  Code2,
  FileCode2,
  Boxes,
  Binary,
  Network,
  Radio,
} from "lucide-react";

export default function ArchitectureFlowGraph() {
  const [activeTab, setActiveTab] = useState<"architecture" | "upgrade" | "broadcast" | "framing">("architecture");
  const [selectedNode, setSelectedNode] = useState<string>("engineio");
  const [upgradeStep, setUpgradeStep] = useState<number>(0);

  // Pure Go gsocketio Architecture Nodes Details
  const nodeDetails: Record<
    string,
    { title: string; subtitle: string; tag: string; description: string; code: string; specs: string[] }
  > = {
    hijacker: {
      title: "TCP Stream & http.Hijacker",
      subtitle: "Low-Level Connection Takeover",
      tag: "net/http & net.Conn",
      description:
        "gsocketio takes control of the underlying TCP socket using Go's http.Hijacker interface. It bypasses standard HTTP request-response lifecycle to gain full duplex control over the raw net.Conn and bufio.ReadWriter stream.",
      code: `// gsocketio internal: Hijacking raw TCP stream
func (s *Server) hijackConnection(w http.ResponseWriter) (net.Conn, *bufio.ReadWriter, error) {
    hj, ok := w.(http.Hijacker)
    if !ok {
        return nil, nil, errors.New("webserver doesn't support hijacking")
    }
    
    conn, bufrw, err := hj.Hijack()
    if err != nil {
        return nil, nil, err
    }
    
    // Configure TCP Keep-Alive and NoDelay for ultra low latency
    if tcpConn, ok := conn.(*net.TCPConn); ok {
        _ = tcpConn.SetNoDelay(true)
        _ = tcpConn.SetKeepAlive(true)
        _ = tcpConn.SetKeepAlivePeriod(30 * time.Second)
    }
    
    return conn, bufrw, nil
}`,
      specs: [
        "Direct TCP net.Conn control via standard library http.Hijacker",
        "TCP_NODELAY enabled for sub-millisecond packet delivery",
        "Buffered I/O (bufio.Reader / bufio.Writer) optimization",
      ],
    },
    websocket: {
      title: "RFC 6455 WebSocket Engine",
      subtitle: "Handcrafted Zero-Dependency Protocol",
      tag: "Pure Go stdlib",
      description:
        "Custom RFC 6455 engine written from scratch. Performs SHA-1 handshake hashing, bitwise frame header parsing, 4-byte client masking key XOR unmasking, and payload fragmentation assembly.",
      code: `// RFC 6455 Handshake & XOR Unmasking in standard Go
func computeAcceptKey(clientKey string) string {
    h := sha1.New()
    h.Write([]byte(strings.TrimSpace(clientKey) + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"))
    return base64.StdEncoding.EncodeToString(h.Sum(nil))
}

func unmaskPayload(payload []byte, maskKey [4]byte) {
    for i := 0; i < len(payload); i++ {
        payload[i] ^= maskKey[i%4] // In-place fast XOR unmasking
    }
}

// Frame header: FIN (1 bit) | RSV (3 bits) | Opcode (4 bits)
func parseFrameHeader(r *bufio.Reader) (FrameHeader, error) {
    b1, _ := r.ReadByte()
    fin := (b1 & 0x80) != 0
    opcode := b1 & 0x0F
    
    b2, _ := r.ReadByte()
    masked := (b2 & 0x80) != 0
    length := uint64(b2 & 0x7F)
    // Read extended length (16-bit or 64-bit) if needed
    return FrameHeader{FIN: fin, Opcode: opcode, Masked: masked, Length: length}, nil
}`,
      specs: [
        "Zero 3rd-party WebSocket libraries (no Gorilla, no nhooyr, no gobwas)",
        "Opcodes supported: 0x1 (Text), 0x2 (Binary), 0x8 (Close), 0x9 (Ping), 0xA (Pong)",
        "Handles 16-bit and 64-bit extended payload length boundaries",
      ],
    },
    polling: {
      title: "HTTP Long-Polling Engine",
      subtitle: "Buffered Fallback & Upgrade Staging",
      tag: "Channel Buffered Queue",
      description:
        "Manages session-level packet channels for HTTP long-polling clients. Transmits queued packets upon GET request, handles batch packet framing with delimiter (\\x1e), and executes 20s noop heartbeat flushes.",
      code: `// gsocketio Long-Polling Session Handler
type PollingSession struct {
    sid       string
    sendQueue chan []byte
    closeOnce sync.Once
    mu        sync.Mutex
}

func (s *PollingSession) HandlePoll(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "text/plain; charset=UTF-8")
    w.Header().Set("Cache-Control", "no-store, no-cache, must-revalidate")
    
    select {
    case packet := <-s.sendQueue:
        w.Write(packet)
    case <-time.After(20 * time.Second):
        w.Write([]byte("6")) // Engine.IO Noop packet to keep connection alive
    case <-r.Context().Done():
        return
    }
}`,
      specs: [
        "Non-blocking Go channel queues per session",
        "Supports multi-packet batching with delimiter (\\x1e)",
        "Graceful HTTP timeout recovery with automatic reconnect",
      ],
    },
    engineio: {
      title: "Engine.IO v4 State Machine",
      subtitle: "Session Store & Heartbeat Routines",
      tag: "sync.Map & time.Ticker",
      description:
        "Manages the low-level Engine.IO session lifecycle. Assigns cryptographically secure 128-bit SIDs, tracks transport upgrades, runs ping/pong tickers (25s interval, 20s timeout), and dispatches packet types (0–6).",
      code: `// Engine.IO v4 Session State & Heartbeat Engine
type Session struct {
    sid          string
    transport    Transport // WebSocket or Polling
    lastPing     time.Time
    pingTicker   *time.Ticker
    pingTimeout  time.Duration
    mu           sync.Mutex
}

func (s *Server) startHeartbeat(sess *Session) {
    sess.pingTicker = time.NewTicker(25 * time.Second)
    go func() {
        for range sess.pingTicker.C {
            // Check if client ping timed out
            if time.Since(sess.lastPing) > sess.pingTimeout {
                sess.Close("ping timeout")
                return
            }
            sess.WritePacket(Packet{Type: PacketPing}) // "2"
        }
    }()
}`,
      specs: [
        "Thread-safe sync.Map session directory",
        "Built-in heartbeat ticker to prevent zombie TCP connections",
        "Packet Types: 0:Open, 1:Close, 2:Ping, 3:Pong, 4:Message, 5:Upgrade, 6:Noop",
      ],
    },
    socketio: {
      title: "Socket.IO v5 Codec & Router",
      subtitle: "Namespace Multiplexer & ACK Resolver",
      tag: "JSON & Binary Codec",
      description:
        "Encapsulates Socket.IO v5 protocol rules over Engine.IO message frames. Parses packet headers, isolates namespaces ('/', '/chat'), manages ACK reply callbacks with atomic IDs, and unpacks binary payloads.",
      code: `// Socket.IO Packet Codec
// Wire format: <Type><AckID><Namespace,><Payload>
// e.g. "42/chat,15[\"event\",{\"key\":\"val\"}]"

type SIOPacket struct {
    Type        PacketType // 0:Connect, 1:Disconnect, 2:Event, 3:Ack, 5:Binary
    Namespace   string     // e.g. "/chat"
    ID          uint64     // Ack ID
    Data        []json.RawMessage
    Attachments [][]byte
}

func DecodeSIOPacket(raw string) (*SIOPacket, error) {
    pkt := &SIOPacket{Namespace: "/"}
    // 1. Read SIO packet type byte
    pkt.Type = PacketType(raw[0] - '0')
    cursor := 1
    
    // 2. Parse optional namespace: /chat,
    if cursor < len(raw) && raw[cursor] == '/' {
        commaIdx := strings.IndexByte(raw[cursor:], ',')
        pkt.Namespace = raw[cursor : cursor+commaIdx]
        cursor += commaIdx + 1
    }
    
    // 3. Unmarshal remaining JSON array
    json.Unmarshal([]byte(raw[cursor:]), &pkt.Data)
    return pkt, nil
}`,
      specs: [
        "Zero-allocation namespace isolation",
        "Atomic ACK ID counter & asynchronous callback dispatch",
        "Full support for JSON and Binary attachment frames",
      ],
    },
    rooms: {
      title: "Room Hub & Fan-Out Registry",
      subtitle: "Concurrent In-Memory Index",
      tag: "sync.RWMutex Optimized",
      description:
        "High-performance concurrent room indexing. Sockets can join or leave rooms dynamically. Broadcasting uses sync.RWMutex read locks and spawns non-blocking goroutines to fan out frames across targeted socket channels.",
      code: `type Namespace struct {
    name    string
    mu      sync.RWMutex
    rooms   map[string]map[string]Conn // roomName -> socketID -> Conn
    sockets map[string]Conn            // socketID -> Conn
}

func (ns *Namespace) ToRoom(room, event string, sender Conn, data any) {
    ns.mu.RLock()
    defer ns.mu.RUnlock()

    members, ok := ns.rooms[room]
    if !ok || len(members) == 0 {
        return
    }

    packet := encodeEvent(ns.name, event, data)

    // Concurrent fan-out to all room members
    for _, client := range members {
        if sender != nil && client.ID() == sender.ID() {
            continue // Filter out sender
        }
        go client.SendFrame(packet) // Non-blocking write
    }
}`,
      specs: [
        "sync.RWMutex protected room registry",
        "O(1) room lookup with sub-microsecond member resolution",
        "Non-blocking asynchronous goroutine fan-out delivery",
      ],
    },
    api: {
      title: "gsocketio Server Public API",
      subtitle: "Clean, Idiomatic Go Interface",
      tag: "Developer Surface",
      description:
        "Exposes standard Go developer primitives: sio.New(options), srv.OnConnect, srv.OnEvent, srv.ToRoom, srv.Broadcast, and srv.OnDisconnect with complete context and error propagation.",
      code: `package main

import (
    "encoding/json"
    "log"
    "net/http"
    sio "github.com/shishir1290/gsocketio"
)

func main() {
    srv := sio.New(&sio.Options{
        PingInterval: 25 * time.Second,
        PingTimeout:  20 * time.Second,
        MaxPayload:   1_000_000,
    })

    srv.OnConnect("/chat", func(c sio.Conn) error {
        c.Join("general")
        return c.Emit("welcome", "Connected to Pure Go Socket.IO!")
    })

    srv.OnEvent("/chat", "message", func(c sio.Conn, args []json.RawMessage) {
        var msg string
        json.Unmarshal(args[0], &msg)
        srv.ToRoom("/chat", "general", "new_message", c, msg)
    })

    http.Handle("/socket.io/", srv)
    log.Fatal(http.ListenAndServe(":8080", nil))
}`,
      specs: [
        "100% standard net/http compatibility",
        "Strongly-typed or json.RawMessage event handlers",
        "Single-binary compilation with zero CGo or external dependencies",
      ],
    },
  };

  // Pure Go Upgrade Steps
  const upgradeSteps = [
    {
      title: "1. HTTP Long-Polling Session Init",
      protocol: "net/http Request Handling",
      serverAction: "Generate 128-bit SID, initialize session queue channel, and return Engine.IO Open packet.",
      wirePayload: 'HTTP 200 OK\n0{"sid":"eX3_8kP...","pingInterval":25000,"pingTimeout":20000,"upgrades":["websocket"]}',
      internalGo: "sync.Map session storage + time.NewTicker heartbeat",
    },
    {
      title: "2. Socket.IO Namespace Connection",
      protocol: "SIO Packet Codec",
      serverAction: "Parse SIO CONNECT packet ('40/chat,'), trigger registered OnConnect handler, and confirm connection.",
      wirePayload: 'HTTP 200 OK\n40/chat,{"sid":"eX3_8kP..."}',
      internalGo: "ns.OnConnect(conn) execution + room subscription",
    },
    {
      title: "3. TCP Hijack & RFC 6455 Handshake",
      protocol: "http.Hijacker -> net.Conn",
      serverAction: "Take over raw TCP net.Conn, compute SHA-1 Sec-WebSocket-Accept key, and flush HTTP 101 response.",
      wirePayload: "HTTP/1.1 101 Switching Protocols\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=",
      internalGo: "conn, bufrw, err := w.(http.Hijacker).Hijack()",
    },
    {
      title: "4. Engine.IO Probe Validation",
      protocol: "RFC 6455 Frame Loop",
      serverAction: "Read masked text frame containing '2probe', unmask payload using 4-byte XOR key, and reply with '3probe'.",
      wirePayload: "WS Frame Received: 2probe (Ping Probe)\nWS Frame Sent: 3probe (Pong Echo)",
      internalGo: "unmaskPayload(buf, maskKey) -> writeFrame(0x1, '3probe')",
    },
    {
      title: "5. Transport Cutover & Polling Buffer Flush",
      protocol: "Engine.IO v4 Cutover",
      serverAction: "Receive '5' (Upgrade), flush all buffered messages from polling queue into WebSocket frame stream, and close polling pipe.",
      wirePayload: "WS Frame Received: 5 (Upgrade Acknowledged)\nServer sets session.activeTransport = WebSocketTransport",
      internalGo: "close(pollSession.sendQueue) -> promote to WebSocket",
    },
    {
      title: "6. Full-Duplex Real-Time Event Loop",
      protocol: "RFC 6455 + SIO v5",
      serverAction: "Stream bi-directional events over hijacked TCP stream with sub-millisecond latency and zero allocation framing.",
      wirePayload: '42/chat,["new_message",{"user":"Alice","text":"Hello Go!"}]',
      internalGo: "srv.ToRoom('/chat', 'general', 'new_message', c, msg)",
    },
  ];

  return (
    <section id="architecture" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-purple-500/10 blur-[120px] pointer-events-none -z-10" />

      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="badge badge-cyan mb-3.5 inline-flex items-center gap-1.5">
            <GitBranch size={13} />
            <span>gsocketio Internal Go Architecture</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-[var(--text-primary)]">
            Pure Go <span className="gradient-cyan-purple">gsocketio Engine</span> Internals
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
            Deep dive into the 100% standard library Go implementation: TCP stream hijacking, handcrafted RFC 6455 framing,
            Engine.IO state machine, and concurrent room fan-out.
          </p>
        </motion.div>

        {/* Tab Navigation Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] backdrop-blur-xl shadow-lg gap-1 max-w-full overflow-x-auto">
            {[
              { id: "architecture", label: "Go Subsystem Architecture", icon: Boxes },
              { id: "upgrade", label: "Transport Upgrade Machine", icon: Repeat },
              { id: "broadcast", label: "Room Fan-Out & Concurrency", icon: Share2 },
              { id: "framing", label: "RFC 6455 Byte Framing", icon: Binary },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-[var(--accent-cyan)] border border-cyan-500/40 shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: GO SUBSYSTEM ARCHITECTURE PIPELINE */}
        {activeTab === "architecture" && (
          <motion.div
            key="architecture"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Interactive Pipeline Nodes (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-3.5">
              {/* Layer 1: TCP Stream & http.Hijacker */}
              <div
                onClick={() => setSelectedNode("hijacker")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedNode === "hijacker"
                    ? "bg-indigo-500/15 border-indigo-500 shadow-md shadow-indigo-500/10"
                    : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-active)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                      <Network size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[var(--text-primary)]">
                        1. TCP Stream & http.Hijacker
                      </div>
                      <div className="text-xs text-[var(--text-secondary)]">
                        Takes over raw TCP net.Conn with TCP_NODELAY & keep-alive
                      </div>
                    </div>
                  </div>
                  <span className="badge text-[0.7rem]">net.Conn Hijack</span>
                </div>
              </div>

              {/* Connecting Pipe */}
              <div className="flex justify-center text-[var(--accent-cyan)]">
                <ArrowDown size={16} className="animate-bounce" />
              </div>

              {/* Layer 2: Dual Transport Engines */}
              <div className="grid grid-cols-2 gap-3">
                {/* WebSocket Engine */}
                <div
                  onClick={() => setSelectedNode("websocket")}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedNode === "websocket"
                      ? "bg-purple-500/20 border-purple-500 shadow-md shadow-purple-500/10"
                      : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-active)]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Zap size={15} className="text-purple-400" />
                    <span className="font-bold text-xs text-[var(--text-primary)]">RFC 6455 Engine</span>
                  </div>
                  <div className="text-[0.72rem] text-[var(--text-secondary)]">
                    SHA-1 Handshake, Frame masking, XOR unmasking
                  </div>
                </div>

                {/* Long Polling Engine */}
                <div
                  onClick={() => setSelectedNode("polling")}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedNode === "polling"
                      ? "bg-amber-500/20 border-amber-500 shadow-md shadow-amber-500/10"
                      : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-active)]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Repeat size={15} className="text-amber-400" />
                    <span className="font-bold text-xs text-[var(--text-primary)]">HTTP Long-Polling</span>
                  </div>
                  <div className="text-[0.72rem] text-[var(--text-secondary)]">
                    Go channel queues, 20s timeout, Noop packets
                  </div>
                </div>
              </div>

              {/* Connecting Pipe */}
              <div className="flex justify-center text-[var(--accent-cyan)]">
                <ArrowDown size={16} />
              </div>

              {/* Layer 3: Engine.IO v4 State Machine */}
              <div
                onClick={() => setSelectedNode("engineio")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedNode === "engineio"
                    ? "bg-cyan-500/15 border-cyan-500 shadow-md shadow-cyan-500/10"
                    : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-active)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                      <Cpu size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[var(--text-primary)]">
                        3. Engine.IO v4 State Machine
                      </div>
                      <div className="text-xs text-[var(--text-secondary)]">
                        sync.Map session store, 25s ping tickers, 20s timeout detection
                      </div>
                    </div>
                  </div>
                  <span className="badge badge-cyan text-[0.7rem]">Session & Heartbeat</span>
                </div>
              </div>

              {/* Connecting Pipe */}
              <div className="flex justify-center text-[var(--accent-cyan)]">
                <ArrowDown size={16} />
              </div>

              {/* Layer 4: Socket.IO v5 Codec + Room Hub */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setSelectedNode("socketio")}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedNode === "socketio"
                      ? "bg-indigo-500/20 border-indigo-500 shadow-md shadow-indigo-500/10"
                      : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-active)]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Terminal size={15} className="text-indigo-400" />
                    <span className="font-bold text-xs text-[var(--text-primary)]">Socket.IO Codec</span>
                  </div>
                  <div className="text-[0.72rem] text-[var(--text-secondary)]">
                    Packet framing, Namespaces, Atomic ACK IDs
                  </div>
                </div>

                <div
                  onClick={() => setSelectedNode("rooms")}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedNode === "rooms"
                      ? "bg-emerald-500/20 border-emerald-500 shadow-md shadow-emerald-500/10"
                      : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-active)]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Share2 size={15} className="text-emerald-400" />
                    <span className="font-bold text-xs text-[var(--text-primary)]">Room Hub & Fan-Out</span>
                  </div>
                  <div className="text-[0.72rem] text-[var(--text-secondary)]">
                    sync.RWMutex registry & Goroutine fan-out
                  </div>
                </div>
              </div>

              {/* Connecting Pipe */}
              <div className="flex justify-center text-[var(--accent-cyan)]">
                <ArrowDown size={16} />
              </div>

              {/* Layer 5: Public API */}
              <div
                onClick={() => setSelectedNode("api")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedNode === "api"
                    ? "bg-emerald-500/15 border-emerald-500 shadow-md shadow-emerald-500/10"
                    : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-active)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <Code2 size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[var(--text-primary)]">
                        5. gsocketio Server Public API
                      </div>
                      <div className="text-xs text-[var(--text-secondary)]">
                        srv.OnConnect, srv.OnEvent, srv.ToRoom, srv.OnDisconnect
                      </div>
                    </div>
                  </div>
                  <span className="badge badge-emerald text-[0.7rem]">Go Public API</span>
                </div>
              </div>
            </div>

            {/* Inspector Sidebar (Right 5 Cols) */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 glass-panel p-6 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-xl">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-subtle)]">
                  <div>
                    <span className="badge badge-cyan text-[0.7rem] mb-1">
                      {nodeDetails[selectedNode].tag}
                    </span>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">
                      {nodeDetails[selectedNode].title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {nodeDetails[selectedNode].subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                  {nodeDetails[selectedNode].description}
                </p>

                {/* Key Specs */}
                <div className="mb-4">
                  <div className="text-xs font-semibold text-[var(--text-primary)] mb-2 uppercase tracking-wider">
                    Go Implementation Highlights
                  </div>
                  <div className="space-y-1.5">
                    {nodeDetails[selectedNode].specs.map((spec, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                        <CheckCircle2 size={14} className="text-[var(--accent-emerald)] shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Implementation */}
                <div>
                  <div className="text-xs font-semibold text-[var(--text-primary)] mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <FileCode2 size={13} className="text-[var(--accent-cyan)]" />
                    <span>Pure Go Internal Source</span>
                  </div>
                  <div className="bg-[#080c14] border border-cyan-400/20 rounded-xl p-3.5 font-mono text-[0.75rem] text-sky-300 overflow-x-auto max-h-[220px]">
                    <pre>
                      <code>{nodeDetails[selectedNode].code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: TRANSPORT UPGRADE MACHINE */}
        {activeTab === "upgrade" && (
          <motion.div
            key="upgrade"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-panel max-w-4xl mx-auto p-6 sm:p-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-xl"
          >
            {/* Step Pills */}
            <div className="flex overflow-x-auto gap-2 pb-4 mb-6 border-b border-[var(--border-subtle)]">
              {upgradeSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setUpgradeStep(idx)}
                  className={`py-2 px-3.5 rounded-full text-xs font-semibold cursor-pointer whitespace-nowrap transition-all border ${
                    upgradeStep === idx
                      ? "bg-cyan-500/20 text-[var(--accent-cyan)] border-[var(--accent-cyan)] shadow-md shadow-cyan-500/10"
                      : "bg-[var(--bg-input)] text-[var(--text-secondary)] border-[var(--border-subtle)]"
                  }`}
                >
                  Step {idx + 1}: {step.title.split(". ")[1]}
                </button>
              ))}
            </div>

            {/* Sequence Box */}
            <div className="bg-[var(--bg-input)] p-6 rounded-2xl border border-[var(--border-subtle)] mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="badge badge-cyan text-xs">{upgradeSteps[upgradeStep].protocol}</span>
                <span className="text-xs text-[var(--text-muted)] font-mono">
                  Internal Hook: {upgradeSteps[upgradeStep].internalGo}
                </span>
              </div>

              {/* Wire Payload */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
                  <div className="text-[0.7rem] text-cyan-400 font-bold mb-1 flex items-center gap-1.5">
                    <ArrowRight size={13} /> WIRE PAYLOAD & PROTOCOL TRANSITION
                  </div>
                  <div className="text-sky-300 break-all whitespace-pre-wrap">
                    {upgradeSteps[upgradeStep].wirePayload}
                  </div>
                </div>
              </div>
            </div>

            {/* Server Action Description */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-2">
                {upgradeSteps[upgradeStep].title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {upgradeSteps[upgradeStep].serverAction}
              </p>
            </div>
          </motion.div>
        )}

        {/* TAB 3: ROOM FAN-OUT & CONCURRENCY */}
        {activeTab === "broadcast" && (
          <motion.div
            key="broadcast"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-panel max-w-4xl mx-auto p-6 sm:p-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-xl"
          >
            <div className="text-center max-w-xl mx-auto mb-8">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                Thread-Safe Room Fan-Out Architecture
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                How gsocketio uses Go&apos;s sync.RWMutex and goroutines to achieve lock-safe, non-blocking broadcasts across
                thousands of concurrent connections.
              </p>
            </div>

            {/* Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-6 bg-[var(--bg-input)] rounded-2xl border border-[var(--border-subtle)] mb-6">
              {/* Event Ingestion */}
              <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-center">
                <Terminal size={24} className="mx-auto text-indigo-400 mb-2" />
                <div className="font-bold text-xs text-[var(--text-primary)]">Inbound Event Ingestion</div>
                <div className="text-[0.7rem] text-[var(--text-muted)] font-mono mt-1">
                  OnEvent(&quot;chat&quot;, args)
                </div>
              </div>

              {/* Server Fan-out Engine */}
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/40 rounded-xl text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 badge badge-cyan text-[0.65rem] py-0.5 px-2">
                  sync.RWMutex RLock
                </div>
                <Server size={24} className="mx-auto text-cyan-400 mb-2 mt-1" />
                <div className="font-bold text-xs text-[var(--text-primary)]">gsocketio Namespace Hub</div>
                <div className="text-[0.7rem] text-sky-400 font-mono mt-1">
                  srv.ToRoom(&quot;general&quot;, ...)
                </div>
              </div>

              {/* Goroutine Fan-out */}
              <div className="space-y-2">
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--text-primary)]">Goroutine 1 → Conn B</span>
                  <span className="text-[0.7rem] text-emerald-400 font-mono">WS Write ✓</span>
                </div>
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--text-primary)]">Goroutine 2 → Conn C</span>
                  <span className="text-[0.7rem] text-emerald-400 font-mono">WS Write ✓</span>
                </div>
                <div className="p-2.5 bg-white/5 border border-[var(--border-subtle)] rounded-lg flex items-center justify-between text-xs opacity-50">
                  <span className="text-[var(--text-muted)]">Sender Socket</span>
                  <span className="text-[0.7rem] text-amber-400 font-mono">Skip Filter ✕</span>
                </div>
              </div>
            </div>

            {/* Room Architecture Code */}
            <div className="bg-[#080c14] border border-cyan-400/20 rounded-xl p-4 font-mono text-xs text-sky-300 overflow-x-auto">
              <pre>
                <code>{`// Thread-safe concurrent room broadcast in pure Go
func (ns *Namespace) ToRoom(room, event string, sender sio.Conn, data any) {
    ns.mu.RLock()
    defer ns.mu.RUnlock()

    members, exists := ns.rooms[room]
    if !exists || len(members) == 0 {
        return
    }

    packet := encodeEvent(ns.name, event, data)
    
    for _, conn := range members {
        if sender != nil && conn.ID() == sender.ID() {
            continue // Filter out sender
        }
        go conn.SendFrame(packet) // Non-blocking write
    }
}`}</code>
              </pre>
            </div>
          </motion.div>
        )}

        {/* TAB 4: RFC 6455 BYTE FRAMING */}
        {activeTab === "framing" && (
          <motion.div
            key="framing"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-panel max-w-4xl mx-auto p-6 sm:p-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-xl"
          >
            <div className="text-center max-w-xl mx-auto mb-8">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                RFC 6455 Handcrafted Byte Framing & Unmasking
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                Visual breakdown of the bitwise binary header parsing and in-place XOR masking algorithm executed in pure Go standard library.
              </p>
            </div>

            {/* Binary Wire Structure */}
            <div className="space-y-4 mb-6">
              {/* RFC 6455 Frame Header */}
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-purple-400">1. RFC 6455 Frame Header Structure</span>
                  <span className="font-mono text-[0.7rem] text-purple-300">Byte 0: 0x81 (FIN=1, Opcode=0x1)</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center font-mono text-[0.7rem]">
                  <div className="p-2 bg-purple-500/20 rounded border border-purple-500/40">FIN (1 bit)</div>
                  <div className="p-2 bg-purple-500/20 rounded border border-purple-500/40">Opcode (4 bits)</div>
                  <div className="p-2 bg-purple-500/20 rounded border border-purple-500/40">Mask Bit (1 bit)</div>
                  <div className="p-2 bg-purple-500/20 rounded border border-purple-500/40">Payload Len (7-64b)</div>
                </div>
              </div>

              {/* 4-Byte Masking Key */}
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-cyan-400">2. 4-Byte XOR Masking Key & Unmasking Loop</span>
                  <span className="font-mono text-[0.7rem] text-cyan-300">payload[i] ^= maskKey[i % 4]</span>
                </div>
                <div className="p-2.5 bg-cyan-500/20 rounded border border-cyan-500/40 font-mono text-xs text-sky-200">
                  <span className="text-amber-400 font-bold">RFC 6455 Requirement:</span> Clients MUST mask all frames with a 4-byte key. Go server unmasks in-place with zero memory allocation.
                </div>
              </div>

              {/* Encapsulated SIO Payload */}
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-400">3. Encapsulated Engine.IO & Socket.IO Payload</span>
                  <span className="font-mono text-[0.7rem] text-indigo-300">Engine.IO &apos;4&apos; + SIO &apos;2&apos;</span>
                </div>
                <div className="p-3 bg-[#080c14] rounded-lg border border-indigo-500/30 font-mono text-xs text-[var(--text-primary)] space-y-1">
                  <div>
                    <span className="text-amber-400">4</span>
                    <span className="text-purple-400">2</span>
                    <span className="text-cyan-400">/chat,</span>
                    <span className="text-emerald-400">12</span>
                    <span className="text-sky-300">[&quot;send_msg&quot;, {`{"text":"Hello Go!"}`}]</span>
                  </div>
                  <div className="text-[0.7rem] text-[var(--text-muted)] pt-2 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div><span className="text-amber-400 font-bold">4</span> : Engine.IO Msg</div>
                    <div><span className="text-purple-400 font-bold">2</span> : SIO Event</div>
                    <div><span className="text-cyan-400 font-bold">/chat,</span> : Namespace</div>
                    <div><span className="text-emerald-400 font-bold">12</span> : Ack ID</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
