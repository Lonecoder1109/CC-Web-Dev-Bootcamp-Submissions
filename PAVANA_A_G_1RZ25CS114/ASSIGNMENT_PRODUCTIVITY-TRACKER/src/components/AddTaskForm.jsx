import { useState } from "react";

const inputStyle = {
  background: "#0a0a0f",
  border: "1px solid #2a2a38",
  borderRadius: 8,
  color: "#f5f0e8",
  padding: "10px 14px",
  fontSize: 13,
  fontFamily: "DM Sans, sans-serif",
  width: "100%",
};

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("work");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), category, priority });
    setTitle("");
  };

  return (
    <div style={{ background: "#1a1a24", border: "1px solid #2a2a38", borderRadius: 12, padding: 20, marginBottom: 20, animation: "fadeUp 0.3s ease" }}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            style={{ ...inputStyle, fontSize: 15 }}
            autoFocus
          />
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, color: "#8b8680", fontFamily: "DM Sans, sans-serif", display: "block", marginBottom: 4 }}>CATEGORY</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
                <option value="work">Work</option>
                <option value="learning">Learning</option>
                <option value="health">Health</option>
                <option value="personal">Personal</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, color: "#8b8680", fontFamily: "DM Sans, sans-serif", display: "block", marginBottom: 4 }}>PRIORITY</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)} style={inputStyle}>
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🔵 Low</option>
              </select>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <button type="submit"
                style={{ padding: "10px 20px", background: "#ff4d00", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "DM Sans, sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                Add Task
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
