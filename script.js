const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const dateElement = document.getElementById("date");

/* Show today's date */
const today = new Date();
const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
dateElement.textContent = today.toLocaleDateString("en-US", options);

/* Add task button */
addBtn.addEventListener("click", addTask);

/* Enter key */
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    // Mark complete
    span.addEventListener("click", () => {
        span.classList.toggle("completed");
    });

    // Edit task
    editBtn.addEventListener("click", () => {
        if (editBtn.textContent === "Edit") {
            const input = document.createElement("input");
            input.type = "text";
            input.value = span.textContent;

            li.insertBefore(input, span);
            li.removeChild(span);
            editBtn.textContent = "Save";
        } else {
            const input = li.querySelector("input");
            span.textContent = input.value;

            li.insertBefore(span, input);
            li.removeChild(input);
            editBtn.textContent = "Edit";
        }
    });

    // Delete task
    deleteBtn.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
    taskInput.value = "";
}