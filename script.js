const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

let todos = [
  {
    id: 1,
    text: "Belajar JavaScript",
    done: false
  }
];


function addTodo() {
  // 1. ambil value input
  const todoText = input.value.trim();
  if (todoText === "") return; // jangan tambah todo kosong
  // 2. buat object todo baru
  const newTodo = {
    id: Date.now(),
    text: todoText,
    done: false
  };
  // 3. push ke array todos
  todos.push(newTodo);
  // 4. simpan ke localStorage
  localStorage.setItem('todos', JSON.stringify(todos));
  // 5. render ulang
  renderTodos();
  // 6. bersihkan input
  input.value = "";
}

addBtn.addEventListener('click', addTodo);

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    if (todo.done) {
      li.style.textDecoration = "line-through";
    }
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener('change', () => {
      todo.done = checkbox.checked;
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    });
    li.prepend(checkbox);
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener('click', () => {
      todos = todos.filter(t => t.id !== todo.id);
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

loadTodos();
renderTodos();