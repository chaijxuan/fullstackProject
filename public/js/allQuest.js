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

        const questList = document.getElementById("questList");
        responseData.forEach((quest) => {
            const displayItem = document.createElement("li");
            displayItem.innerHTML = `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">Quest name: ${quest.quest_name}</h5>
                        <p class="card-text">
                            Quest ID: ${quest.id}
                            Quest description: ${quest.description}<br>
                            Unlock Requirement: ${quest.unlock_requirements}<br>
                            Points Reward: ${quest.experience_points_reward !== undefined ? quest.experience_points_reward : 0}<br> 
                            Reward Item: ${quest.reward_item}<br>
                        </p>
                        ${isAdmin ? `
                            <a href="editQuest.html?quest_id=${quest.id}" class="btn btn-primary me-2">Edit</a>
                            <button id="delete-${quest.id}" class="btn btn-danger">Delete</button>
                        ` : ''}
                    </div>
                </div>
            `;
            questList.appendChild(displayItem);

            if (isAdmin) {
                const editBtn = displayItem.querySelector(".btn-primary");
                editBtn.addEventListener("click", (event) => {
                    const quesId = quest.id;
                    window.location.href = `editQuest.html?quest_id=${quesId}`;
                });

                const deleteButton = displayItem.querySelector(`#delete-${quest.id}`);
                deleteButton.addEventListener("click", (event) => {
                    event.preventDefault();
                    fetchMethod(currentUrl + `/api/quest/${quest.id}`, callbackForDelete, "DELETE", null);
                });
            }
        });

        // Add Quest button outside the quest list
        // Add Quest button outside the quest list
if (isAdmin) {
    const addQuestButton = document.createElement("a");
    addQuestButton.href = "addQuest.html";
    addQuestButton.className = "btn btn-success mt-3 d-block mx-auto";
    addQuestButton.textContent = "Add Quest";

    // Add event listener for the Add Quest button
    addQuestButton.addEventListener("click", (event) => {
        // Handle Add Quest button click event
        console.log("Add Quest button clicked");
        const currentURL = getCurrentURL();
        window.location.href = `${currentURL}addQuest.html`;
    });

    // Prepend the Add Quest button above the quest list
    const questContainer = document.querySelector(".container");
    questContainer.insertBefore(addQuestButton, questContainer.firstChild);
}

    };

    fetchMethod(currentUrl + "/api/quest/", callback, "GET", null);
});
