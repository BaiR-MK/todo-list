let tasks = [];

function addTask() {
    const input = document.getElementById('newTaskInput');
    const taskText = input.value.trim();
    
    if(taskText) {
        tasks.push({
            id: Date.now(),
            text: taskText,
            completed: false
        });
        input.value = '';
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function editTask(id) {
    const newText = prompt('Редактировать задачу:', 
        tasks.find(task => task.id === id).text);
    if(newText !== null && newText.trim()) {
        tasks = tasks.map(task => 
            task.id === id ? {...task, text: newText.trim()} : task
        );
        renderTasks();
    }
}

function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task
    );
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.style.textDecoration = task.completed ? 'line-through' : 'none';
        li.style.opacity = task.completed ? '0.7' : '1';
        
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.style.cursor = 'pointer';
        taskText.onclick = () => toggleTask(task.id);
        
        const buttonGroup = document.createElement('div');
        
        const editBtn = document.createElement('button');
        editBtn.textContent = '✏️';
        editBtn.style.marginRight = '5px';
        editBtn.onclick = (e) => {
            e.stopPropagation();
            editTask(task.id);
        };
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            deleteTask(task.id);
        };
        
        buttonGroup.appendChild(editBtn);
        buttonGroup.appendChild(deleteBtn);
        
        li.appendChild(taskText);
        li.appendChild(buttonGroup);
        taskList.appendChild(li);
    });
}

// Добавляем возможность добавления по Enter
document.getElementById('newTaskInput').addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        addTask();
    }
});