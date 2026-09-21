import { DocStep } from "./types";

export const GUIDE_STEP_1_2: DocStep[] = [
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
    srv := sio.New(nil)

    srv.OnConnect("/", func(c sio.Conn) error {
        log.Printf("[+] Client connected: id=%s ns=%s", c.ID(), c.Namespace())
        return c.Emit("welcome", map[string]string{
            "message": "Welcome to pure-Go gsocketio server!",
            "sid":     c.ID(),
        })
    })

    srv.OnEvent("/", "ping", func(c sio.Conn, args []json.RawMessage) {
        log.Printf("Received ping from %s", c.ID())
        _ = c.Emit("pong", "pong payload")
    })

    srv.OnDisconnect("/", func(c sio.Conn, reason string) {
        log.Printf("[-] Client disconnected: id=%s reason=%s", c.ID(), reason)
    })

    go srv.Serve()

    http.Handle("/socket.io/", srv)
    log.Println("⚡ Server listening on http://localhost:8080/socket.io/")
    log.Fatal(http.ListenAndServe(":8080", nil))
}`,
    highlights: [
      "sio.New(nil) uses optimal defaults: 25s pingInterval, 20s pingTimeout, 1MB maxPayload",
      "srv.Serve() accepts incoming transports in the background asynchronously",
      "http.Handle('/socket.io/', srv) handles both HTTP Long-Polling and RFC 6455 WebSockets"
    ]
  }
];
