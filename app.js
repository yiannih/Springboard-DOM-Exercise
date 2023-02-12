const form = document.querySelector("#todo-form");

const input = document.querySelector("#todo-input");

const ul = document.querySelector("#todo-list");

const saveList = (key, value) => {

    const string = JSON.stringify(value);

    localStorage.setItem(key, string);

}

const makeTodo = (value, isCompleted = false) => {

    const addLi = document.createElement("li");

    const todoText = document.createElement("p");

    todoText.textContent = value;

    if (isCompleted) todoText.classList.add("completed");

    todoText.addEventListener("click", () => {

        todoText.classList.toggle("completed");

        todoList = todoList.map ((todo) => {

            if(todo.value === value) {

                return {

                    value,
                    isCompleted: !todo.isCompleted

                };

            };
            
            return todo;
            
        });

        saveList("todoList", todoList);
        
    });

    const removeBtn = document.createElement("button");

    removeBtn.textContent = "Remove";

    removeBtn.addEventListener("click", () => {

        removeBtn.parentElement.remove();

        todoList = todoList.filter((todo) => {

            return todo.value !== value;
        })

        saveList("todoList", todoList);

    })

    addLi.append(todoText, removeBtn);

    ul.appendChild(addLi);

};

const getList = (key) => {

    const string = localStorage.getItem(key);

    const value = JSON.parse(string);

    return value;
};

let todoList = getList("todoList") || [];

todoList.forEach((todo) => {

    makeTodo(todo.value, todo.isCompleted);

});

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const todoText = input.value;

    if(!todoText) {

        alert("A task was not entered.");

        return;
    }

    makeTodo(todoText);

    const todoObj = {

        value: todoText,
        isCompleted: false,

    }

    todoList.push(todoObj);

    saveList("todoList", todoList);

    input.value = "";

});

