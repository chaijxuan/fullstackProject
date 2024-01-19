// allTask.js

document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const taskList = document.getElementById("taskList");
        responseData.forEach((task) => {
            const displayItem = document.createElement("li");
            displayItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Task ID: ${task.task_id}</h5>
                        <p class="card-text">
                            Task Title: ${task.title}<br>
                            About Task: ${task.description !== undefined ? task.description : 'No description'}<br>
                            Points: ${task.points !== undefined ? task.points : 0}
                        </p>
                    </div>
                </div>
            `;
            taskList.appendChild(displayItem);
        });
    };

    fetchMethod(currentUrl + "/api/tasks", callback);
});
