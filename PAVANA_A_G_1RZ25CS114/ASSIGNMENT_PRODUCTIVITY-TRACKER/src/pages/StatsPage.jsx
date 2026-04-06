const CATEGORY_COLORS = {
  work: "#ff4d00",
  learning: "#4d9fff",
  health: "#4dff9f",
  personal: "#ff4dcc",
};

const PRIORITY_COLORS = {
  high: "#ff4d00",
  medium: "#ffb84d",
  low: "#4d9fff",
};

function StatCard({ label, value, sub, color }) {
  return (
    <div style={{ background: "#1a1a24", borderRadius: 12, padding: "20px 24px", border: "1px solid #2a2a38" }}>
      <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "Syne, sans-serif", color: color || "#f5f0e8" }}>
        {value}
      </div>
      <div style={{ fontSize: 13, color: "#f5f0e8", fontFamily: "DM Sans, sans-serif", marginTop: 2 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: "#8b8680", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function BarChart({ data, max }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {data.map(({ label, value, color, total }) => (
        <div key={label}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 12, color: "#f5f0e8", fontFamily: "DM Sans, sans-serif", textTransform: "capitalize" }}>{label}</span>
            <span style={{ fontSize: 12, color: "#8b8680", fontFamily: "JetBrains Mono, monospace" }}>{value}/{total}</span>
          </div>
          <div style={{ height: 8, background: "#2a2a38", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${total ? (value / total) * 100 : 0}%`, background: color, borderRadius: 4, transition: "width 0.6s ease" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function StatsPage({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const active = total - done;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const byCategory = ["work", "learning", "health", "personal"].map((cat) => {
    const catTasks = tasks.filter((t) => t.category === cat);
    return { label: cat, total: catTasks.length, value: catTasks.filter((t) => t.done).length, color: CATEGORY_COLORS[cat] };
  }).filter((d) => d.total > 0);

  const byPriority = ["high", "medium", "low"].map((p) => {
    const pt = tasks.filter((t) => t.priority === p);
    return { label: p, total: pt.length, value: pt.filter((t) => t.done).length, color: PRIORITY_COLORS[p] };
  }).filter((d) => d.total > 0);

  // Streak: days with at least 1 completion (simulated from createdAt)
  const highPriorityPending = tasks.filter((t) => t.priority === "high" && !t.done).length;

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 28, fontWeight: 800, color: "#f5f0e8", margin: 0, letterSpacing: "-0.5px" }}>
          Progress Stats
        </h1>
        <p style={{ color: "#8b8680", fontSize: 13, marginTop: 4 }}>An overview of your productivity</p>
      </div>

      {/* Big progress ring */}
      <div style={{ background: "#1a1a24", border: "1px solid #2a2a38", borderRadius: 16, padding: 28, marginBottom: 20, display: "flex", alignItems: "center", gap: 32 }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#2a2a38" strokeWidth="10" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="#ff4d00" strokeWidth="10"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - pct / 100)}`}
              strokeLinecap="round"
              style={{ transform: "rotate(-90deg)", transformOrigin: "60px 60px", transition: "stroke-dashoffset 0.8s ease" }} />
            <text x="60" y="56" textAnchor="middle" fill="#f5f0e8" fontSize="22" fontWeight="800" fontFamily="Syne, sans-serif">{pct}%</text>
            <text x="60" y="72" textAnchor="middle" fill="#8b8680" fontSize="10" fontFamily="DM Sans, sans-serif">complete</text>
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 700, color: "#f5f0e8", marginBottom: 8 }}>
            {done === 0 && "Let's get started! 🚀"}
            {done > 0 && done < total && "Good progress! Keep going 💪"}
            {done === total && total > 0 && "Everything done! 🎉"}
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <div><span style={{ fontSize: 24, fontWeight: 800, fontFamily: "Syne, sans-serif", color: "#4dff9f" }}>{done}</span><span style={{ fontSize: 12, color: "#8b8680", marginLeft: 4 }}>done</span></div>
            <div><span style={{ fontSize: 24, fontWeight: 800, fontFamily: "Syne, sans-serif", color: "#ff4d00" }}>{active}</span><span style={{ fontSize: 12, color: "#8b8680", marginLeft: 4 }}>pending</span></div>
            <div><span style={{ fontSize: 24, fontWeight: 800, fontFamily: "Syne, sans-serif", color: "#f5f0e8" }}>{total}</span><span style={{ fontSize: 12, color: "#8b8680", marginLeft: 4 }}>total</span></div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 20 }}>
        <StatCard label="Completion rate" value={`${pct}%`} color="#ff4d00" sub="of all tasks" />
        <StatCard label="High priority pending" value={highPriorityPending} color={highPriorityPending > 0 ? "#ff4d00" : "#4dff9f"} sub="needs attention" />
        <StatCard label="Categories active" value={byCategory.length} color="#4d9fff" sub="out of 4 total" />
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "#1a1a24", border: "1px solid #2a2a38", borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 14, fontWeight: 700, color: "#f5f0e8", margin: "0 0 16px 0" }}>By Category</h3>
          {byCategory.length > 0 ? <BarChart data={byCategory} /> : <p style={{ color: "#8b8680", fontSize: 13 }}>No tasks yet</p>}
        </div>
        <div style={{ background: "#1a1a24", border: "1px solid #2a2a38", borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 14, fontWeight: 700, color: "#f5f0e8", margin: "0 0 16px 0" }}>By Priority</h3>
          {byPriority.length > 0 ? <BarChart data={byPriority} /> : <p style={{ color: "#8b8680", fontSize: 13 }}>No tasks yet</p>}
        </div>
      </div>

      {/* High priority list */}
      {tasks.filter(t => t.priority === "high" && !t.done).length > 0 && (
        <div style={{ background: "#1a1a24", border: "1px solid #ff4d0033", borderRadius: 12, padding: 20, marginTop: 16 }}>
          <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 14, fontWeight: 700, color: "#ff4d00", margin: "0 0 12px 0" }}>🔥 High Priority — Pending</h3>
          {tasks.filter(t => t.priority === "high" && !t.done).map(t => (
            <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid #2a2a38" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff4d00", flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "#f5f0e8", fontFamily: "DM Sans, sans-serif" }}>{t.title}</span>
              <span style={{ marginLeft: "auto", fontSize: 11, color: "#8b8680", textTransform: "capitalize" }}>{t.category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
