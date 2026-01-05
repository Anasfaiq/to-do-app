const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const filterAll = document.createElement("button");
const filterDone = document.createElement("button");
const filterUndone = document.createElement("button");

filterAll.textContent = "All";
filterDone.textContent = "Done";
filterUndone.textContent = "Undone";

let todos = [
  {
    id: 1,
    text: "Belajar JavaScript",
    done: false,
  },
];

function addTodo() {
  // 1. ambil value input
  const todoText = input.value.trim();
  if (todoText === "") return; // jangan tambah todo kosong
  // 2. buat object todo baru
  const newTodo = {
    id: Date.now(),
    text: todoText,
    done: false,
  };
  // 3. push ke array todos
  todos.push(newTodo);
  // 4. simpan ke localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
  // 5. render ulang
  renderTodos();
  // 6. bersihkan input
  input.value = "";
}

addBtn.addEventListener("click", addTodo);

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    if (todo.done) {
      li.style.textDecoration = "line-through";
    }
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => {
      todo.done = checkbox.checked;
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    });
    li.prepend(checkbox);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      const newText = prompt("Edit task:", todo.text);
      if (newText !== null) {
        editTodo(todo.id, newText);
      }
    });
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      renderTodos();
    });
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const data = localStorage.getItem("todos");
  if (data) {
    todos = JSON.parse(data);
  }
}

function editTodo(id, newText) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.text = newText;
    saveTodos();
    renderTodos();
  }
}

function filterTodos(showDone) {
  return todos.filter((t) => t.done === showDone);
}

// input pakai Enter
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

document.body.prepend(filterAll, filterDone, filterUndone);
filterAll.addEventListener("click", () => {
  renderTodos();
});
filterDone.addEventListener("click", () => {
  todoList.innerHTML = "";
  filterTodos(true).forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    li.style.textDecoration = "line-through";
    todoList.appendChild(li);
  });
});
filterUndone.addEventListener("click", () => {
  todoList.innerHTML = "";
  filterTodos(false).forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    todoList.appendChild(li);
  });
});

// Inisialisasi
loadTodos();
renderTodos();
