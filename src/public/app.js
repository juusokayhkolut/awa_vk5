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
      li.classList.add("collection-item");

      const label = document.createElement("label");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.checked;
      checkbox.classList.add("filled-in");

      checkbox.onclick = async () => {
        try {
          const deleteResponse = await deleteTodoOnCheck(name, todo.id);

          if (!deleteResponse.ok) throw new Error("Failed to delete todo.");

          fetchAndDisplayTodos(name);
        } catch (error) {
          alert("Error deleting todo. Please try again.");
          checkbox.checked = !checkbox.checked;
        }
      };

      const todoText = document.createElement("span");
      todoText.textContent = todo.todo;

      label.appendChild(checkbox);
      label.appendChild(todoText);

      li.appendChild(label);
      todoList.appendChild(li);
    });
  } else {
    alert("Failed to fetch todos!");
    console.error(response.error);
  }
}

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
    fetchAndDisplayTodos(name);
  } else {
    alert("Failed to delete todo: " + result.error);
  }
}
