async function updateOrDeleteTodo(name, todoId, checked) {
  const response = await fetch("/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, todoId, checked }),
  });

  const result = await response.json();

  if (response.ok) {
    alert(result.message);
    fetchAndDisplayTodos(name);
  } else {
    alert("Failed to update or delete todo: " + result.error);
  }
}

async function fetchAndDisplayTodos(name) {
  const response = await fetch(`/todos?name=${name}`);
  const todos = await response.json();

  if (response.ok) {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";

    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <label>
          <input type="checkbox" class="checkBoxes" id="${todo._id}" ${todo.checked ? "checked" : ""} onchange="updateOrDeleteTodo('${name}', '${todo._id}', this.checked)">
          <span>${todo.todo}</span>
        </label>
      `;
      todoList.appendChild(li);
    });
  } else {
    alert("Failed to fetch todos!");
  }
}

document.getElementById("addBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const todo = document.getElementById("todo").value;

  if (!name || !todo) {
    alert("Name and Todo cannot be empty!");
    return;
  }

  const response = await fetch("/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, todo }),
  });

  const result = await response.json();

  if (response.ok) {
    alert(result.message || "Todo added!");
    fetchAndDisplayTodos(name);
  } else {
    alert("Failed to add todo: " + result.error);
  }
});

document.getElementById("searchBtn").addEventListener("click", () => {
  const name = document.getElementById("searchName").value;
  fetchAndDisplayTodos(name);
});

async function deleteTodoOnCheck(name, todoId) {
  const response = await fetch("/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, todoId }),
  });

  const result = await response.json();

  if (response.ok) {
    alert(result.message || "Todo deleted!");
    fetchAndDisplayTodos(name);
  } else {
    alert("Failed to delete todo: " + result.error);
  }
}
