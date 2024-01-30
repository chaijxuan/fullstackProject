document.addEventListener("DOMContentLoaded", function () {
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    const successMessage = document.getElementById("successMessage"); // Assuming you have an element for success messages
    const urlSearchParams = new URLSearchParams(window.location.search);
    const quest_id = urlSearchParams.get("quest_id");
    const editQuestForm = document.getElementById("editQuestForm");

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseStatus === 200) {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message;
            // Make the warning text green
            warningCard.classList.add("alert-success");
        } else if (responseStatus === 201) {
            console.error("Success update message. Status:", responseStatus);
            // Display the success message
            showSuccessMessage("Success");
        } else {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message || "An error occurred"; // Display a default message for other cases
            // Make the warning text red (or any color you prefer)
            warningCard.classList.remove("alert-success");
        }
    };

    editQuestForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const questName = document.getElementById("questName").value;
        const description = document.getElementById("description").value;
        const unlockRequirements = document.getElementById("unlockRequirements").value;
        const difficulty = document.getElementById("difficulty").value;
        const experiencePointsReward = document.getElementById("experiencePointsReward").value;
        const rewardItem = document.getElementById("rewardItem").value;

        if (!questName || !description || !unlockRequirements || !difficulty || !experiencePointsReward || !rewardItem) {
            // Handle empty input case if needed
            console.error("Quest info cannot be empty");
            return;
        }

        const data = {
            quest_name: questName,
            description: description,
            unlock_requirements: unlockRequirements,
            difficulty: difficulty,
            experience_points_reward: experiencePointsReward,
            reward_item: rewardItem
        };

        
        fetchMethod(currentUrl + `/api/quest/${quest_id}`, callback, "PUT", data);

        updateMessageForm.reset();
    });

    // Function to show success message
    function showSuccessMessage(message) {
        if (successMessage) {
            successMessage.innerText = message;
            
            successMessage.classList.remove("d-none"); // Remove a 'hidden' class, if used
            // Hide the warning text element
            warningCard.classList.add("d-none");
        } else {
            console.error("Success message element not found");
        }
    }
});
