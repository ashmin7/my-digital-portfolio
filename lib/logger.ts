export type LogLevel = "info" | "warn" | "error";

export function logEvent(message: string, level: LogLevel = "info", meta?: unknown) {
  // For now, just log to the browser or server console.
  // Later you could send this to an API route, a logging service, or a database.
  const payload = { message, level, meta, timestamp: new Date().toISOString() };
  // eslint-disable-next-line no-console
  console[level === "error" ? "error" : level === "warn" ? "warn" : "log"](
    "[SecurityJournal]",
    payload,
  );
}
