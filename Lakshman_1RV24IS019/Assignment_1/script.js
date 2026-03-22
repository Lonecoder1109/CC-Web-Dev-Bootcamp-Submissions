let tasks = [];
let currentFilter = "all";

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") return;

  tasks.push({ text: text, done: false });
  input.value = "";

  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let filtered = tasks.filter(task => {
    if (currentFilter === "active") return !task.done;
    if (currentFilter === "done") return task.done;
    return true;
  });

  filtered.forEach((task, index) => {
    let li = document.createElement("li");

    if (task.done) li.classList.add("completed");

    li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-actions">
        <button class="done-btn" onclick="toggleTask(${index})">✔</button>
        <button class="delete-btn" onclick="deleteTask(${index})">✖</button>
      </div>
    `;

    list.appendChild(li);
  });

  updateStats();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function filterTasks(type) {
  currentFilter = type;
  renderTasks();
}

function updateStats() {
  const done = tasks.filter(t => t.done).length;
  const left = tasks.length - done;

  document.getElementById("doneCount").textContent = `${done} done`;
  document.getElementById("leftCount").textContent = `${left} left`;
}