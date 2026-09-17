"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Square, Send, Plus, Trash2, Terminal, Activity } from "lucide-react";

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
  const [currentNamespace] = useState("/");
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
    <section id="playground" className="py-20 md:py-24 relative">
      <div className="container">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <div className="badge badge-cyan mb-3.5">
            <Activity size={13} />
            <span>Interactive Tool</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-[var(--text-primary)]">
            Live <span className="gradient-cyan-purple">Socket.IO Simulator</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-2xl mx-auto">
            Test handshakes, room subscriptions, and packet inspection live in your browser against simulated gsocketio responses.
          </p>
        </motion.div>

        {/* Playground Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-panel max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 overflow-hidden border border-[var(--border-active)] rounded-2xl shadow-xl"
        >
          {/* Controls Column */}
          <div className="lg:col-span-5 p-5 sm:p-6 bg-[var(--bg-card)] border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)] flex flex-col gap-5">
            {/* Connection Status Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    connected
                      ? "bg-emerald-500 shadow-[0_0_10px_#10b981]"
                      : "bg-red-500"
                  }`}
                />
                <span className="font-bold text-sm sm:text-base text-[var(--text-primary)]">
                  {connected ? "Connected" : "Disconnected"}
                </span>
              </div>

              {connected ? (
                <button
                  type="button"
                  onClick={handleDisconnect}
                  className="btn-secondary py-1.5 px-3.5 text-xs font-semibold border-red-500/40 text-red-500 hover:bg-red-500/10 cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Square size={13} fill="currentColor" /> Disconnect
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConnect}
                  className="btn-primary py-1.5 px-4 text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Play size={13} fill="currentColor" /> Connect
                </button>
              )}
            </div>

            {sid && (
              <div className="p-2.5 px-3 bg-cyan-400/10 border border-cyan-400/25 rounded-lg text-xs font-mono text-[var(--accent-cyan)] truncate">
                SID: <strong>{sid}</strong>
              </div>
            )}

            {/* Room Actions */}
            <div>
              <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1.5">
                Room Subscription
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentRoom}
                  onChange={(e) => setCurrentRoom(e.target.value)}
                  placeholder="room name (e.g. lobby)"
                  className="flex-1 py-2 px-3 bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] text-xs sm:text-sm outline-none focus:border-[var(--accent-cyan)]"
                />
                <button
                  type="button"
                  onClick={handleJoinRoom}
                  disabled={!connected}
                  className="btn-secondary py-2 px-3.5 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={14} /> Join
                </button>
              </div>
            </div>

            {/* Event Dispatch */}
            <div className="flex flex-col gap-2.5">
              <label className="block text-xs font-bold text-[var(--text-secondary)]">
                Emit Custom Event
              </label>

              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="event name (e.g. chat)"
                className="py-2 px-3 bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] text-xs sm:text-sm outline-none focus:border-[var(--accent-cyan)]"
              />

              <textarea
                value={eventPayload}
                onChange={(e) => setEventPayload(e.target.value)}
                rows={3}
                placeholder='{"key": "value"}'
                className="w-full py-2 px-3 bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] font-mono text-xs outline-none focus:border-[var(--accent-cyan)] resize-y"
              />

              <button
                type="button"
                onClick={handleEmitEvent}
                disabled={!connected}
                className="btn-primary py-2.5 text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={14} /> Emit Event
              </button>
            </div>
          </div>

          {/* Live Packet Log Stream */}
          <div className="lg:col-span-7 p-5 bg-[#060910] flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-white/10">
              <div className="flex items-center gap-2 text-[var(--text-secondary)] text-xs sm:text-sm font-semibold">
                <Terminal size={15} className="text-[var(--accent-cyan)] shrink-0" />
                <span>Live Wireframe Packet Stream</span>
              </div>

              <button
                type="button"
                onClick={handleClearLogs}
                className="bg-transparent border-0 text-[var(--text-muted)] hover:text-white cursor-pointer inline-flex items-center gap-1 text-xs transition-colors"
              >
                <Trash2 size={13} /> Clear
              </button>
            </div>

            <div
              ref={logContainerRef}
              className="flex-1 min-h-[300px] max-h-[440px] overflow-y-auto flex flex-col gap-2 font-mono text-xs"
            >
              {logs.map((log) => {
                let badgeColor = "text-slate-400 bg-slate-500/15";
                let prefix = "SYS";

                if (log.type === "in") {
                  badgeColor = "text-emerald-400 bg-emerald-500/15";
                  prefix = "RECV";
                } else if (log.type === "out") {
                  badgeColor = "text-cyan-400 bg-cyan-400/15";
                  prefix = "SEND";
                } else if (log.type === "err") {
                  badgeColor = "text-red-400 bg-red-500/15";
                  prefix = "ERR";
                }

                return (
                  <div
                    key={log.id}
                    className="p-2.5 bg-white/[0.02] border border-white/[0.04] rounded-lg flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                      <span
                        className={`text-[0.68rem] font-bold py-0.5 px-1.5 rounded ${badgeColor} shrink-0`}
                      >
                        {prefix}
                      </span>
                      <span className="text-[var(--text-muted)] text-[0.72rem] shrink-0">
                        {log.time}
                      </span>
                      <span className="text-slate-200 break-all">{log.text}</span>
                    </div>

                    {log.raw && (
                      <div className="text-[var(--accent-cyan)] text-[0.76rem] pl-9 opacity-85 break-all">
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
