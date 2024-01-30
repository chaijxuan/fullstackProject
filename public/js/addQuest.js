document.addEventListener("DOMContentLoaded", function () {
    // Get the addQuestForm element
    const addQuestForm = document.getElementById("addQuestForm");

    // Callback function to handle the response from the server
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        // Check if the response status is 201 (Created)
        if (responseStatus == 201) {
            // Reset the form fields if the quest is successfully added
            addQuestForm.reset();
        } else {
            // Display an alert with the error message if there was an issue
            alert(responseData.message);
        }
    };

    // Add event listener to the addQuestForm for form submission
    addQuestForm.addEventListener("submit", function (event) {
        console.log("addQuestForm.addEventListener");
        event.preventDefault(); // Prevent the default form submission behavior

        // Get values from form inputs
        const questName = document.getElementById("questName").value;
        const description = document.getElementById("description").value;
        const unlockRequirements = document.getElementById("unlockRequirements").value;
        const difficulty = document.getElementById("difficulty").value;
        const experiencePointsReward = document.getElementById("experiencePointsReward").value;
        const rewardItem = document.getElementById("rewardItem").value;

        // Check if any of the required fields are empty
        if (!questName || !description || !unlockRequirements || !difficulty || !experiencePointsReward || !rewardItem) {
            // Handle empty input case if needed
            console.error("Quest info cannot be empty");
            return;
        }

        // Prepare data object with quest information
        const data = {
            quest_name: questName,
            description: description,
            unlock_requirements: unlockRequirements,
            difficulty: difficulty,
            experience_points_reward: experiencePointsReward,
            reward_item: rewardItem
        };

        // Perform a POST request to add a new quest
        fetchMethod(currentUrl + "/api/quest", callback, "POST", data);

        // Reset the form after submission
        addQuestForm.reset();
    });
});
