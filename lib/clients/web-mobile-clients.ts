import { ClientPlatform } from "./types";

export const WEB_MOBILE_PLATFORMS: ClientPlatform[] = [
  {
    id: "javascript",
    name: "JavaScript / React / Next.js",
    icon: "🌐",
    installCmd: "npm install socket.io-client",
    language: "typescript",
    description: "Official Socket.IO client for browsers, React, Next.js, and Node.js.",
    code: `import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

// Initialize client (or use "https://gsocket-telemetry.onrender.com" for live demo)
export const socket: Socket = io("https://gsocket-telemetry.onrender.com", {
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionDelay: 1000,
  auth: {
    token: "your-jwt-auth-token",
    userId: "user_123"
  }
});

// React Hook Example
export function useChatRoom(roomName: string) {
  const [messages, setMessages] = useState<Array<{ user: string; text: string }>>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to gsocketio server:", socket.id);
      // Join targeted room
      socket.emit("join_room", roomName);
    });

    socket.on("new_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection rejected:", err.message);
    });

    return () => {
      socket.emit("leave_room", roomName);
      socket.off("new_message");
      socket.off("connect");
    };
  }, [roomName]);

  const sendMessage = (text: string) => {
    socket.emit("send_message", { room: roomName, text, user: "Alice" });
  };

  return { messages, sendMessage };
}`
  },
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    installCmd: "pip install \"python-socketio[client]\"",
    language: "python",
    description: "Connect Python background workers, AI pipelines, and scripts.",
    code: `import socketio

# Create Socket.IO v4 client
sio = socketio.Client(reconnection=True)

@sio.event
def connect():
    print(f"Connected to gsocketio server! SID: {sio.get_sid()}")
    sio.emit("join_room", "ai_cluster")

@sio.event
def disconnect():
    print("Disconnected from server")

@sio.on("new_message")
def on_message(data):
    print(f"Received message from Go server: {data}")

# Connect with auth headers & payload
sio.connect(
    "http://localhost:8080",
    transports=["websocket"],
    auth={"token": "secret-api-token", "userId": "py_worker"}
)

# Send an event
sio.emit("send_message", {"room": "ai_cluster", "text": "Python worker ready", "user": "PyWorker"})
sio.wait()`
  },
  {
    id: "flutter",
    name: "Flutter / Dart",
    icon: "📱",
    installCmd: "flutter pub add socket_io_client",
    language: "dart",
    description: "Cross-platform mobile and desktop real-time connectivity.",
    code: `import 'package:socket_io_client/socket_io_client.dart' as IO;

class SocketService {
  late IO.Socket socket;

  void initSocket() {
    socket = IO.io('http://localhost:8080', IO.OptionBuilder()
      .setTransports(['websocket']) // Use pure WebSocket
      .enableAutoConnect()
      .setAuth({'token': 'secret-api-token', 'userId': 'mobile_user'})
      .build());

    socket.onConnect((_) {
      print('Connected to gsocketio Go backend: \${socket.id}');
      socket.emit('join_room', 'mobile_feed');
    });

    socket.on('new_message', (data) {
      print('Incoming broadcast: \$data');
    });

    socket.onDisconnect((reason) => print('Disconnected: \$reason'));
  }

  void sendMessage(String room, String text) {
    socket.emit('send_message', {'room': room, 'text': text, 'user': 'MobileUser'});
  }
}`
  }
];
