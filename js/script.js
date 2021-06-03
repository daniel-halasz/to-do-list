{
    let tasks = [];
    let hideDoneTask = false;

    const addNewTask = newTaskContent => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    const doneTask = index => {
        tasks = [
            ...tasks.slice(0, index),
            { ...tasks[index], done: !tasks[index].done },
            ...tasks.slice(index + 1)
        ];
        render();
    }

    const removeTask = index => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1)
        ];

        render();
    }

    const setAllTaskDone = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true
        }));
        render();
    }

    const hideAllTaskDone = () => {
        hideDoneTask = !hideDoneTask;
        render();
    }

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

    const bindButtonsEvent = () => {
        const toggleAllDoneButtons = document.querySelector(".js-doneAllTask");
        if (toggleAllDoneButtons) {
            toggleAllDoneButtons.addEventListener("click", setAllTaskDone)
        }

        const toggleAllHideTaskButton = document.querySelector(".js-toggleDoneAllTask");
        if (toggleAllHideTaskButton) {
            toggleAllHideTaskButton.addEventListener("click", hideAllTaskDone)
        }
    }

    const renderButtons = () => {
        let htmlString = "";
        if (tasks.length > 0) {
            htmlString += `
            <button class="buttons__task js-toggleDoneAllTask" ${tasks.every(({ done }) => !done) ? "disabled" : ""}>${hideDoneTask ? "Pokaż ukończone" : "Ukryj ukończone"}</button>
            <button class="buttons__task js-doneAllTask" ${tasks.every(({ done }) => done) ? "disabled" : ""}>Ukończ wszystkie</button>
            `;
        }
        document.querySelector(".js-buttons").innerHTML = htmlString;
    }

    const renderTask = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="section__listItem ${(task.done && hideDoneTask) ? "section__listTask--hidden" : ""}">
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
    }

    const render = () => {
        renderTask();
        renderButtons();
        addEvents();
        bindButtonsEvent();
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