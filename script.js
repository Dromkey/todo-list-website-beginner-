const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filter-btn");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

renderTasks();


addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") return alert("Vui lòng nhập công việc!");
  tasks.push({ text, completed: false });
  input.value = "";
  saveAndRender();
});


taskList.addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  if (e.target.classList.contains("delete-btn")) {
    tasks.splice(index, 1);
  } else if (e.target.tagName === "SPAN") {
    tasks[index].completed = !tasks[index].completed;
  }
  saveAndRender();
});


filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});


function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  let filtered = tasks;

  if (currentFilter === "completed") {
    filtered = tasks.filter((t) => t.completed);
  } else if (currentFilter === "incomplete") {
    filtered = tasks.filter((t) => !t.completed);
  }

  filtered.forEach((task, i) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span data-index="${i}">${task.text}</span>
      <button class="delete-btn" data-index="${i}">Xóa</button>
    `;
    taskList.appendChild(li);
  });
}
