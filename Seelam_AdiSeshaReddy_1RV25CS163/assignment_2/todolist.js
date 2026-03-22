// script.js
var input = document.getElementById("taskInput");

// Enter key support
input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  var task = document.getElementById("taskInput").value;
  var time = document.getElementById("timeInput").value;

  if (task === "") return;

  var li = document.createElement("li");

  var left = document.createElement("span");
  left.innerHTML = `<input type="checkbox"> ${task} (${time})`;

  left.querySelector("input").onchange = function() {
    if (this.checked) {
      li.classList.add("completed");
    } else {
      li.classList.remove("completed");
    }
    updateCounter();
  };

  var btn = document.createElement("button");
  btn.innerText = "Delete";
  btn.className = "delete";
  btn.onclick = function() {
    li.remove();
    checkEmpty();
    updateCounter();
  };

  li.appendChild(left);
  li.appendChild(btn);

  document.getElementById("taskList").appendChild(li);

  sortTasks();
  checkEmpty();
  updateCounter();

  document.getElementById("taskInput").value = "";
  document.getElementById("timeInput").value = "";
}

function sortTasks() {
  var list = document.getElementById("taskList");
  var items = Array.from(list.children);

  items.sort(function(a, b) {
    var timeA = a.innerText.match(/\((.*?)\)/)[1];
    var timeB = b.innerText.match(/\((.*?)\)/)[1];
    return timeA.localeCompare(timeB);
  });

  list.innerHTML = "";
  items.forEach(function(item) {
    list.appendChild(item);
  });
}

function checkEmpty() {
  var list = document.getElementById("taskList");
  var msg = document.getElementById("emptyMsg");

  if (list.children.length === 0) {
    msg.style.display = "block";
  } else {
    msg.style.display = "none";
  }
}

function updateCounter() {
  var list = document.getElementById("taskList");
  var total = list.children.length;
  var completed = document.querySelectorAll(".completed").length;

  document.getElementById("counter").innerText =
    "Total: " + total + " | Completed: " + completed;
}

checkEmpty();
