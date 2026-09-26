import { DocStep } from "./types";

export const GUIDE_STEPS_PART2: DocStep[] = [
  {
    id: "step-5-rooms-broadcast",
    number: "05",
    title: "Rooms & Broadcasting",
    shortDesc: "Manage room subscriptions and broadcast targeted messages with skip filters.",
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
        srv.ToRoom("/", msg.Room, "new_message", c, msg)
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
    id: "step-6-acknowledgments",
    number: "06",
    title: "Event Acknowledgment",
    shortDesc: "Send events with client acknowledgment callbacks or reply to client ACKs.",
    summary: "Socket.IO acknowledgments enable RPC-style request/reply patterns. Supports standard JSON ACKs and high-performance Binary ACKs.",
    filename: "acks.go",
    language: "go",
    code: `package main

import (
    "encoding/json"
    "log"
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
    id: "step-7-binary-events",
    number: "07",
    title: "Binary Buffers",
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
    id: "step-8-engineio-options",
    number: "08",
    title: "Production Config",
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
