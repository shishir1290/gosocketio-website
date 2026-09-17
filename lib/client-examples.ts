export interface ClientPlatform {
  id: string;
  name: string;
  icon: string;
  installCmd: string;
  language: string;
  code: string;
  description: string;
}

export const CLIENT_PLATFORMS: ClientPlatform[] = [
  {
    id: "javascript",
    name: "JavaScript / React / Next.js",
    icon: "🌐",
    installCmd: "npm install socket.io-client",
    language: "typescript",
    description: "Official Socket.IO client for browsers, React, Next.js, and Node.js.",
    code: `import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

// Initialize client with WebSocket preference and auth token
export const socket: Socket = io("http://localhost:8080", {
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
  },
  {
    id: "swift",
    name: "Swift (iOS / macOS)",
    icon: "🍏",
    installCmd: "SPM: https://github.com/socketio/socket.io-client-swift",
    language: "swift",
    description: "Native iOS, iPadOS, and macOS real-time integration.",
    code: `import Foundation
import SocketIO

class RealtimeManager: ObservableObject {
    private var manager: SocketManager
    private var socket: SocketIOClient

    init() {
        self.manager = SocketManager(
            socketURL: URL(string: "http://localhost:8080")!,
            config: [.log(true), .compress, .connectParams(["token": "secret-api-token"])]
        )
        self.socket = manager.defaultSocket
        setupHandlers()
    }

    private func setupHandlers() {
        socket.on(clientEvent: .connect) { data, ack in
            print("Connected to gsocketio backend!")
            self.socket.emit("join_room", "apple_lobby")
        }

        socket.on("new_message") { data, ack in
            guard let msg = data[0] as? [String: Any] else { return }
            print("Message received: \(msg)")
        }

        socket.connect()
    }

    func send(text: String) {
        socket.emit("send_message", ["room": "apple_lobby", "text": text, "user": "iOS"])
    }
}`
  },
  {
    id: "android",
    name: "Android (Kotlin / Java)",
    icon: "🤖",
    installCmd: "implementation 'io.socket:socket.io-client:2.1.0'",
    language: "kotlin",
    description: "Native Android background services and UI bindings.",
    code: `import io.socket.client.IO
import io.socket.client.Socket
import org.json.JSONObject

class RealtimeClient {
    private var mSocket: Socket? = null

    fun connect() {
        val opts = IO.Options().apply {
            transports = arrayOf("websocket")
            auth = mapOf("token" to "secret-api-token", "userId" to "android_client")
        }
        
        mSocket = IO.socket("http://10.0.2.2:8080", opts)

        mSocket?.on(Socket.EVENT_CONNECT) {
            println("Connected to Go backend: \${mSocket?.id()}")
            mSocket?.emit("join_room", "android_channel")
        }

        mSocket?.on("new_message") { args ->
            val data = args[0] as JSONObject
            println("New chat message: \$data")
        }

        mSocket?.connect()
    }

    fun send(room: String, text: String) {
        val json = JSONObject().apply {
            put("room", room)
            put("text", text)
            put("user", "Android")
        }
        mSocket?.emit("send_message", json)
    }
}`
  },
  {
    id: "unity",
    name: "Unity / C#",
    icon: "🎮",
    installCmd: "OpenUPM: com.socketio.unity or NuGet SocketIOClient",
    language: "csharp",
    description: "Real-time multiplayer game synchronization with Go backend.",
    code: `using System;
using System.Collections.Generic;
using SocketIOClient;
using UnityEngine;

public class GameNetworkManager : MonoBehaviour
{
    private SocketIOUnity socket;

    async void Start()
    {
        var uri = new Uri("http://localhost:8080");
        socket = new SocketIOUnity(uri, new SocketIOOptions
        {
            Transport = SocketIOClient.Transport.TransportProtocol.WebSocket,
            Auth = new Dictionary<string, string> { { "token", "unity_game_client" } }
        });

        socket.OnConnected += (sender, e) =>
        {
            Debug.Log($"Connected to gsocketio server: {socket.Id}");
            socket.Emit("join_room", "game_world_1");
        };

        socket.On("player_moved", response =>
        {
            var data = response.GetValue<PlayerPosition>();
            Debug.Log($"Player moved to: {data.x}, {data.y}");
        });

        await socket.ConnectAsync();
    }

    public void MovePlayer(float x, float y)
    {
        socket.Emit("player_moved", new { room = "game_world_1", x = x, y = y });
    }
}`
  }
];
