{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const doneTask = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
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

    const clearForm = () => {
        document.querySelector(".js-newTask").value = "";
    }

    const focusInput = () => {
        document.querySelector(".js-newTask").focus();
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
        clearForm();
        focusInput();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            clearForm();
            focusInput();
            return;
        };

        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}