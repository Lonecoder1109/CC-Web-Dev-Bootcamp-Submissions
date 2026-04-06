const PRIORITY_DOT = { high: "#ff4d00", medium: "#ffb84d", low: "#4d9fff" };
const CATEGORY_BADGE = { work: "#ff4d0022", learning: "#4d9fff22", health: "#4dff9f22", personal: "#ff4dcc22" };
const CATEGORY_TEXT = { work: "#ff4d00", learning: "#4d9fff", health: "#4dff9f", personal: "#ff4dcc" };

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="task-row" style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "12px 0", borderBottom: "1px solid #2a2a38",
      animation: "slideIn 0.25s ease",
      opacity: task.done ? 0.55 : 1, transition: "opacity 0.2s",
    }}>
      {/* Priority dot */}
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: PRIORITY_DOT[task.priority], flexShrink: 0 }} />

      {/* Checkbox */}
      <button onClick={() => onToggle(task.id)}
        style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${task.done ? "#ff4d00" : "#2a2a38"}`, background: task.done ? "#ff4d00" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
        {task.done && <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>✓</span>}
      </button>

      {/* Title */}
      <span style={{
        flex: 1, fontSize: 14, fontFamily: "DM Sans, sans-serif", color: "#f5f0e8",
        textDecoration: task.done ? "line-through" : "none",
      }}>
        {task.title}
      </span>

      {/* Category badge */}
      <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 11, fontFamily: "DM Sans, sans-serif", fontWeight: 500, background: CATEGORY_BADGE[task.category] || "#ffffff11", color: CATEGORY_TEXT[task.category] || "#8b8680", textTransform: "capitalize" }}>
        {task.category}
      </span>

      {/* Priority label */}
      <span style={{ fontSize: 11, color: "#8b8680", fontFamily: "JetBrains Mono, monospace", width: 48, textAlign: "right" }}>
        {task.priority}
      </span>

      {/* Delete */}
      <button className="task-actions" onClick={() => onDelete(task.id)}
        style={{ background: "transparent", border: "none", cursor: "pointer", color: "#8b8680", fontSize: 16, padding: "0 4px", lineHeight: 1 }}
        onMouseEnter={e => e.target.style.color = "#ff4d00"}
        onMouseLeave={e => e.target.style.color = "#8b8680"}>
        ×
      </button>
    </div>
  );
}

export default function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}
