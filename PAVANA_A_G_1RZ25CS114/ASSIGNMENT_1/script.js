
const spiral = document.getElementById('spiral');

for (let i = 0; i < 14; i++) {
  const hole = document.createElement('div');
  hole.className = 'hole';
  spiral.appendChild(hole);
}



const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('taskList');
const emptyMsg = document.getElementById('emptyMsg');

const borderColors = ['#e85d30', '#3a9e6f', '#3a72c4', '#7c5cbf', '#e0952a'];
let colorIdx = 0;

// Show/hide the "no tasks" placeholder
function refreshEmpty() {
  const hasTasks = list.querySelectorAll('.task-item').length > 0;
  emptyMsg.style.display = hasTasks ? 'none' : 'block';
}

function addTask(text) {
  text = text.trim();
  if (!text) {
    input.focus();
    return;
  }

  const li = document.createElement('li');
  li.className = 'task-item';
  li.style.borderLeftColor = borderColors[colorIdx % borderColors.length];
  colorIdx++;

  const check = document.createElement('button');
  check.className = 'task-check';
  check.setAttribute('aria-label', 'Mark done');
  check.innerHTML = `
    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
      <path d="M1 4L4 7.5L10 1"
            stroke="white" stroke-width="2.2"
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  check.addEventListener('click', () => li.classList.toggle('done'));

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = text;

  const del = document.createElement('button');
  del.className = 'del-btn';
  del.setAttribute('aria-label', 'Delete task');
  del.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 3l10 10M13 3L3 13"
            stroke="currentColor" stroke-width="2"
            stroke-linecap="round"/>
    </svg>`;
  del.addEventListener('click', () => {
    li.style.opacity = '0';
    li.style.transform = 'translateX(20px)';
    li.style.transition = 'opacity 0.2s, transform 0.2s';
    setTimeout(() => {
      li.remove();
      refreshEmpty();
    }, 220);
  });

  li.appendChild(check);
  li.appendChild(span);
  li.appendChild(del);
  list.appendChild(li);

  input.value = '';
  input.focus();
  refreshEmpty();
}

addBtn.addEventListener('click', () => addTask(input.value));

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask(input.value);
});

refreshEmpty();