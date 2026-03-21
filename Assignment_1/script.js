function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value;

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let tableBody = document.getElementById("taskTableBody");

    let row = document.createElement("tr");

    // Task column
    let taskCell = document.createElement("td");
    taskCell.textContent = taskText;

    // Checkbox column
    let checkCell = document.createElement("td");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.onchange = function () {
        if (checkbox.checked) {
            taskCell.classList.add("completed");
        } else {
            taskCell.classList.remove("completed");
        }
    };

    checkCell.appendChild(checkbox);

    // Action column
    let actionCell = document.createElement("td");
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.onclick = function () {
        row.remove();
    };

    actionCell.appendChild(deleteBtn);

    // ✅ Order matters here
    row.appendChild(taskCell);
    row.appendChild(checkCell);
    row.appendChild(actionCell);

    tableBody.appendChild(row);

    input.value = "";
}