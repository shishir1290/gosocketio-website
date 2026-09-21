export const NODE_DETAILS_CORE: Record<
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
    code: `func computeAcceptKey(clientKey string) string {
    h := sha1.New()
    h.Write([]byte(strings.TrimSpace(clientKey) + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"))
    return base64.StdEncoding.EncodeToString(h.Sum(nil))
}

func unmaskPayload(payload []byte, maskKey [4]byte) {
    for i := 0; i < len(payload); i++ {
        payload[i] ^= maskKey[i%4]
    }
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
    code: `func (s *PollingSession) HandlePoll(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "text/plain; charset=UTF-8")
    select {
    case packet := <-s.sendQueue:
        w.Write(packet)
    case <-time.After(20 * time.Second):
        w.Write([]byte("6")) // Engine.IO Noop
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
    code: `func (s *Server) startHeartbeat(sess *Session) {
    sess.pingTicker = time.NewTicker(25 * time.Second)
    go func() {
        for range sess.pingTicker.C {
            if time.Since(sess.lastPing) > sess.pingTimeout {
                sess.Close("ping timeout")
                return
            }
            sess.WritePacket(Packet{Type: PacketPing})
        }
    }()
}`,
    specs: [
      "Thread-safe sync.Map session directory",
      "Built-in heartbeat ticker to prevent zombie TCP connections",
      "Packet Types: 0:Open, 1:Close, 2:Ping, 3:Pong, 4:Message, 5:Upgrade, 6:Noop",
    ],
  },
};
