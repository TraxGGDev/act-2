// Función para agregar material a la lista
function addTask() {
    const input = document.getElementById("taskInput");
    const taskValue = input.value.trim();  // Obtener el valor del input y eliminar espacios

    // Verificar si el campo no está vacío
    if (taskValue === "") {
        alert("Por favor, agrega un Material");
        return;
    }

    // Crear un nuevo elemento de lista
    const li = document.createElement("li");
    li.textContent = taskValue;

    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fas fa-edit"></i>';  
    editButton.onclick = function() {
        editTask(li);
    };

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.onclick = function() {
        deleteTask(li);
    };

    li.appendChild(editButton);
    li.appendChild(deleteButton);

    // Agregar la tarea a la lista de tareas en la interfaz
    document.getElementById("taskList").appendChild(li);

    // Guardar la tarea en el localStorage
    saveTasksToLocalStorage();

    // Limpiar el input
    input.value = "";
}

// Función para editar una tarea
function editTask(task) {
    const newTask = prompt("Edita la tarea:", task.firstChild.textContent);
    
    if (newTask !== null && newTask.trim() !== "") {
        task.firstChild.textContent = newTask;  // Cambiar el contenido de la tarea
        saveTasksToLocalStorage();  // Actualizar el localStorage
    }
}

// Función para eliminar una tarea
function deleteTask(task) {
    task.remove();  // Eliminar la tarea
    saveTasksToLocalStorage();  // Actualizar el localStorage
}

// Función para guardar todas las tareas en el localStorage
function saveTasksToLocalStorage() {
    const tasks = [];
    const taskListItems = document.querySelectorAll("#taskList li");

    taskListItems.forEach((item) => {
        tasks.push(item.firstChild.textContent);  // Guardar solo el texto de la tarea
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));  // Guardar el array de tareas en localStorage
}

// Función para cargar las tareas desde el localStorage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks) {
        tasks.forEach((task) => {
            const li = document.createElement("li");
            li.textContent = task;

            const editButton = document.createElement("button");
            editButton.innerHTML = '<i class="fas fa-edit"></i>';
            editButton.onclick = function() {
                editTask(li);
            };

            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
            deleteButton.onclick = function() {
                deleteTask(li);
            };

            li.appendChild(editButton);
            li.appendChild(deleteButton);

            // Agregar la tarea a la lista
            document.getElementById("taskList").appendChild(li);
        });
    }
}

// Cargar las tareas almacenadas al cargar la página
window.onload = function() {
    loadTasksFromLocalStorage();
}
