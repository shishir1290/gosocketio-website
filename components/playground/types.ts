export interface LogEntry {
  id: string;
  time: string;
  type: "in" | "out" | "sys" | "err";
  text: string;
  raw?: string;
}
