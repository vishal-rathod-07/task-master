// select elements
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoItemsList = document.querySelector(".todo-items");

// array which stores todo
let todos = [];

// eventListener listen for submit event
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(todoInput.value);
  addTodo(todoInput.value);
});

// Adding todo data in array
function addTodo(item) {
  if (item !== "") {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false,
    };

    todos.push(todo);
    // console.log(todos);
    addToLocalStorage(todos);

    todoInput.value = ""; // for clearing input after adding todo
  }
}

// Adding data to localStorage
function addToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
  displayTodos(todos);
}

// Getting data from localStorage
function getFromLocalStorage() {
  const localtodos = localStorage.getItem("todos");
  console.table(localtodos);

  if (localtodos) {
    todos = JSON.parse(localtodos);
    console.table(todos);

    displayTodos(todos);
  }
}

// Displays todos
function displayTodos(todos) {
  todoItemsList.innerHTML = "";
  todos.forEach((item) => {
    const checked = item.completed ? "checked" : null;
    const li = document.createElement("li");
    li.setAttribute("class", "item");
    li.setAttribute("data-key", item.id);
    if (item.completed === true) {
      li.classList.add("checked");
    }
    li.innerHTML = `
    <input id="checkbox" class="checkbox" type="checkbox"  ${checked} onclick="toggleCheckbox(this)">
    <label for="checkbox" class="item-name">${item.name}</label>
    <button class="delete-button" onclick="deleteTodo(this)">
          <img class="" src="assets/images/delete.png" style="height: 25px; width: 25px" />
    </button>
    `;
    todoItemsList.appendChild(li);
  });
}

getFromLocalStorage();

//Toggle Checkbox and store updated todos in local storage
function toggleCheckbox(e) {
  const id = Number(e.parentElement.dataset.key);
  console.log("checkbox:" + id);
  const todo = todos.find((todo) => todo.id === id);
  // console.log(todos);
  todo.completed = !todo.completed;
  addToLocalStorage(todos);
}

// Delete todo from array and store updated todos in local storage
function deleteTodo(e) {
  const id = Number(e.parentElement.dataset.key);
  console.log("deleted:" + id);
  todos = todos.filter((todo) => todo.id !== id);
  addToLocalStorage(todos);
}
