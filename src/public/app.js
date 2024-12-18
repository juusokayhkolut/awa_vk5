document.getElementById("todoForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("userInput").value;
  const todo = document.getElementById("todoInput").value;

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
    document.getElementById("todoForm").reset();
    fetchAndDisplayTodos(name);
  } else {
    alert("Failed to add todo: " + result.error);
  }
});

async function fetchAndDisplayTodos(name) {
  const response = await fetch(`/todos?name=${name}`);
  const todos = await response.json();

  if (response.ok) {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";

    todos.forEach((todo) => {
      const li = document.createElement("li");
      const label = document.createElement("label");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.checked;
      checkbox.classList.add("filled-in", "checkBoxes");

      checkbox.onclick = async () => {
        const updateResponse = await toggleTodoChecked(name, todo._id, checkbox.checked);
        if (!updateResponse.ok) {
          checkbox.checked = !checkbox.checked;
        }
      };

      const todoText = document.createElement("span");
      todoText.textContent = todo.todo;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-task");
      deleteButton.onclick = async () => {
        const deleteResponse = await deleteTodoOnCheck(name, todo._id);
        fetchAndDisplayTodos(name);
      };

      label.appendChild(checkbox);
      label.appendChild(todoText);

      li.appendChild(label);
      li.appendChild(deleteButton);

      todoList.appendChild(li);
    });
  } else {
    alert("Failed to fetch todos!");
    console.error(response.error);
  }
}

async function toggleTodoChecked(name, todoId, checked) {
  const response = await fetch("/updateTodo", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, todoId, checked }),
  });
  return response;
}

document.getElementById("search").addEventListener("click", () => {
  const name = document.getElementById("searchInput").value;
  fetchAndDisplayTodos(name);
});

async function deleteTodoOnCheck(name, todoId) {
  const response = await fetch("/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, todoId }),
  });

  const result = await response.json();
}
