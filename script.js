const form = document.querySelector("form");
const titleInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");

const todos = [];

class ToDo {
  constructor(title, status) {
    this.title = title;
    this.status = status;
    this.id = new Date().valueOf();
  }
}

const createButton = (label, classes) => {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.classList.add(...classes);

  return btn;
};

const renderItem = (item) => {
  const { title, status, id } = item;

  const li = document.createElement("li");
  li.classList.add("hover-change");

  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = title;

  const checkbox = document.createElement("input");
  checkbox.style.display = "none";
  checkbox.type = "checkbox";
  checkbox.checked = status;
  checkbox.id = id;

  checkbox.addEventListener("change", () => {
    label.classList.toggle("done");
    item.status = !item.status;
  });

  // buttons
  const deleteButton = createButton("Delete", ["button", "delete-button"]);

  deleteButton.addEventListener("click", () => {
    const isConfirmed = confirm(`Are you sure you want to delete ${title}`);

    if (isConfirmed) {
      li.remove();
      todos = todos.filter((item) => item.id !== id);
    }
  });

  const editButton = createButton("Edit", ["button", "edit-button"]);

  const editingInput = document.createElement("input");
  editingInput.setAttribute(
    "style",
    "width: 82%; padding: 10px; border-radius:4px;"
  );

  let isEditing = false;

  editButton.addEventListener("click", () => {
    if (isEditing) {
      item.title = editingInput.value;
      editingInput.remove();
      label.style.display = "block";
      label.textContent = editingInput.value;
      editButton.textContent = "Edit";
      isEditing = false;
    } else {
      isEditing = true;
      editButton.textContent = "Update";
      label.style.display = "none";
      editingInput.value = item.title;
      li.prepend(editingInput);
    }
  });

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("buttons");
  buttonContainer.append(editButton, deleteButton);

  li.append(checkbox, label, buttonContainer);

  todoList.appendChild(li);
};

const onFormSubmit = (e) => {
  e.preventDefault();
  const todo = new ToDo(titleInput.value, false);
  todos.push(todo);

  if (titleInput.value === "") {
    alert("Your input is empty");
    return;
  }

  form.reset();

  renderItem(todo);
};

form.addEventListener("submit", onFormSubmit);
