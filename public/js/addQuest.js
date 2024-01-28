document.addEventListener("DOMContentLoaded", function () {
    const addQuestForm = document.getElementById("addQuestForm");

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

    addQuestForm.addEventListener("submit", function (event) {
        console.log("addQuestForm.addEventListener");
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

        // Perform login request
        fetchMethod(currentUrl + "/api/quest", callback, "POST", data);

        addQuestForm.reset();
    });
});
