//taskProgressinfo.js

document.addEventListener("DOMContentLoaded", function () {
    const userId = new URLSearchParams(window.location.search).get("user_id");

    if (userId) {
        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);

            if (responseStatus === 200) {
                const taskProgressInfo = document.getElementById("taskProgressInfo");
                
                // Clear existing content before appending new data
                taskProgressInfo.innerHTML = "";

                responseData.forEach((taskprogress) => {
                    const displayItem = document.createElement("div");
                    displayItem.className = "card mt-3";
                    displayItem.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title">Task ID: ${taskprogress.task_id}</h5>
                            <p class="card-text">
                                Completion Date: ${taskprogress.completion_date}<br>
                                Notes: ${taskprogress.notes}
                            </p>
                        </div>
                    `;
                    taskProgressInfo.appendChild(displayItem);
                });
            } else {
                console.error("Error fetching task progress:", responseStatus);
                // Handle the error as needed
            }
        };

        fetchMethod(`${currentUrl}/api/taskprogress/${userId}`, callback);
    } else {
        console.error("User ID is undefined");
        // Handle the situation where user_id is undefined
    }
});
