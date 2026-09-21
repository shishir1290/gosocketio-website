import { ApiReferenceCategory } from "./types";

export const API_REFERENCE_DATA: ApiReferenceCategory[] = [
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
