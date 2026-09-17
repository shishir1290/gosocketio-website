export interface DocStep {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  summary: string;
  code: string;
  filename: string;
  language: string;
  highlights: string[];
  tips?: string[];
}

export const STEP_BY_STEP_DOCS: DocStep[] = [
  {
    id: "step-1-installation",
    number: "01",
    title: "Installation & Module Setup",
    shortDesc: "Add gsocketio to your Go project with zero external dependencies.",
    summary: "gsocketio is built 100% on the Go standard library (net/http, bufio, encoding/json, crypto/sha1). You don't need Gorilla WebSocket or any CGo bindings.",
    filename: "terminal",
    language: "bash",
    code: `go get github.com/shishir1290/gsocketio@latest`,
    highlights: [
      "Pure Go standard library — no CGo, no third-party networking dependencies",
      "Compatible with Go 1.22+ and works seamlessly on Linux, macOS, and Windows",
      "Speak standard Socket.IO v4 / Engine.IO v4 wire protocol"
    ],
    tips: [
      "No external module downloads in your go.sum: zero supply-chain risk."
    ]
  },
  {
    id: "step-2-minimal-server",
    number: "02",
    title: "Minimal Server Setup",
    shortDesc: "Spin up a high-performance Socket.IO v4 server in under 20 lines.",
    summary: "Create a new server instance with sio.New(nil), attach event handlers, and bind it to standard Go net/http handlers.",
    filename: "main.go",
    language: "go",
    code: `package main

import (
    "encoding/json"
    "log"
    "net/http"

    sio "github.com/shishir1290/gsocketio"
)

func main() {
    // 1. Initialize server with default options
    srv := sio.New(nil)

    // 2. Handle client connections
    srv.OnConnect("/", func(c sio.Conn) error {
        log.Printf("[+] Client connected: id=%s ns=%s", c.ID(), c.Namespace())
        // Send a welcome event to the newly connected client
        return c.Emit("welcome", map[string]string{
            "message": "Welcome to pure-Go gsocketio server!",
            "sid":     c.ID(),
        })
    })

    // 3. Listen for events from clients
    srv.OnEvent("/", "ping", func(c sio.Conn, args []json.RawMessage) {
        log.Printf("Received ping from %s", c.ID())
        _ = c.Emit("pong", "pong payload")
    })

    // 4. Handle client disconnections
    srv.OnDisconnect("/", func(c sio.Conn, reason string) {
        log.Printf("[-] Client disconnected: id=%s reason=%s", c.ID(), reason)
    })

    // 5. Start background engine.io session manager
    go srv.Serve()

    // 6. Mount onto standard net/http router at /socket.io/
    http.Handle("/socket.io/", srv)
    log.Println("⚡ Server listening on http://localhost:8080/socket.io/")
    log.Fatal(http.ListenAndServe(":8080", nil))
}`,
    highlights: [
      "sio.New(nil) uses optimal defaults: 25s pingInterval, 20s pingTimeout, 1MB maxPayload",
      "srv.Serve() accepts incoming transports in the background asynchronously",
      "http.Handle('/socket.io/', srv) handles both HTTP Long-Polling and RFC 6455 WebSockets"
    ]
  },
  {
    id: "step-3-auth-context",
    number: "03",
    title: "Authentication & Context",
    shortDesc: "Access client auth payloads and attach user session context.",
    summary: "When clients connect with auth payloads (e.g. JWT tokens), gsocketio deserializes them and attaches them to the Conn context.",
    filename: "auth.go",
    language: "go",
    code: `package main

import (
    "errors"
    "log"
    sio "github.com/shishir1290/gsocketio"
)

type AuthData struct {
    Token  string \`json:"token"\`
    UserID string \`json:"userId"\`
}

func setupAuth(srv *sio.Server) {
    srv.OnConnect("/", func(c sio.Conn) error {
        // Retrieve raw auth context sent during client handshake
        rawAuth := c.Context()
        if rawAuth == nil {
            return errors.New("authentication required")
        }

        // Context contains unmarshaled JSON map or structure
        if authMap, ok := rawAuth.(map[string]interface{}); ok {
            token, _ := authMap["token"].(string)
            if token != "secret-api-token" {
                // Returning an error automatically rejects with CONNECT_ERROR packet
                return errors.New("invalid or expired authentication token")
            }

            // Save verified user state to connection context for future events
            c.SetContext(map[string]string{
                "userId": authMap["userId"].(string),
                "role":   "admin",
            })
        }
        return nil
    })
}`,
    highlights: [
      "Rejecting in OnConnect sends a 44 packet (CONNECT_ERROR) back to the client automatically",
      "c.SetContext(v) is thread-safe (sync.RWMutex protected) across all event handlers",
      "Retrieve stored context anytime inside srv.OnEvent using c.Context()"
    ]
  },
  {
    id: "step-4-rooms-broadcast",
    number: "04",
    title: "Rooms, Groups & Targeted Broadcasting",
    shortDesc: "Manage room subscriptions and broadcast to namespaces with skip filters.",
    summary: "gsocketio features a built-in concurrent room manager. Broadcast to entire namespaces or specific rooms while optionally skipping the sender.",
    filename: "chat.go",
    language: "go",
    code: `package main

import (
    "encoding/json"
    "log"
    sio "github.com/shishir1290/gsocketio"
)

type ChatMessage struct {
    Room string \`json:"room"\`
    User string \`json:"user"\`
    Text string \`json:"text"\`
}

func setupRooms(srv *sio.Server) {
    srv.OnEvent("/", "join_room", func(c sio.Conn, args []json.RawMessage) {
        var roomName string
        if len(args) > 0 && json.Unmarshal(args[0], &roomName) == nil {
            c.Join(roomName)
            log.Printf("Client %s joined room: %s", c.ID(), roomName)

            // Notify everyone in the room except the new member
            srv.ToRoom("/", roomName, "user_joined", c, map[string]string{
                "userId": c.ID(),
                "room":   roomName,
            })
        }
    })

    srv.OnEvent("/", "send_message", func(c sio.Conn, args []json.RawMessage) {
        if len(args) == 0 {
            return
        }
        var msg ChatMessage
        if err := json.Unmarshal(args[0], &msg); err != nil {
            return
        }

        // Broadcast to all members of msg.Room (skipping sender 'c')
        srv.ToRoom("/", msg.Room, "new_message", c, msg)

        // Or broadcast to all connected clients on the "/" namespace
        // srv.ToNamespace("/", "global_announcement", "Server maintenance in 10m")
    })

    srv.OnEvent("/", "leave_room", func(c sio.Conn, args []json.RawMessage) {
        var roomName string
        if len(args) > 0 && json.Unmarshal(args[0], &roomName) == nil {
            c.Leave(roomName)
        }
    })
}`,
    highlights: [
      "c.Join(room) and c.Leave(room) handle concurrency automatically with RWMutex",
      "srv.ToRoom(ns, room, event, skipConn, args...) allows skipping any connection (e.g. sender)",
      "Disconnecting automatically cleans up all room memberships via srv.LeaveAllRooms"
    ]
  },
  {
    id: "step-5-acknowledgments",
    number: "05",
    title: "Request-Response & ACKs",
    shortDesc: "Send events with client acknowledgment callbacks or reply to client ACKs.",
    summary: "Socket.IO acknowledgments enable RPC-style request/reply patterns. Supports standard JSON ACKs and high-performance Binary ACKs.",
    filename: "acks.go",
    language: "go",
    code: `package main

import (
    "encoding/json"
    "log"
    "time"
    sio "github.com/shishir1290/gsocketio"
)

func setupAcks(srv *sio.Server) {
    srv.OnConnect("/", func(c sio.Conn) error {
        // Emit an event with an acknowledgment callback
        err := c.EmitWithAck("request_client_info", func(reply []json.RawMessage, err error) {
            if err != nil {
                log.Println("Ack error:", err)
                return
            }
            log.Println("Client ack response:", string(reply[0]))
        }, "Please provide system telemetry")

        return err
    })
}`,
    highlights: [
      "Automatic sequence number generation and thread-safe callback mapping",
      "Safe cleanup upon disconnect or timeout",
      "BinaryAckFunc variant available for raw binary buffer roundtrips"
    ]
  },
  {
    id: "step-6-binary-events",
    number: "06",
    title: "High-Performance Binary Streams",
    shortDesc: "Stream raw byte buffers without base64 inflation or encoding overhead.",
    summary: "Pure WebSocket binary frames (Opcode 0x02) bypass JSON string encoding, maximizing throughput for file transfers, images, and audio buffers.",
    filename: "binary.go",
    language: "go",
    code: `package main

import (
    "log"
    sio "github.com/shishir1290/gsocketio"
)

func setupBinary(srv *sio.Server) {
    // Register binary event handler
    srv.OnBinaryEvent("/", "upload_chunk", func(c sio.Conn, args []interface{}, id *int) {
        log.Printf("Received binary packet from %s with %d arguments", c.ID(), len(args))
        
        for i, arg := range args {
            if buf, ok := arg.([]byte); ok {
                log.Printf("Chunk #%d received: %d raw bytes", i, len(buf))
            }
        }
    })

    // Emit binary buffers back to client
    srv.OnEvent("/", "request_avatar", func(c sio.Conn, _ []json.RawMessage) {
        rawImageData := []byte{0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A} // PNG magic
        _ = c.Emit("avatar_data", rawImageData)
    })
}`,
    highlights: [
      "Transfers binary buffers as native WebSocket frames in RFC 6455 compliant format",
      "Zero allocations in packet reconstruction pipeline",
      "Automatic base64 fallback for long-polling fallback clients"
    ]
  },
  {
    id: "step-7-engineio-options",
    number: "07",
    title: "Custom Engine.IO Configuration",
    shortDesc: "Fine-tune heartbeats, payload thresholds, and connection limits.",
    summary: "Customize ping timeouts, payload constraints, and CORS headers for production environments.",
    filename: "config.go",
    language: "go",
    code: `package main

import (
    "time"
    sio "github.com/shishir1290/gsocketio"
)

func createConfiguredServer() *sio.Server {
    options := &sio.Options{
        // Engine.IO Heartbeat interval (default 25s)
        PingInterval: 30 * time.Second,
        
        // Timeout before client is considered dead (default 20s)
        PingTimeout: 15 * time.Second,
        
        // Maximum allowed incoming payload in bytes (default 1MB)
        MaxPayload: 10 * 1024 * 1024, // 10 Megabytes
    }

    return sio.New(options)
}`,
    highlights: [
      "Customizable PingInterval and PingTimeout matching client expectations",
      "Enforces max payload protection against DoS memory attacks",
      "Native CORS & OPTIONS preflight support"
    ]
  }
];

