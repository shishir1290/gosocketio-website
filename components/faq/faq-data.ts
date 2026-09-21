export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "Compatibility" | "Architecture" | "Performance" | "Usage";
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "compatibility-v4",
    question: "Is gsocketio compatible with official Socket.IO v4 client libraries?",
    answer:
      "Yes. gsocketio implements 100% of the Socket.IO v4 and Engine.IO v4 wire protocol specifications. It connects seamlessly with official JavaScript/TypeScript (socket.io-client), Python (python-socketio), Flutter (socket_io_client), Swift (Socket.IO-Client-Swift), Android Kotlin/Java, and Unity C# clients without needing custom polyfills or protocol shims.",
    category: "Compatibility",
  },
  {
    id: "zero-dependencies",
    question: "Does gsocketio require Gorilla WebSocket, CGo, or external packages?",
    answer:
      "No. gsocketio is built 100% on the Go standard library (net/http, bufio, crypto/sha1, encoding/json). It has zero third-party dependencies in go.mod/go.sum, eliminating supply-chain risks, CGo compile hurdles, and version deprecation issues.",
    category: "Architecture",
  },
  {
    id: "gorilla-difference",
    question: "How does gsocketio differ from Gorilla WebSocket or standard WebSockets?",
    answer:
      "While Gorilla WebSocket only handles raw RFC 6455 frame transport, gsocketio is a complete real-time application server providing Engine.IO v4 session lifecycles, HTTP long-polling fallback, automatic transport upgrade handshakes, namespace multi-tenancy, concurrent room fan-out, and binary/JSON event acknowledgment callbacks.",
    category: "Architecture",
  },
  {
    id: "performance-throughput",
    question: "What is the performance and concurrency benchmark of gsocketio?",
    answer:
      "gsocketio achieves sub-millisecond latencies (<0.2ms) and scales to hundreds of thousands of concurrent client connections per Go instance. It leverages Go's http.Hijacker for raw TCP socket control with TCP_NODELAY, atomic heartbeat tickers, sync.RWMutex room indexing, and stack-allocated frame decoders with 0-heap allocation hot paths.",
    category: "Performance",
  },
  {
    id: "auth-handling",
    question: "How do I implement JWT or token-based authentication in gsocketio?",
    answer:
      "Client authentication tokens passed in the handshake auth payload or query parameters are parsed during the OnConnect hook. You can validate the JWT or API key and reject unauthorized handshakes by returning an error, which automatically replies with a standard 44 CONNECT_ERROR packet, or save the verified user identity to c.SetContext() for thread-safe access in subsequent events.",
    category: "Usage",
  },
  {
    id: "binary-streams",
    question: "Can I stream binary buffers ([]byte / Uint8Array) without base64 encoding?",
    answer:
      "Yes. gsocketio supports native RFC 6455 Binary Opcode (0x02) frames. Binary payloads (like file uploads, audio chunks, and images) are transferred as raw byte buffers without base64 inflation or string transcoding overhead.",
    category: "Performance",
  },
];
