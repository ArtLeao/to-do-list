//Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;
let todoTitle;

//Funções

const saveTodo = (text) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerHTML = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(removeBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
}

const toogleForm = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }
    });
}


//Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); //usado para desabilitar o envio do formulário que é feito automaticamente quando se clica no botão

    const inputValue = todoInput.value;

    if (inputValue) {
        saveTodo(inputValue);
    }

});

document.addEventListener("click", (e) => {
    const targetEl = e.target; //e.target pega em qual elemento o mouse fez alguma ação
    const parentEl = targetEl.closest("div"); //closest pega o elemento (passado por parenteses) mais próximo de algum elemento

    if(parentEl && parentEl.querySelector("h3")){ //verifica se o parentEl existe e se ele possui um h3
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
    }

    if (targetEl.classList.contains("edit-todo")) {
        toogleForm();
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }

    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }
})

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toogleForm();
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;
    if (editInputValue) {
        //atualizar
        updateTodo(editInputValue);

    }
    toogleForm();
})