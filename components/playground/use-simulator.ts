"use client";

import { useState, useRef, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { LogEntry } from "./types";

const DEFAULT_SERVER_URL = "https://gsocket-telemetry.onrender.com";

export function useSimulator() {
  const [connected, setConnected] = useState(false);
  const [sid, setSid] = useState<string | null>(null);
  const [serverUrl, setServerUrl] = useState(DEFAULT_SERVER_URL);
  const currentNamespace = "/";
  const [currentRoom, setCurrentRoom] = useState("lobby");
  const [eventName, setEventName] = useState("chat");
  const [eventPayload, setEventPayload] = useState('{"text": "Hello everyone from live simulation!"}');
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "1",
      time: "12:00:00",
      type: "sys",
      text: "Simulator ready. Connected endpoint: " + DEFAULT_SERVER_URL,
    },
  ]);

  const socketRef = useRef<Socket | null>(null);
  const logContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLogs([
      {
        id: "1",
        time: new Date().toLocaleTimeString(),
        type: "sys",
        text: "Live Simulator ready. Target: " + DEFAULT_SERVER_URL + ". Click 'Connect' to initiate WebSocket handshake.",
      },
    ]);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (type: LogEntry["type"], text: string, raw?: string) => {
    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        time: new Date().toLocaleTimeString(),
        type,
        text,
        raw,
      },
    ]);
  };

  const handleConnect = () => {
    if (connected || socketRef.current?.connected) return;

    addLog(
      "sys",
      `Initiating Engine.IO v4 handshake with ${serverUrl}/socket.io/?EIO=4&transport=websocket`
    );

    try {
      const socket = io(serverUrl, {
        transports: ["websocket", "polling"],
        reconnection: false,
        timeout: 8000,
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        setConnected(true);
        setSid(socket.id || "unknown");
        const transportName = socket.io.engine?.transport?.name || "websocket";

        addLog(
          "in",
          `Engine.IO open packet received! SID: ${socket.id}, Transport: ${transportName}`,
          `0{"sid":"${socket.id}","upgrades":["websocket"]}`
        );
        addLog(
          "out",
          `Connecting to namespace '${currentNamespace}'`,
          `40${currentNamespace === "/" ? "" : currentNamespace + ","}`
        );
        addLog(
          "in",
          `Namespace '${currentNamespace}' authorized! Session live.`,
          `40{"sid":"${socket.id}"}`
        );
      });

      // Catch-all listener for any event received from server
      socket.onAny((event: string, ...args: any[]) => {
        // Do not show high-frequency telemetry updates in live simulation console
        if (
          event === "telemetry:node_update" ||
          event === "telemetry:nodes_init" ||
          event === "telemetry:metrics"
        ) {
          return;
        }

        const payload = args.length === 1 ? args[0] : args;
        const payloadStr = JSON.stringify(payload);
        const rawPacket = `42["${event}",${payloadStr.length > 130 ? payloadStr.substring(0, 130) + "..." : payloadStr}]`;

        if (event === "chat" || event === "message" || event === "broadcast" || event === "simulation:message") {
          let text = "";
          let sender = "Peer";
          if (typeof payload === "object" && payload !== null) {
            sender = payload.sender || "Peer";
            if (payload.payload !== undefined) {
              if (typeof payload.payload === "object" && payload.payload !== null && payload.payload.text) {
                text = String(payload.payload.text);
              } else {
                text = typeof payload.payload === "object" ? JSON.stringify(payload.payload) : String(payload.payload);
              }
            } else if (payload.text !== undefined) {
              text = String(payload.text);
            } else {
              text = JSON.stringify(payload);
            }
          } else {
            text = String(payload);
          }
          addLog("in", `💬 [Broadcast from ${sender}]: ${text}`, rawPacket);
        } else if (event === "room_notification") {
          const msg = typeof payload === "object" && payload?.message ? payload.message : JSON.stringify(payload);
          addLog("sys", `🚪 ${msg}`, rawPacket);
        } else if (event === "telemetry:alert") {
          addLog("err", `⚠️ [ALERT ${payload?.nodeId || ""}]: ${payload?.message || "Incident detected"}`, rawPacket);
        } else if (event === "telemetry:pong") {
          addLog("in", `🏓 Pong received: ${payloadStr}`, rawPacket);
        } else {
          addLog(
            "in",
            `Server event '${event}': ${payloadStr.length > 90 ? payloadStr.substring(0, 90) + "..." : payloadStr}`,
            rawPacket
          );
        }
      });

      socket.on("disconnect", (reason: string) => {
        setConnected(false);
        setSid(null);
        addLog("sys", `Session closed: ${reason}`);
      });

      socket.on("connect_error", (err: Error) => {
        setConnected(false);
        setSid(null);
        addLog("err", `Connection failed: ${err.message}`);
      });
    } catch (err: any) {
      addLog("err", `Socket init error: ${err.message}`);
    }
  };

  const handleDisconnect = () => {
    if (socketRef.current) {
      addLog("out", "Sent disconnect packet", "41");
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setConnected(false);
    setSid(null);
    addLog("sys", "Disconnected.");
  };

  const handleJoinRoom = () => {
    if (!socketRef.current || !connected) {
      addLog("err", "Cannot join room while disconnected.");
      return;
    }

    const room = currentRoom.trim() || "lobby";
    addLog("out", `Emitting 'join_room' for '${room}'`, `42["join_room","${room}"]`);
    socketRef.current.emit("join_room", room);
    addLog("in", `Joined room '${room}' successfully.`);
  };

  const handleEmitEvent = () => {
    if (!socketRef.current || !connected) {
      addLog("err", "Cannot emit event while disconnected.");
      return;
    }

    try {
      let parsed: any;
      try {
        parsed = JSON.parse(eventPayload);
      } catch {
        parsed = eventPayload;
      }

      const rawPacket = `42["${eventName}",${JSON.stringify(parsed)}]`;
      addLog("out", `Emitted '${eventName}': ${eventPayload}`, rawPacket);

      socketRef.current.emit(eventName, parsed);
    } catch {
      addLog("err", "Invalid JSON format in payload field.");
    }
  };

  return {
    connected,
    sid,
    serverUrl,
    setServerUrl,
    currentRoom,
    setCurrentRoom,
    eventName,
    setEventName,
    eventPayload,
    setEventPayload,
    logs,
    setLogs,
    logContainerRef,
    handleConnect,
    handleDisconnect,
    handleJoinRoom,
    handleEmitEvent,
  };
}