export const API_REFERENCE_DATA = [
  {
    category: "Server Methods (*sio.Server)",
    items: [
      { name: "sio.New(opts *Options) *Server", desc: "Creates a new Socket.IO v4 server instance. Passing nil uses optimal standard defaults." },
      { name: "ServeHTTP(w http.ResponseWriter, r *http.Request)", desc: "Implements standard http.Handler for net/http multiplexers (http.ServeMux, Chi, Gin, Fiber)." },
      { name: "Serve() error", desc: "Accepts and manages Engine.IO v4 transport sessions in the background asynchronously." },
      { name: "OnConnect(ns string, fn ConnectHandler)", desc: "Registers connection authentication hook for a namespace. Returning an error rejects the handshake with CONNECT_ERROR." },
      { name: "OnDisconnect(ns string, fn DisconnectHandler)", desc: "Registers disconnection callback receiving connection instance and reason string." },
      { name: "OnError(ns string, fn ErrorHandler)", desc: "Registers error listener for connection-level transport or decoding errors." },
      { name: "OnEvent(ns, event string, fn EventHandler)", desc: "Registers a listener for custom JSON events with raw JSON payload slices." },
      { name: "OnBinaryEvent(ns, event string, fn BinaryEventHandler)", desc: "Registers a listener for native binary events with raw byte buffer slices." },
      { name: "ToRoom(ns, room, event string, skip Conn, args...)", desc: "Broadcasts an event to all members in a room, optionally skipping a connection (e.g. sender)." },
      { name: "ToNamespace(ns, event string, args...)", desc: "Broadcasts an event to all active connections attached to a namespace." },
      { name: "RoomLen(ns, room string) int", desc: "Returns the current number of active connections subscribed to a room." },
      { name: "Count() int", desc: "Returns the total count of currently active transport sessions." },
      { name: "Close() error", desc: "Gracefully disconnects all active sessions, leaves all rooms, and shuts down transports." }
    ]
  },
  {
    category: "Conn Interface (sio.Conn)",
    items: [
      { name: "ID() string", desc: "Returns the unique 128-bit base64 Engine.IO session identifier (SID)." },
      { name: "Namespace() string", desc: "Returns the normalized namespace string (e.g. '/' or '/chat')." },
      { name: "Emit(event string, args...) error", desc: "Sends a JSON event packet to this specific connection." },
      { name: "EmitWithAck(event string, fn AckFunc, args...) error", desc: "Emits an event with an RPC callback executed upon client acknowledgment." },
      { name: "Join(room string)", desc: "Subscribes the connection to a room with thread-safe RWMutex protection." },
      { name: "Leave(room string)", desc: "Unsubscribes the connection from a room." },
      { name: "Rooms() []string", desc: "Returns a copy of all room names currently joined by this connection." },
      { name: "Context() interface{}", desc: "Thread-safely retrieves custom session context (e.g. auth claims, user ID)." },
      { name: "SetContext(v interface{})", desc: "Thread-safely stores custom session state on the connection." },
      { name: "Close() error", desc: "Closes the connection, leaves all joined rooms, and terminates the transport session." }
    ]
  },
  {
    category: "Configuration Options (sio.Options)",
    items: [
      { name: "PingInterval time.Duration", desc: "Engine.IO heartbeat interval sent in open packet (default: 25 * time.Second)." },
      { name: "PingTimeout time.Duration", desc: "Heartbeat response timeout before connection is considered dead (default: 20 * time.Second)." },
      { name: "MaxPayload int64", desc: "Maximum allowed incoming message payload in bytes to prevent DoS attacks (default: 1,000,000 bytes)." }
    ]
  },
  {
    category: "Handler Types & Callbacks",
    items: [
      { name: "type ConnectHandler func(Conn) error", desc: "Hook executed during namespace connection handshake. Return error to reject." },
      { name: "type DisconnectHandler func(Conn, string)", desc: "Hook executed when a connection closes, receiving the disconnect reason string." },
      { name: "type EventHandler func(Conn, []json.RawMessage)", desc: "Custom JSON event callback receiving connection and deserialized event arguments." },
      { name: "type BinaryEventHandler func(Conn, []interface{}, *int)", desc: "Binary event callback receiving connection, raw buffers, and optional ack ID." },
      { name: "type AckFunc func([]json.RawMessage, error)", desc: "Callback function passed to EmitWithAck for processing client replies." },
      { name: "type BinaryAckFunc func([]interface{}, error)", desc: "Binary acknowledgment callback function for raw byte buffer roundtrips." }
    ]
  }
];
