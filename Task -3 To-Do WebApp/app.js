
const input = document.querySelector('input');
const btn = document.querySelector('.addTask > button');
const pending = document.querySelector('.pending');
const completed = document.querySelector('.completed');

// Load tasks from local storage when the page is loaded
window.addEventListener('load', loadTasks);

btn.addEventListener('click', addList);

function loadTasks() {
    // Check if there's task data in local storage
    const pendingTasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

    // Add tasks to the respective lists
    loadTaskList(pendingTasks, pending);
    loadTaskList(completedTasks, completed);
}

function loadTaskList(tasks, list) {
    tasks.forEach(taskText => {
        const newLi = createTaskElement(taskText);
        list.appendChild(newLi);
    });
}

function addList() {
    const newTaskText = input.value.trim();

    if (newTaskText !== '') {
        const newLi = createTaskElement(newTaskText);
        pending.appendChild(newLi);

        // Save the updated tasks to local storage
        saveTasks();
        input.value = '';
    }
}

function createTaskElement(taskText) {
    const newLi = document.createElement('li');
    const checkBtn = document.createElement('button');
    const delBtn = document.createElement('button');

    checkBtn.innerHTML = '<i class="fa fa-check"></i>';
    delBtn.innerHTML = '<i class="fa fa-trash"></i>';

    newLi.textContent = taskText;
    newLi.appendChild(checkBtn);
    newLi.appendChild(delBtn);

    // Add event listeners for the "check" button and the "delete" button
    checkBtn.addEventListener('click', function() {
        const parent = this.parentNode;
        parent.remove();
        completed.appendChild(parent); // Move the task to the completed list
        checkBtn.style.display = 'none';

        // Update local storage when a task is moved
        saveTasks();
    });

    delBtn.addEventListener('click', function() {
        const parent = this.parentNode;
        parent.remove();

        // Update local storage when a task is deleted
        saveTasks();
    });

    return newLi;
}

function saveTasks() {
    const pendingTasks = [...pending.querySelectorAll('li')].map(li => li.textContent);
    const completedTasks = [...completed.querySelectorAll('li')].map(li => li.textContent);

    localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

