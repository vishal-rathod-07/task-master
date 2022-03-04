// select elements
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoItemsList = document.querySelector(".todo-items");

// array which stores todo
let todos = [];

// eventListener listen for submit event
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  var lt = /</g,
    gt = />/g,
    ap = /'/g,
    ic = /"/g;
  value = todoInput.value
    .trim()
    .toString()
    .replace(lt, "&lt;")
    .replace(gt, "&gt;")
    .replace(ap, "&#39;")
    .replace(ic, "&#34;");
  addTodo(value);
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
    const checked = item.completed ? "checked" : null;
    const li = document.createElement("li");
    li.setAttribute("class", "item");
    if (item.completed === true) {
      li.classList.add("checked");
    }
    li.innerHTML = `
    <input id="checkbox${itemId}" data-key="${itemId}" class="checkbox" type="checkbox"  ${checked}>
    <label for="checkbox${itemId}" class="item-name">${item.name}</label>
    <button id="delete${itemId}" data-key="${itemId}" class="delete-button" title='Remove Task From List' >
          <img class="delete-icon" data-key="${itemId}" src="assets/images/delete.png" />
    </button>
    `;
    todoItemsList.appendChild(li);

    document
      .querySelector(`#checkbox${itemId}`)
      .addEventListener("click", (e) => {
        toggleCheckbox(e);
      });
    document
      .querySelector(`#delete${itemId}`)
      .addEventListener("click", (e) => {
        deleteTodo(e);
      });
  });
}

// Getting data from localStorage
function getFromLocalStorage() {
  const localtodos = localStorage.getItem("todos");
  if (localtodos) {
    todos = JSON.parse(localtodos);
    displayTodos(todos);
  }
}

getFromLocalStorage();

//Toggle Checkbox and store updated todos in local storage
function toggleCheckbox(e) {
  const id = Number(e.target.dataset.key);
  // console.log("checkbox:" + id);
  const todo = todos.find((todo) => todo.id === id);
  todo.completed = !todo.completed;
  addToLocalStorage(todos);
}

// Delete todo from array and store updated todos in local storage
function deleteTodo(e) {
  const id = Number(e.target.dataset.key);
  // console.log("deleted:" + id);
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
