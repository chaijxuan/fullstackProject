document.addEventListener("DOMContentLoaded", function () {
    const addTaskForm = document.getElementById("addTaskForm");

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 201) {
            // Reset the form fields
            createPlayerForm.reset();

        } else {
            alert(responseData.message);
        }
    };

    addTaskForm.addEventListener("submit", function (event) {
        console.log("addTaskForm.addEventListener");
        event.preventDefault();

        const taskTitle = document.getElementById("taskTitle").value;
        const taskDescription = document.getElementById("taskDescription").value;
        const taskPoints = document.getElementById("taskPoints").value;


        if (!taskTitle || !taskDescription || !taskPoints) {
            // Handle empty input case if needed
            console.error("Task info cannot be empty");
            return;
        }

        const data = {
            title: taskTitle,
            description: taskDescription,
            points: taskPoints
        };

        // Perform login request
        fetchMethod(currentUrl + "/api/tasks", callback, "POST", data);

        addTaskForm.reset();
    });
});
