export const NODE_DETAILS_SIO: Record<
  string,
  { title: string; subtitle: string; tag: string; description: string; code: string; specs: string[] }
> = {
  socketio: {
    title: "Socket.IO v5 Codec & Router",
    subtitle: "Namespace Multiplexer & ACK Resolver",
    tag: "JSON & Binary Codec",
    description:
      "Encapsulates Socket.IO v5 protocol rules over Engine.IO message frames. Parses packet headers, isolates namespaces ('/', '/chat'), manages ACK reply callbacks with atomic IDs, and unpacks binary payloads.",
    code: `func DecodeSIOPacket(raw string) (*SIOPacket, error) {
    pkt := &SIOPacket{Namespace: "/"}
    pkt.Type = PacketType(raw[0] - '0')
    cursor := 1
    if cursor < len(raw) && raw[cursor] == '/' {
        commaIdx := strings.IndexByte(raw[cursor:], ',')
        pkt.Namespace = raw[cursor : cursor+commaIdx]
        cursor += commaIdx + 1
    }
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
    code: `func (ns *Namespace) ToRoom(room, event string, sender Conn, data any) {
    ns.mu.RLock()
    defer ns.mu.RUnlock()
    members, ok := ns.rooms[room]
    if !ok || len(members) == 0 {
        return
    }
    packet := encodeEvent(ns.name, event, data)
    for _, client := range members {
        if sender != nil && client.ID() == sender.ID() {
            continue
        }
        go client.SendFrame(packet)
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
    code: `func main() {
    srv := sio.New(&sio.Options{
        PingInterval: 25 * time.Second,
        PingTimeout:  20 * time.Second,
        MaxPayload:   1_000_000,
    })
    srv.OnConnect("/chat", func(c sio.Conn) error {
        c.Join("general")
        return c.Emit("welcome", "Connected to Pure Go Socket.IO!")
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
