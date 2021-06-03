{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = newTaskContent => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    const doneTask = taskIndex => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...task.slice(taskIndex + 1),
        ]

        render();
    };

    const removeTask = taskIndex => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        
        render();
    };

    const addEvents = () => {

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButtons, index) => {
            toggleDoneButtons.addEventListener("click", () => {
                doneTask(index);
            });
        });

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="section__listItem">
            <button class="section__listButton section__listButton--done js-done">
            ${task.done ? "✓" : ""}</button>

            <span class="section__listTask${task.done ? " section__listTask--done" : ""}">
            ${task.content}
            </span>
            <button class="section__listButton section__listButton--remove js-remove">🗑</button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
        addEvents();
    };

    const clearInput = (newTask) => {
        newTask.value = "";
        newTask.focus();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();
        clearInput(newTaskElement);

        if (newTaskContent) {
            addNewTask(newTaskContent);
        }

    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}