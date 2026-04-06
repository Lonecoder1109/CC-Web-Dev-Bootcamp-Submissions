import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import StatsPage from "./pages/StatsPage";

const SAMPLE_TASKS = [
  { id: 1, title: "Design system architecture", category: "work", priority: "high", done: false, createdAt: Date.now() - 86400000 * 2 },
  { id: 2, title: "Read Atomic Habits (ch. 5)", category: "learning", priority: "medium", done: true, createdAt: Date.now() - 86400000 },
  { id: 3, title: "Morning run — 5km", category: "health", priority: "low", done: false, createdAt: Date.now() - 3600000 },
  { id: 4, title: "Review pull requests", category: "work", priority: "high", done: false, createdAt: Date.now() - 7200000 },
  { id: 5, title: "Call mom", category: "personal", priority: "medium", done: false, createdAt: Date.now() - 1800000 },
];

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("pt_tasks");
      return saved ? JSON.parse(saved) : SAMPLE_TASKS;
    } catch { return SAMPLE_TASKS; }
  });

  useEffect(() => {
    localStorage.setItem("pt_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks((prev) => [{ ...task, id: Date.now(), done: false, createdAt: Date.now() }, ...prev]);
  const toggleTask = (id) => setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));
  const clearCompleted = () => setTasks((prev) => prev.filter((t) => !t.done));

  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", background: "#0a0a0f" }}>
        <header style={{ borderBottom: "1px solid #2a2a38" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "#ff4d00", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontSize: 11, fontWeight: 800, fontFamily: "Syne, sans-serif" }}>PT</span>
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, fontFamily: "Syne, sans-serif", color: "#f5f0e8", letterSpacing: "-0.3px" }}>
                ProductivityTracker
              </span>
            </div>
            <nav style={{ display: "flex", gap: 4 }}>
              {[{ to: "/", label: "Tasks", end: true }, { to: "/stats", label: "Stats" }].map(({ to, label, end }) => (
                <NavLink key={to} to={to} end={end}
                  style={({ isActive }) => ({
                    padding: "6px 16px", borderRadius: 999, fontSize: 13, fontWeight: 500,
                    fontFamily: "DM Sans, sans-serif", textDecoration: "none", transition: "all 0.2s",
                    background: isActive ? "#f5f0e8" : "transparent",
                    color: isActive ? "#0a0a0f" : "#8b8680",
                  })}>
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>
        <main style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px" }}>
          <Routes>
            <Route path="/" element={<TasksPage tasks={tasks} onAdd={addTask} onToggle={toggleTask} onDelete={deleteTask} onClearCompleted={clearCompleted} />} />
            <Route path="/stats" element={<StatsPage tasks={tasks} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
