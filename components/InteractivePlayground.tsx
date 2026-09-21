"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { PlaygroundControls } from "./playground/PlaygroundControls";
import { PlaygroundTerminal } from "./playground/PlaygroundTerminal";
import { useSimulator } from "./playground/use-simulator";

export default function InteractivePlayground() {
  const {
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
  } = useSimulator();

  return (
    <section id="playground" className="pt-4 md:pt-6 pb-14 md:pb-20 relative">
      <div className="container">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-panel max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 overflow-hidden border border-[var(--border-active)] rounded-2xl shadow-xl"
        >
          <PlaygroundControls
            connected={connected}
            sid={sid}
            currentRoom={currentRoom}
            onRoomChange={setCurrentRoom}
            onJoinRoom={handleJoinRoom}
            eventName={eventName}
            onEventNameChange={setEventName}
            eventPayload={eventPayload}
            onEventPayloadChange={setEventPayload}
            onEmitEvent={handleEmitEvent}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />

          <PlaygroundTerminal
            logs={logs}
            onClearLogs={() => setLogs([])}
            logContainerRef={logContainerRef}
          />
        </motion.div>
      </div>
    </section>
  );
}
