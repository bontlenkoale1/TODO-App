const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoUlList = document.getElementById("todo-list");

let allTodos = [];


document.addEventListener("DOMContentLoaded", function() {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
        allTodos = JSON.parse(savedTodos);
        updateTodoList();
    }
});

todoForm.addEventListener("submit", function(e) {
    e.preventDefault();
    addTodo();
});

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        allTodos.push({ text: todoText, completed: false });
        updateTodoList();
        saveTodos();
        todoInput.value = "";
    }
}

function updateTodoList() {
    todoUlList.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        const todoItem = createTodoItem(todo, todoIndex);
        todoUlList.append(todoItem);
    });
}

function createTodoItem(todo, todoIndex) {
    const todoId = "todo-" + todoIndex;
    const todoLi = document.createElement("li");
    todoLi.className = "todo";
    todoLi.innerHTML = `
        <input type="checkbox" id="${todoId}" ${todo.completed ? "checked" : ""}>
        <label class="custom-checkbox" for="${todoId}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
        </label>
        <label for="${todoId}" class="todo-text">
            ${todo.text}
        </label>
        <button class="delete-button" aria-label="Delete">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>
    `;

    
    const checkbox = todoLi.querySelector(`#${todoId}`);
    checkbox.addEventListener("change", function() {
        allTodos[todoIndex].completed = this.checked;
        saveTodos();
    });

    
    const deleteButton = todoLi.querySelector(".delete-button");
    deleteButton.addEventListener("click", function() {
        deleteTodo(todoIndex);
    });

    return todoLi;
}

function deleteTodo(todoIndex) {
    allTodos.splice(todoIndex, 1);
    updateTodoList();
    saveTodos();
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(allTodos));
}

