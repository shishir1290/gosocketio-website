"use client";

import { Play, Square, Send, Plus } from "lucide-react";

interface PlaygroundControlsProps {
  connected: boolean;
  sid: string | null;
  currentRoom: string;
  onRoomChange: (val: string) => void;
  onJoinRoom: () => void;
  eventName: string;
  onEventNameChange: (val: string) => void;
  eventPayload: string;
  onEventPayloadChange: (val: string) => void;
  onEmitEvent: () => void;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function PlaygroundControls({
  connected,
  sid,
  currentRoom,
  onRoomChange,
  onJoinRoom,
  eventName,
  onEventNameChange,
  eventPayload,
  onEventPayloadChange,
  onEmitEvent,
  onConnect,
  onDisconnect,
}: PlaygroundControlsProps) {
  return (
    <div className="lg:col-span-5 p-5 sm:p-6 bg-[var(--bg-card)] border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)] flex flex-col gap-5">
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
            onClick={onDisconnect}
            className="btn-secondary py-1.5 px-3.5 text-xs font-semibold border-red-500/40 text-red-500 hover:bg-red-500/10 cursor-pointer inline-flex items-center gap-1.5"
          >
            <Square size={13} fill="currentColor" /> Disconnect
          </button>
        ) : (
          <button
            type="button"
            onClick={onConnect}
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

      <div>
        <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1.5">
          Room Subscription
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={currentRoom}
            onChange={(e) => onRoomChange(e.target.value)}
            placeholder="room name (e.g. lobby)"
            className="flex-1 py-2 px-3 bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] text-xs sm:text-sm outline-none focus:border-[var(--accent-cyan)]"
          />
          <button
            type="button"
            onClick={onJoinRoom}
            disabled={!connected}
            className="btn-secondary py-2 px-3.5 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={14} /> Join
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="block text-xs font-bold text-[var(--text-secondary)]">
          Emit Custom Event
        </label>

        <input
          type="text"
          value={eventName}
          onChange={(e) => onEventNameChange(e.target.value)}
          placeholder="event name (e.g. chat)"
          className="py-2 px-3 bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] text-xs sm:text-sm outline-none focus:border-[var(--accent-cyan)]"
        />

        <textarea
          value={eventPayload}
          onChange={(e) => onEventPayloadChange(e.target.value)}
          rows={3}
          placeholder='{"key": "value"}'
          className="w-full py-2 px-3 bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] font-mono text-xs outline-none focus:border-[var(--accent-cyan)] resize-y"
        />

        <button
          type="button"
          onClick={onEmitEvent}
          disabled={!connected}
          className="btn-primary py-2.5 text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={14} /> Emit Event
        </button>
      </div>
    </div>
  );
}
