document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("userId");
    console.log("userId:", userId);
    const isAdmin = userId === "1"; // Compare as a string, not a number

    const callbackForDelete = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        window.location.reload();
    };

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const taskList = document.getElementById("taskList");
        responseData.forEach((task) => {
            const displayItem = document.createElement("li");
            displayItem.innerHTML = `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">Task ID: ${task.task_id}</h5>
                        <p class="card-text">
                            Task Title: ${task.title}<br>
                            About Task: ${task.description !== undefined ? task.description : 'No description'}<br>
                            Points: ${task.points !== undefined ? task.points : 0}
                        </p>
                        ${isAdmin ? `
                            <a href="editTask.html?task_id=${task.task_id}" class="btn btn-primary me-2">Edit</a>
                            <button id="delete-${task.task_id}" class="btn btn-danger">Delete</button>
                        ` : ''}
                    </div>
                </div>
            `;
            taskList.appendChild(displayItem);

            if (isAdmin) {
                const editBtn = displayItem.querySelector(".btn-primary");
                editBtn.addEventListener("click", (event) => {
                    const taskId = task.task_id;
                    window.location.href = `editTask.html?task_id=${taskId}`;
                });

                const deleteButton = displayItem.querySelector(`#delete-${task.task_id}`);
                deleteButton.addEventListener("click", (event) => {
                    event.preventDefault();
                    fetchMethod(currentUrl + `/api/tasks/${task.task_id}`, callbackForDelete, "DELETE", null);
                });
            }
        });

        // Add Task button outside the task list
        if (isAdmin) {
            const addTaskButton = document.createElement("a");
            addTaskButton.href = "addTask.html";
            addTaskButton.className = "btn btn-success mt-3 d-block mx-auto";
            addTaskButton.textContent = "Add Task";
        
            // Add event listener for the Add Task button
            addTaskButton.addEventListener("click", (event) => {
                // Handle Add Task button click event
                console.log("Add Task button clicked");
                window.location.href = "addTask.html";
            });
        
            // Prepend the Add Task button above the task list
            const taskContainer = document.querySelector(".container");
            taskContainer.insertBefore(addTaskButton, taskContainer.firstChild);
        }
        
    };

    fetchMethod(currentUrl + "/api/tasks", callback);
});
