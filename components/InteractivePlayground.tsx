"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Square, Send, Plus, Trash2, CheckCircle2, Terminal, Activity, Layers } from "lucide-react";

interface LogEntry {
  id: string;
  time: string;
  type: "in" | "out" | "sys" | "err";
  text: string;
  raw?: string;
}

export default function InteractivePlayground() {
  const [connected, setConnected] = useState(false);
  const [sid, setSid] = useState<string | null>(null);
  const [currentNamespace, setCurrentNamespace] = useState("/");
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

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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

      // Simulate server response
      setTimeout(() => {
        const reply = { user: "GoServer", text: `Echo: received '${eventName}' from ${sid}` };
        addLog("in", `Server broadcasted '${eventName}_reply': ${JSON.stringify(reply)}`, `42["${eventName}_reply",${JSON.stringify(reply)}]`);
      }, 180);
    } catch {
      addLog("err", "Invalid JSON format in payload field.");
    }
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  return (
    <section id="playground" style={{ padding: "90px 0", position: "relative" }}>
      <div className="container">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          <div className="badge badge-cyan" style={{ marginBottom: "14px" }}>
            <Activity size={13} />
            <span>Interactive Tool</span>
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Live <span className="gradient-cyan-purple">Socket.IO Simulator</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: "680px", margin: "0 auto" }}>
            Test handshakes, room subscriptions, and packet inspection live in your browser against simulated gsocketio responses.
          </p>
        </motion.div>

        {/* Playground Box with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-panel"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "0",
            overflow: "hidden",
            border: "1px solid var(--border-active)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {/* Controls Column */}
          <div
            style={{
              padding: "24px",
              background: "var(--bg-card)",
              borderRight: "1px solid var(--border-subtle)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* Connection Status Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: connected ? "#10b981" : "#ef4444",
                    boxShadow: connected ? "0 0 10px #10b981" : "none",
                  }}
                />
                <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                  {connected ? "Connected" : "Disconnected"}
                </span>
              </div>

              {connected ? (
                <button
                  type="button"
                  onClick={handleDisconnect}
                  className="btn-secondary"
                  style={{ padding: "6px 14px", fontSize: "0.82rem", borderColor: "rgba(239, 68, 68, 0.4)", color: "#ef4444" }}
                >
                  <Square size={13} fill="currentColor" /> Disconnect
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConnect}
                  className="btn-primary"
                  style={{ padding: "6px 16px", fontSize: "0.82rem" }}
                >
                  <Play size={13} fill="currentColor" /> Connect
                </button>
              )}
            </div>

            {sid && (
              <div
                style={{
                  padding: "8px 12px",
                  background: "rgba(0, 242, 254, 0.08)",
                  border: "1px solid rgba(0, 242, 254, 0.25)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.82rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--accent-cyan)",
                }}
              >
                SID: <strong>{sid}</strong>
              </div>
            )}

            {/* Room Actions */}
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "6px" }}>
                Room Subscription
              </label>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  value={currentRoom}
                  onChange={(e) => setCurrentRoom(e.target.value)}
                  placeholder="room name (e.g. lobby)"
                  style={{
                    flex: 1,
                    padding: "9px 12px",
                    background: "var(--bg-input)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--text-primary)",
                    fontSize: "0.86rem",
                    outline: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={handleJoinRoom}
                  disabled={!connected}
                  className="btn-secondary"
                  style={{ padding: "9px 14px", fontSize: "0.82rem", opacity: connected ? 1 : 0.5 }}
                >
                  <Plus size={14} /> Join
                </button>
              </div>
            </div>

            {/* Event Dispatch */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                Emit Custom Event
              </label>

              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="event name (e.g. chat)"
                style={{
                  padding: "9px 12px",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--text-primary)",
                  fontSize: "0.86rem",
                  outline: "none",
                }}
              />

              <textarea
                value={eventPayload}
                onChange={(e) => setEventPayload(e.target.value)}
                rows={3}
                placeholder='{"key": "value"}'
                style={{
                  padding: "9px 12px",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.82rem",
                  resize: "vertical",
                  outline: "none",
                }}
              />

              <button
                type="button"
                onClick={handleEmitEvent}
                disabled={!connected}
                className="btn-primary"
                style={{ padding: "10px", fontSize: "0.88rem", opacity: connected ? 1 : 0.5 }}
              >
                <Send size={14} /> Emit Event
              </button>
            </div>
          </div>

          {/* Live Packet Log Stream */}
          <div
            style={{
              padding: "20px",
              background: "#060910",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "14px",
                paddingBottom: "10px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)", fontSize: "0.86rem" }}>
                <Terminal size={15} color="var(--accent-cyan)" />
                <span style={{ fontWeight: 600 }}>Live Wireframe Packet Stream</span>
              </div>

              <button
                onClick={handleClearLogs}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "0.78rem",
                }}
              >
                <Trash2 size={13} /> Clear
              </button>
            </div>

            <div
              ref={logContainerRef}
              style={{
                flex: 1,
                minHeight: "320px",
                maxHeight: "440px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.82rem",
              }}
            >
              {logs.map((log) => {
                let badgeColor = "#64748b";
                let badgeBg = "rgba(100, 116, 139, 0.15)";
                let prefix = "SYS";

                if (log.type === "in") {
                  badgeColor = "#10b981";
                  badgeBg = "rgba(16, 185, 129, 0.15)";
                  prefix = "RECV";
                } else if (log.type === "out") {
                  badgeColor = "#00f2fe";
                  badgeBg = "rgba(0, 242, 254, 0.15)";
                  prefix = "SEND";
                } else if (log.type === "err") {
                  badgeColor = "#ef4444";
                  badgeBg = "rgba(239, 68, 68, 0.15)";
                  prefix = "ERR";
                }

                return (
                  <div
                    key={log.id}
                    style={{
                      padding: "8px 12px",
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.04)",
                      borderRadius: "6px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          padding: "2px 6px",
                          borderRadius: "4px",
                          color: badgeColor,
                          background: badgeBg,
                        }}
                      >
                        {prefix}
                      </span>
                      <span style={{ color: "var(--text-muted)", fontSize: "0.74rem" }}>{log.time}</span>
                      <span style={{ color: "#e2e8f0", wordBreak: "break-all" }}>{log.text}</span>
                    </div>

                    {log.raw && (
                      <div
                        style={{
                          color: "var(--accent-cyan)",
                          fontSize: "0.76rem",
                          paddingLeft: "42px",
                          opacity: 0.85,
                        }}
                      >
                        Raw: {log.raw}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
