document.addEventListener("DOMContentLoaded", function () {
    const playerId = new URLSearchParams(window.location.search).get("player_id");
  
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const petInfo = document.getElementById("petInfo");
  
      const displayPetDetails = (pet) => {
        const displayItem = document.createElement("div");
        displayItem.className = "card";
        displayItem.innerHTML = `
          <div class="card-body">
              <h5 class="card-title">${pet.pet_name}</h5>
              <p class="card-text">
                  Species: ${pet.species}
                  <br>
                  Points: ${pet.points}
                  <br>
                  Weapon: ${pet.weapon}
                  <br>
                  Head: ${pet.head}
                  <br>
                  Armour: ${pet.armour}
              </p>
          </div>
          `;
        petInfo.appendChild(displayItem);
      };
  
      responseData.forEach(displayPetDetails);
    };
  
    fetchMethod(`${currentUrl}/api/pet/${playerId}`, callback);
  });
  