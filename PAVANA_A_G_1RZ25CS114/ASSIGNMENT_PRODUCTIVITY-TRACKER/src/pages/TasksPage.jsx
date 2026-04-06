import { useState, useEffect } from "react";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";
import FocusMode from "../components/FocusMode";

const FILTERS = ["all", "active", "done"];
const CATEGORIES = ["all", "work", "learning", "health", "personal"];
const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "priority", label: "Priority" },
  { value: "category", label: "Category" },
];
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

export default function TasksPage({ tasks, onAdd, onToggle, onDelete, onClearCompleted }) {
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [focusMode, setFocusMode] = useState(false);
  const [focusTask, setFocusTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Smart feature: Pick a random pending task for focus
  const pickRandomTask = () => {
    const pending = tasks.filter((t) => !t.done);
    if (!pending.length) return;
    const pick = pending[Math.floor(Math.random() * pending.length)];
    setFocusTask(pick);
    setFocusMode(true);
  };

  const filtered = tasks
    .filter((t) => {
      if (filter === "active") return !t.done;
      if (filter === "done") return t.done;
      return true;
    })
    .filter((t) => category === "all" || t.category === category)
    .sort((a, b) => {
      if (sort === "priority") return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      if (sort === "category") return a.category.localeCompare(b.category);
      return b.createdAt - a.createdAt;
    });

  const doneCount = tasks.filter((t) => t.done).length;
  const activeCount = tasks.filter((t) => !t.done).length;

  if (focusMode && focusTask) {
    return (
      <FocusMode
        task={focusTask}
        onDone={() => { onToggle(focusTask.id); setFocusMode(false); }}
        onSkip={() => { setFocusMode(false); setFocusTask(null); }}
        onExit={() => setFocusMode(false)}
      />
    );
  }

  return (
    <div>
      {/* Page header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 28, fontWeight: 800, color: "#f5f0e8", margin: 0, letterSpacing: "-0.5px" }}>
            My Tasks
          </h1>
          <p style={{ color: "#8b8680", fontSize: 13, marginTop: 4, fontFamily: "DM Sans, sans-serif" }}>
            {activeCount} pending · {doneCount} completed
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={pickRandomTask}
            style={{ padding: "8px 16px", background: "transparent", border: "1px solid #2a2a38", borderRadius: 8, color: "#8b8680", fontSize: 12, fontFamily: "DM Sans, sans-serif", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s" }}
            onMouseEnter={e => { e.target.style.borderColor = "#ff4d00"; e.target.style.color = "#ff4d00"; }}
            onMouseLeave={e => { e.target.style.borderColor = "#2a2a38"; e.target.style.color = "#8b8680"; }}>
            🎲 Focus random
          </button>
          <button onClick={() => setShowForm((v) => !v)}
            style={{ padding: "8px 16px", background: showForm ? "#cc3d00" : "#ff4d00", border: "none", borderRadius: 8, color: "#fff", fontSize: 12, fontWeight: 600, fontFamily: "DM Sans, sans-serif", cursor: "pointer", transition: "all 0.2s" }}>
            {showForm ? "✕ Cancel" : "+ Add Task"}
          </button>
        </div>
      </div>

      {/* Add form */}
      {showForm && <AddTaskForm onAdd={(t) => { onAdd(t); setShowForm(false); }} />}

      {/* Filters */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        {/* Status filter */}
        <div style={{ display: "flex", background: "#1a1a24", borderRadius: 8, padding: 3 }}>
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: "5px 12px", borderRadius: 6, border: "none", fontSize: 12, fontFamily: "DM Sans, sans-serif", cursor: "pointer", transition: "all 0.15s", fontWeight: 500, textTransform: "capitalize",
                background: filter === f ? "#f5f0e8" : "transparent",
                color: filter === f ? "#0a0a0f" : "#8b8680",
              }}>
              {f}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "6px 12px", background: "#1a1a24", border: "1px solid #2a2a38", borderRadius: 8, color: "#f5f0e8", fontSize: 12, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c === "all" ? "All categories" : c.charAt(0).toUpperCase() + c.slice(1)}</option>
          ))}
        </select>

        {/* Sort */}
        <select value={sort} onChange={(e) => setSort(e.target.value)}
          style={{ padding: "6px 12px", background: "#1a1a24", border: "1px solid #2a2a38", borderRadius: 8, color: "#f5f0e8", fontSize: 12, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>Sort: {s.label}</option>
          ))}
        </select>

        {doneCount > 0 && (
          <button onClick={onClearCompleted}
            style={{ marginLeft: "auto", padding: "6px 12px", background: "transparent", border: "1px solid #2a2a38", borderRadius: 8, color: "#8b8680", fontSize: 12, fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}
            onMouseEnter={e => e.target.style.color = "#ff4d00"}
            onMouseLeave={e => e.target.style.color = "#8b8680"}>
            Clear completed
          </button>
        )}
      </div>

      {/* Task list */}
      <TaskList tasks={filtered} onToggle={onToggle} onDelete={onDelete} />

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 0", color: "#8b8680", fontFamily: "DM Sans, sans-serif" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>✓</div>
          <p style={{ fontSize: 14 }}>No tasks here. {filter === "all" ? "Add one above!" : "Try a different filter."}</p>
        </div>
      )}
    </div>
  );
}
