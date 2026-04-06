import { useState, useEffect } from "react";

const PRIORITY_COLORS = { high: "#ff4d00", medium: "#ffb84d", low: "#4d9fff" };

export default function FocusMode({ task, onDone, onSkip, onExit }) {
  const [seconds, setSeconds] = useState(25 * 60); // 25 min pomodoro
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) { setRunning(false); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  const pct = ((25 * 60 - seconds) / (25 * 60)) * 100;
  const circumference = 2 * Math.PI * 80;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", textAlign: "center" }}>
      {/* Back */}
      <button onClick={onExit} style={{ position: "fixed", top: 80, left: 24, background: "transparent", border: "1px solid #2a2a38", borderRadius: 8, color: "#8b8680", padding: "6px 14px", fontSize: 12, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>
        ← Back
      </button>

      <div style={{ marginBottom: 8, fontSize: 12, color: "#8b8680", fontFamily: "DM Sans, sans-serif", letterSpacing: 2, textTransform: "uppercase" }}>Focus Mode</div>

      <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 800, color: "#f5f0e8", maxWidth: 400, marginBottom: 4, letterSpacing: "-0.3px" }}>
        {task.title}
      </h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 40, alignItems: "center" }}>
        <span style={{ padding: "3px 10px", borderRadius: 4, fontSize: 11, fontFamily: "DM Sans, sans-serif", background: "#1a1a24", color: PRIORITY_COLORS[task.priority] }}>
          {task.priority} priority
        </span>
        <span style={{ padding: "3px 10px", borderRadius: 4, fontSize: 11, fontFamily: "DM Sans, sans-serif", background: "#1a1a24", color: "#8b8680", textTransform: "capitalize" }}>
          {task.category}
        </span>
      </div>

      {/* Timer ring */}
      <div style={{ position: "relative", marginBottom: 32 }}>
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#2a2a38" strokeWidth="6" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="#ff4d00" strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - pct / 100)}
            strokeLinecap="round"
            style={{ transform: "rotate(-90deg)", transformOrigin: "100px 100px", transition: "stroke-dashoffset 1s linear" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 36, fontWeight: 700, color: seconds === 0 ? "#4dff9f" : "#f5f0e8" }}>
            {seconds === 0 ? "Done!" : `${mins}:${secs}`}
          </span>
          <span style={{ fontSize: 11, color: "#8b8680", fontFamily: "DM Sans, sans-serif", marginTop: 2 }}>
            {running ? "focusing..." : seconds === 25 * 60 ? "ready to start" : "paused"}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 10 }}>
        {seconds > 0 && (
          <button onClick={() => setRunning((r) => !r)}
            style={{ padding: "10px 24px", background: running ? "#2a2a38" : "#ff4d00", border: "none", borderRadius: 8, color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>
            {running ? "⏸ Pause" : "▶ Start"}
          </button>
        )}
        <button onClick={onDone}
          style={{ padding: "10px 24px", background: "#4dff9f22", border: "1px solid #4dff9f44", borderRadius: 8, color: "#4dff9f", fontSize: 14, fontWeight: 600, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>
          ✓ Mark Done
        </button>
        <button onClick={onSkip}
          style={{ padding: "10px 24px", background: "transparent", border: "1px solid #2a2a38", borderRadius: 8, color: "#8b8680", fontSize: 14, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>
          Skip
        </button>
      </div>

      <p style={{ marginTop: 24, fontSize: 12, color: "#8b8680", fontFamily: "DM Sans, sans-serif" }}>
        Pomodoro timer · 25 minutes of focused work
      </p>
    </div>
  );
}
