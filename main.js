// select elements
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoItemsList = document.querySelector(".todo-items");
const deleteButtons = document.querySelectorAll(".delete-button");

// array which stores todo
let todos = [];

// eventListener listen for submit event
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(todoInput.value);
  addTodo(todoInput.value);
});

function addTodo(item) {
  if (item !== "") {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false,
    };

    todos.push(todo);
    console.log(todos);
    addToLocalStorage(todos);

    todoInput.value = ""; // for clearing input after adding todo
  }
}

// Adding data to localStorage
function addToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
  displayTodos(todos);
}

// Displays todos
function displayTodos(todos) {
  todoItemsList.innerHTML = "";
  todos.forEach((item) => {
    const checked = item.completed ? "checked" : null;
    if (item.completed === true) {
      li.classList.add("checked");
    }

    const li = document.createElement("li");
    li.setAttribute("class", "item");
    li.setAttribute("data-key", item.id);
    li.innerHTML = `
    <input type="checkbox" class="checkbox" ${checked}>
    <label class="item-text">${item.name}</label>
    <button class="delete-button">
          <img class="delete-button" src="delete.png" style="height: 25px; width: 25px" />
    </button>
    `;
    todoItemsList.appendChild(li);
  });
}

// Getting data from localStorage
function getFromLocalStorage() {
  const todos = localStorage.getItem("todos");
  return JSON.parse(todos);
}

// Delete todo from array and store updated todos in local storage
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  addToLocalStorage(todos);
}
