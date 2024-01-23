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
              <a href="assignQuestForPet.html?pet_id=${pet.id}" class="btn btn-primary update-btn" data-pet-id="${pet.id}">Assign Quest</a>
              <a href="updateEquipemt.html?player_id=${pet.player_id}" class="btn btn-primary equipment-btn" data-player-id="${pet.player_id}">Equipment</a>

          </div>
        `;
        petInfo.appendChild(displayItem);
  
        const assignQuestButton = document.querySelectorAll(".update-btn");
        assignQuestButton.forEach((button) => {
          button.addEventListener("click", (event) => {
            event.preventDefault();
            const petId = button.getAttribute("data-pet-id");
            window.location.href = `assignQuestForPet.html?pet_id=${petId}`;
          });
        });
      };
  
      responseData.forEach(displayPetDetails);
    };
  
    fetchMethod(`${currentUrl}/api/pet/${playerId}`, callback);
  });
  