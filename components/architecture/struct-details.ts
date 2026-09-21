export const STRUCT_DETAILS: Record<
  string,
  { name: string; purpose: string; file: string; memoryModel: string; code: string; fields: { name: string; type: string; desc: string }[] }
> = {
  server: {
    name: "type Server struct",
    purpose: "Master Server struct implementing http.Handler and coordinating transports, namespaces, and sessions.",
    file: "server.go",
    memoryModel: "Root heap object, long-lived across entire application lifecycle. Safe for concurrent access across thousands of goroutines.",
    code: `type Server struct {
    opts       *Options
    sessions   sync.Map          // map[string]*Session
    namespaces sync.Map          // map[string]*Namespace
    onConn     func(Conn) error
    onDisconn  func(Conn, string)
    closed     atomic.Bool
}`,
    fields: [
      { name: "opts", type: "*Options", desc: "Configuration for PingInterval, PingTimeout, MaxPayload, and CORS" },
      { name: "sessions", type: "sync.Map", desc: "Lock-free concurrent lookup map from SID -> *Session" },
      { name: "namespaces", type: "sync.Map", desc: "Thread-safe registry of active namespaces ('/', '/chat')" },
      { name: "closed", type: "atomic.Bool", desc: "Atomic flag to prevent acceptance of new connections on shutdown" },
    ],
  },
  namespace: {
    name: "type Namespace struct",
    purpose: "Thread-safe multiplexer for rooms, event handlers, and active socket connections within a specific path.",
    file: "namespace.go",
    memoryModel: "Protected by sync.RWMutex. Read-locks for message broadcasting; write-locks only for room join/leave.",
    code: `type Namespace struct {
    name       string
    mu         sync.RWMutex
    rooms      map[string]map[string]Conn // roomName -> socketID -> Conn
    sockets    map[string]Conn            // socketID -> Conn
    handlers   map[string]EventHandler    // eventName -> Callback
    onConnect  func(Conn) error
    onDisconn  func(Conn, string)
}`,
    fields: [
      { name: "name", type: "string", desc: "Namespace path identifier (e.g., '/' or '/chat')" },
      { name: "rooms", type: "map[string]map[string]Conn", desc: "Dual-indexed hash table for O(1) membership and broadcasting" },
      { name: "sockets", type: "map[string]Conn", desc: "All connected sockets subscribed to this namespace" },
      { name: "handlers", type: "map[string]EventHandler", desc: "Registered event callback dispatch table" },
    ],
  },
  session: {
    name: "type Session struct",
    purpose: "Engine.IO session maintaining connection state, heartbeat ticker, and underlying transport channel.",
    file: "session.go",
    memoryModel: "One instance per client connection. Goroutine-safe with internal mutex and ticker lifecycle.",
    code: `type Session struct {
    sid         string
    transport   Transport       // *WebSocketTransport or *PollingTransport
    lastActive  atomic.Int64    // Unix timestamp of last ping received
    pingTicker  *time.Ticker    // Heartbeat ticker (default: 25s)
    pingTimeout time.Duration   // Timeout duration (default: 20s)
    closeOnce   sync.Once
    mu          sync.Mutex
}`,
    fields: [
      { name: "sid", type: "string", desc: "128-bit cryptographically secure session ID" },
      { name: "transport", type: "Transport", desc: "Active transport implementation interface" },
      { name: "lastActive", type: "atomic.Int64", desc: "Lock-free timestamp for ultra fast heartbeat validation" },
      { name: "closeOnce", type: "sync.Once", desc: "Guarantees close logic and resource release execute exactly once" },
    ],
  },
  frameHeader: {
    name: "type FrameHeader struct",
    purpose: "RFC 6455 frame header representation decoded bitwise from raw byte streams.",
    file: "websocket.go",
    memoryModel: "Stack-allocated struct, 0 heap allocations during frame decode loop.",
    code: `type FrameHeader struct {
    FIN     bool    // 1 bit: True if final fragment
    RSV     byte    // 3 bits: Reserved flags
    Opcode  byte    // 4 bits: 0x1 text, 0x2 binary, 0x8 close, 0x9 ping, 0xA pong
    Masked  bool    // 1 bit: True if payload masked by client
    Length  uint64  // 7-bit, 16-bit or 64-bit payload length
    MaskKey [4]byte // 4-byte XOR unmasking key
}`,
    fields: [
      { name: "FIN", type: "bool", desc: "Indicates if this is the final fragment in a message" },
      { name: "Opcode", type: "byte", desc: "0x1 (Text), 0x2 (Binary), 0x8 (Close), 0x9 (Ping), 0xA (Pong)" },
      { name: "MaskKey", type: "[4]byte", desc: "Masking key used to XOR decode client frame payloads" },
      { name: "Length", type: "uint64", desc: "Decoded payload length across 7, 16, or 64-bit limits" },
    ],
  },
};
