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
    id: "step-4-namespaces",
    number: "04",
    title: "Namespaces & Routing",
    shortDesc: "Segment real-time communications into isolated namespace trees.",
    summary: "gsocketio supports dynamic and static Socket.IO namespaces, allowing multi-tenant architectures, isolated chat domains, and distinct event handlers.",
    filename: "namespaces.go",
    language: "go",
    code: `package main

import (
    "encoding/json"
    "log"
    sio "github.com/shishir1290/gsocketio"
)

func setupNamespaces(srv *sio.Server) {
    // 1. Root default namespace "/"
    srv.OnConnect("/", func(c sio.Conn) error {
        log.Printf("Connected to main lobby: %s", c.ID())
        return nil
    })

    // 2. Dedicated admin namespace "/admin" with restricted privileges
    srv.OnConnect("/admin", func(c sio.Conn) error {
        log.Printf("Admin operator connected: %s", c.ID())
        _ = c.Emit("admin_status", map[string]string{"status": "online", "mode": "cluster"})
        return nil
    })

    srv.OnEvent("/admin", "system_reboot", func(c sio.Conn, args []json.RawMessage) {
        log.Println("Admin initiated system maintenance command")
    })

    // 3. Isolated multi-tenant game or chat namespace "/chat"
    srv.OnConnect("/chat", func(c sio.Conn) error {
        log.Printf("Chat client %s entered /chat namespace", c.ID())
        return nil
    })
}`,
    highlights: [
      "Completely isolated event namespaces and connection maps",
      "Per-namespace connect/disconnect lifecycles and middleware authorization",
      "Zero cross-namespace event leakage with zero memory overhead"
    ]
  }
];
