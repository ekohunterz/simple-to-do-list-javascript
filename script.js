const taskTable = document.querySelector("#table");
const addButton = document.querySelector(".add");
const inputField = document.querySelector("#input");
const dateField = document.querySelector("#date");
const formElement = document.querySelector("#form");
const errorMessage = document.querySelector("#error");

document.addEventListener("DOMContentLoaded", () => {
  getTasks();
});

addButton.addEventListener("click", () => {
  addTask();
});

taskTable.addEventListener("click", (event) => {
  deleteTask(event);
  checkTask(event);
});

errorMessage.addEventListener("click", (event) => {
  if (event.target.classList.contains("close")) {
    errorMessage.classList.add("hidden");
  }
});

function getTasks() {
  const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  existingTasks.forEach((task) => {
    taskTable.innerHTML += createTaskRow(task.input, task.date, task.status);
  });
}

function addTask() {
  if (!inputField.value || !dateField.value) return displayErrorMessage("Please enter a task & a date");
  saveTask(inputField.value, dateField.value);
  const taskRow = createTaskRow(inputField.value, dateField.value, false);
  taskTable.innerHTML += taskRow;
  clearInputFields();
}
function saveTask(inputValue, dateValue) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.push({
    input: inputValue,
    date: dateValue,
    status: false,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskRow(taskName, taskDate, taskStatus) {
  return `<tr class=" ${taskStatus ? "checked" : ""}">
    <td><input type="checkbox" ${taskStatus ? "checked" : ""} class="check"></td>
    <td style="width: 50%">${taskName}</td>
    <td>${taskDate}</td>
    <td><button type="button" class="delete">Delete</button></td>
  </tr>`;
}

function displayErrorMessage(message) {
  errorMessage.classList.remove("hidden");
  return (errorMessage.insertBefore = message) && (errorMessage.children[0].textContent = message);
}

function clearInputFields() {
  inputField.value = "";
  dateField.value = "";
}

function deleteTask(event) {
  if (event.target.classList.contains("delete")) {
    console.log(event.target.parentElement.parentElement);
    const taskToRemove = event.target.parentElement.parentElement;
    removeTaskFromLocalStorage(taskToRemove);
    taskToRemove.remove();
  }
}

function removeTaskFromLocalStorage(taskToRemove) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const taskName = taskToRemove.children[1].textContent;
  const updatedTasks = tasks.filter((task) => task.input !== taskName);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
function checkTask(event) {
  if (event.target.classList.contains("check")) {
    const taskToCheck = event.target.parentElement.parentElement;
    const taskName = taskToCheck.children[1].textContent;
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const updatedTasks = tasks.map((task) => {
      if (task.input === taskName) {
        task.status = !task.status;
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    event.target.parentElement.parentElement.classList.toggle("checked");
  }
}
