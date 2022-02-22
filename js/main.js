// select elements
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoItemsList = document.querySelector(".todo-items");

// array which stores todo
let todos = [];

// eventListener listen for submit event
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // console.log(todoInput.value);
  addTodo(todoInput.value.trim());
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
  } else {
    showSnackbar();
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
    const itemId = item.id;
    // console.log(itemId);
    const checked = item.completed ? "checked" : null;
    const li = document.createElement("li");
    li.setAttribute("class", "item");
    li.setAttribute("data-key", item.id);
    if (item.completed === true) {
      li.classList.add("checked");
    }
    li.innerHTML = `
    <input id="checkbox${itemId}" class="checkbox" type="checkbox"  ${checked}>
    <label for="checkbox${itemId}" class="item-name">${item.name}</label>
    <button id="delete${itemId}" class="delete-button" >
          <img class="delete-icon" src="assets/images/delete.png" />
    </button>
    `;
    todoItemsList.appendChild(li);

    document
      .querySelector(`#checkbox${item.id}`)
      .addEventListener("click", (e) => {
        // console.log(e);
        toggleCheckbox(e);
      });
    document
      .querySelector(`#delete${item.id}`)
      .addEventListener("click", (e) => {
        // console.log(e);
        deleteTodo(e);
      });
  });
}

// Getting data from localStorage
function getFromLocalStorage() {
  const localtodos = localStorage.getItem("todos");
  // console.table(localtodos);

  if (localtodos) {
    todos = JSON.parse(localtodos);
    // console.table(todos);

    displayTodos(todos);
  }
}

getFromLocalStorage();

//Toggle Checkbox and store updated todos in local storage
function toggleCheckbox(e) {
  const id = Number(e.srcElement.parentElement.dataset.key);
  console.log("checkbox:" + id);
  const todo = todos.find((todo) => todo.id === id);
  // console.log(todos);
  todo.completed = !todo.completed;
  addToLocalStorage(todos);
}

// Delete todo from array and store updated todos in local storage
function deleteTodo(e) {
  // console.log(e.srcElement.className);
  let id;
  if (e.srcElement.className === "delete-button") {
    id = Number(e.srcElement.parentElement.dataset.key);
    // console.log(id);
  }
  if (e.srcElement.className === "delete-icon") {
    id = Number(e.srcElement.parentElement.parentElement.dataset.key);
    // console.log(id);
  }
  console.log("deleted:" + id);
  todos = todos.filter((todo) => todo.id !== id);
  addToLocalStorage(todos);
}

// Adds classname show to snackbar
function showSnackbar() {
  var x = document.getElementById("snackbar");

  x.className = "show";

  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}
