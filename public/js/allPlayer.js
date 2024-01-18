document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const playerList = document.getElementById("playerList");
      responseData.forEach((player) => {
        const displayItem = document.createElement("div");
        displayItem.className =
          "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
        displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title">${player.playername}</h5>
                  <p class="card-text">
                      Email: ${player.email}
                  </p>
                  <a href="certainPetInfo.html?player_id=${player.id}" class="btn btn-primary view-details-btn" data-player-id="${player.id}">Pets</a>
              </div>
          </div>
          `;
        playerList.appendChild(displayItem);
      });
  
      // Add event listener for View Details buttons
      const viewDetailsButtons = document.querySelectorAll(".view-details-btn");
      viewDetailsButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          const playerId = button.getAttribute("data-player-id");
          window.location.href = `certainPetInfo.html?player_id=${playerId}`;
        });
      });
    };
  
    fetchMethod(currentUrl + "/api/player", callback);
  });
  