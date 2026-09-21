import { DocStep } from "./types";

export const GUIDE_STEP_3_4: DocStep[] = [
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
        rawAuth := c.Context()
        if rawAuth == nil {
            return errors.New("authentication required")
        }

        if authMap, ok := rawAuth.(map[string]interface{}); ok {
            token, _ := authMap["token"].(string)
            if token != "secret-api-token" {
                return errors.New("invalid or expired authentication token")
            }

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
  }
];
