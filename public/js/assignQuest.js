document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const questList = document.getElementById("questList");
  
      responseData.forEach((quest) => {
        const displayItem = document.createElement("div");
        displayItem.className =
          "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
        displayItem.innerHTML = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${quest.quest_name}</h5>
              <p class="card-text">
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
    });
  
    // Move the event listener outside the callback
    const createPlayerForm = document.getElementById("createPlayerForm");
    createPlayerForm.addEventListener("submit", function (event) {
      console.log("createPlayerForm.addEventListener");
      event.preventDefault();
  
      const character_name = document.getElementById("createPlayerName").value;
  
      const data = {
        playername: character_name,  // Update the field name to match server-side expectation
      };
      // Perform create player request
      fetchMethod(currentUrl + "/api/player", callback, "POST", data, localStorage.getItem("token"));
    });
  });
  