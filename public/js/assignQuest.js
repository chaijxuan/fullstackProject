document.addEventListener("DOMContentLoaded", function () {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const petId = urlSearchParams.get("pet_id");

  const questList = document.getElementById("questList");
  const createTPform = document.getElementById("createTaskTracker");
  const assignQuestWarning = document.getElementById("assignQuestWarning");

  createTPform.addEventListener("submit", function (event) {
      event.preventDefault();
      const questIdInput = createTPform.querySelector("input[name='questId']");
      const questId = questIdInput.value.trim();

      if (!questId) {
          // Handle empty input case if needed
          console.error("Quest ID cannot be empty");
          return;
      }

      const data = {
          quest_id: questId,
      };

      fetchMethod(currentUrl + `/api/questTr/${data.quest_id}/${petId}`, callback, "POST", data);
      if(responseStatus == 201){
        console.error("Success fetching quests. Status:", responseStatus);
          // Display the error message
          showError("Success", assignQuestWarning);
          return;
      }
      createTPform.reset()
  });

  const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      if (responseStatus == 400) {
          console.error("Error fetching quests. Status:", responseStatus);
          // Display the error message
          showError("Pet points do not meet the unlock requirement", assignQuestWarning);
          return;
      }

      
      

      if (responseData.error) {
          console.error("Server error:", responseData.error);
          // Display the error message
          showError(responseData.error, assignQuestWarning);
          return;
      }

      if (responseData.message) {
        // Display the obtained item message
        showInfo(responseData.message, assignQuestWarning);
    }

      if (responseData.length === 0) {
          console.log("No quests available");
          // Handle the case where there are no quests available
          return;
      }

      questList.innerHTML = "";

      responseData.forEach((quest) => {
          const displayItem = document.createElement("div");
          displayItem.className = "col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 p-3";
          displayItem.innerHTML = `
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">${quest.quest_name}</h5>
                      <p class="card-text">
                          ID: ${quest.id}<br>
                          Description: ${quest.description}<br>
                          Unlock Requirements: ${quest.unlock_requirements}<br>
                          Difficulty: ${quest.difficulty}<br>
                          Experience Points Reward: ${quest.experience_points_reward}<br>
                          Reward Item: ${quest.reward_item}
                      </p>
                  </div>
              </div>
          `;
          questList.appendChild(displayItem);

          
      });
  };

  // Function to show the error message
  function showError(message, errorContainer) {
      errorContainer.innerText = message;
      errorContainer.classList.remove("d-none");
  }

  fetchMethod(currentUrl + "/api/quest/", callback, "GET", null);
});