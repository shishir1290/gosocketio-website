export const UPGRADE_STEPS = [
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
