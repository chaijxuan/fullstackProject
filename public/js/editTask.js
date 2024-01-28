document.addEventListener("DOMContentLoaded", function () {
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    const urlSearchParams = new URLSearchParams(window.location.search);
    const taskId = urlSearchParams.get("task_id");
    const editTaskForm = document.getElementById("editTaskForm");

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        // Display the warning card with appropriate message
        warningCard.classList.remove("d-none");
        warningText.innerText = responseData.message;

        if (responseStatus === 200) {
            console.error("Success edit task. Status:", responseStatus);

            // Display success message in the warning card with green color
            warningCard.classList.remove("alert-danger"); 
            warningCard.classList.add("alert-success"); 
            warningText.innerText = "Task successfully updated";

            
            setTimeout(() => {
                warningCard.classList.add("d-none");
            }, 8000); 
        }
    };

    editTaskForm.addEventListener("submit", function (event) {
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

        // Assuming messages.id is defined elsewhere in your code
        fetchMethod(currentUrl + `/api/tasks/${taskId}`, callback, "PUT", data);

        editTaskForm.reset();
        // No need to reload the window, as it may interfere with displaying the success message
    });
});
