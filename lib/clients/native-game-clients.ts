import { ClientPlatform } from "./types";

export const NATIVE_GAME_PLATFORMS: ClientPlatform[] = [
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
            print("Message received: \\(msg)")
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
