{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push ({
            content: newTaskContent,
        });

        render();
    };

    const doneTask = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }

    const addEvents = () => {
        
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButtons, index) => {
            toggleDoneButtons.addEventListener("click", () => {
                doneTask(index);
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

            <span class="section__listTask${task.done ? " section__listTask--done":""}">
            ${task.content}
            </span>
            <button class="section__listButton section__listButton--remove"></button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
        addEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}