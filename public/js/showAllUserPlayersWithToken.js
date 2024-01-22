const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    if (responseStatus == 401) {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    }
  
    const playerList = document.getElementById("playerList");
    responseData.players.forEach((player) => {
      const displayItem = document.createElement("div");
      displayItem.className = "col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
      displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title">${player.playername}</h5>
                  <p class="card-text">
                      Level: ${player.email}
                  </p>
                  <a href="#" class="btn btn-primary" id="update-${player.id}">Update</a>
                  <a href="#" class="btn btn-danger" id="delete-${player.id}">Delete</a>
              </div>
          </div>
          `;
      playerList.appendChild(displayItem);
  
      const updateButton = document.getElementById(`update-${player.id}`);
      updateButton.addEventListener("click", (event) => {
        event.preventDefault();
  
        window.location.href = `updatePlayer.html?player_id=${player.id}`;
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
  