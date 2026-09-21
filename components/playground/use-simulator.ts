"use client";

import { useState, useRef, useEffect } from "react";
import { LogEntry } from "./types";

export function useSimulator() {
  const [connected, setConnected] = useState(false);
  const [sid, setSid] = useState<string | null>(null);
  const currentNamespace = "/";
  const [currentRoom, setCurrentRoom] = useState("lobby");
  const [eventName, setEventName] = useState("chat");
  const [eventPayload, setEventPayload] = useState('{"text": "Hello Go socket!"}');
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "1",
      time: "12:00:00",
      type: "sys",
      text: "Simulator ready. Click 'Connect' to initialize simulated WebSocket session.",
    },
  ]);

  useEffect(() => {
    setLogs([
      {
        id: "1",
        time: new Date().toLocaleTimeString(),
        type: "sys",
        text: "Simulator ready. Click 'Connect' to initialize simulated WebSocket session.",
      },
    ]);
  }, []);

  const logContainerRef = useRef<HTMLDivElement | null>(null);

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
    if (connected) return;
    addLog("sys", "Initiating WebSocket upgrade to http://localhost:8080/socket.io/?EIO=4&transport=websocket");
    
    setTimeout(() => {
      const generatedSid = "ws_" + Math.random().toString(36).substring(2, 10);
      setSid(generatedSid);
      setConnected(true);
      addLog("in", `Engine.IO open packet received. SID: ${generatedSid}, pingInterval=25000ms`, '0{"sid":"' + generatedSid + '"}');
      addLog("out", `Connecting to namespace '${currentNamespace}'`, `40${currentNamespace === "/" ? "" : currentNamespace + ","}`);
      
      setTimeout(() => {
        addLog("in", `Namespace '${currentNamespace}' connection authorized!`, `40${currentNamespace === "/" ? "" : currentNamespace + ","}{"sid":"${generatedSid}"}`);
      }, 150);
    }, 250);
  };

  const handleDisconnect = () => {
    if (!connected) return;
    addLog("out", "Sent disconnect packet", "41");
    setConnected(false);
    setSid(null);
    addLog("sys", "Session closed.");
  };

  const handleJoinRoom = () => {
    if (!connected) {
      addLog("err", "Cannot join room while disconnected.");
      return;
    }
    addLog("out", `Emitting 'join_room' for '${currentRoom}'`, `42${currentNamespace === "/" ? "" : currentNamespace + ","}["join_room","${currentRoom}"]`);
    setTimeout(() => {
      addLog("in", `Subscribed to room '${currentRoom}' successfully.`);
    }, 100);
  };

  const handleEmitEvent = () => {
    if (!connected) {
      addLog("err", "Cannot emit event while disconnected.");
      return;
    }

    try {
      const parsed = JSON.parse(eventPayload);
      const rawPacket = `42${currentNamespace === "/" ? "" : currentNamespace + ","}["${eventName}",${JSON.stringify(parsed)}]`;
      addLog("out", `Emitted '${eventName}': ${eventPayload}`, rawPacket);

      setTimeout(() => {
        const reply = { user: "GoServer", text: `Echo: received '${eventName}' from ${sid}` };
        addLog("in", `Server broadcasted '${eventName}_reply': ${JSON.stringify(reply)}`, `42["${eventName}_reply",${JSON.stringify(reply)}]`);
      }, 180);
    } catch {
      addLog("err", "Invalid JSON format in payload field.");
    }
  };

  return {
    connected,
    sid,
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
