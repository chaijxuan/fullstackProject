const callback = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  if (responseStatus == 401) {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  }

  const sendMessageBtn = document.querySelector("#toMessage");
  sendMessageBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const token = localStorage.getItem("token");
  
      // Check if token is available
      if (token) {
          window.location.href = "chatAction.html";
      } else {
          // Handle the case when the token is not available
          console.error("Token is not available.");
      }
  });
  
  
  
  const playerList = document.getElementById("playerList");
  responseData.players.forEach((player) => {
    const displayItem = document.createElement("div");
    displayItem.className = "col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
    displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title">${player.playername}</h5>
                  <p class="card-text">
                      Email: ${player.email}
                  </p>
                  <a href="petAction.html?player_id=${player.id}" class="btn btn-primary" id="update-${player.id}">Pets</a>
                  <a href="createPet.html?player_id=${player.id}" class="btn btn-primary" id="create-${player.id}">Get Pet</a>
                  <a href="#" class="btn btn-danger" id="delete-${player.id}">Delete</a>
              </div>
          </div>
          `;
    playerList.appendChild(displayItem);

    const viewDetailsButtons = document.querySelectorAll(".view-details-btn");
    viewDetailsButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const playerId = button.getAttribute("data-player-id");
        window.location.href = `petAction.html?player_id=${playerId}`;
      });
    });

    const createPetButtons = document.querySelectorAll(".create-pet-btn");
    createPetButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const playerId = button.getAttribute("data-player-id");
        window.location.href = `createPet.html?player_id=${playerId}`;
      });
    });

    const deleteButton = document.getElementById(`delete-${player.id}`);
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      const callbackForDelete = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        window.location.reload();
      };
      fetchMethod(currentUrl + "/api/player/" + player.id, callbackForDelete, 'DELETE', null, localStorage.getItem("token"));
    });
  });
};

fetchMethod(currentUrl + "/api/users/token/player", callback, "GET", null, localStorage.getItem("token"));
