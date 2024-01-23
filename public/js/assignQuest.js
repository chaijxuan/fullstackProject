document.addEventListener("DOMContentLoaded", function () {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const petId = urlSearchParams.get("pet_id");

  const questList = document.getElementById("questList");
  const createTPform = document.getElementById("createTaskTracker");

  createTPform.addEventListener("submit", function (event) {
      event.preventDefault();
      const questId = createTPform.querySelector("input[name='questId']").value;

      const data = {
          quest_id: questId,
      };

      fetchMethod(currentUrl + `/api/questTr/${data.quest_id}/${petId}`, callback, "POST", data);
  });

  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    if (responseStatus !== 200) {
        console.error("Error fetching quests. Status:", responseStatus);
        // Handle the error as needed
        return;
    }

    if (responseData.error) {
        console.error("Server error:", responseData.error);
        // Handle the server error as needed
        return;
    }

    if (responseData.length === 0) {
        console.log("No quests available");
        // Handle the case where there are no quests available
        return;
    }

    questList.innerHTML = "";

    if (responseData.error && responseData.error === "Pet points do not meet the unlock requirement") {
        // Display the error message to the user
        alert(responseData.error);
        return;
    }

    responseData.forEach((quest) => {
        const displayItem = document.createElement("div");
        displayItem.className =
            "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
        displayItem.innerHTML = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${quest.quest_name}</h5>
              <p class="card-text">
                ID: ${quest.id}
                <br>
                Description: ${quest.description}
                <br>
                Unlock Requirements: ${quest.unlock_requirements}
                <br>
                Difficulty: ${quest.difficulty}
                <br>
                Experience Points Reward: ${quest.experience_points_reward}
                <br>
                Reward Item: ${quest.reward_item}
              </p>
            </div>
          </div>
        `;
        questList.appendChild(displayItem);
    });
};


  fetchMethod(currentUrl + "/api/quest/", callback, "GET", null);
});
