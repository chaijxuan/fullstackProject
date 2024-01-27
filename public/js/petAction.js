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
        <img src="${pet.photo_url}" alt="${pet.pet_name}" class="card-img-top" style="width: 230px; height: 230px; object-fit: cover;">

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
        <a href="updateEquipemt.html?pet_id=${pet.id}" class="btn btn-primary equipment-btn" data-pet-id="${pet.id}">Equipment</a>
        <a href="pvp.html?pet_id=${pet.id}" class="btn btn-primary pvp-btn" data-pet-id="${pet.id}">Pet VS Pet</a>
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


        const updateEquipemtButton = document.querySelectorAll(".equipment-btn");
        updateEquipemtButton.forEach((button) => {
          button.addEventListener("click", (event) => {
            event.preventDefault();
            const petId = button.getAttribute("data-pet-id");
            window.location.href = `updateEquipemt.html?pet_id=${petId}`;
          });
        });

        const PVPbutton = document.querySelectorAll(".pvp-btn");
        PVPbutton.forEach((button) => {
          button.addEventListener("click", (event) => {
            event.preventDefault();
            const petId = button.getAttribute("data-pet-id");
            window.location.href = `pvp.html?pet_id=${petId}`;
          });
        });
      };
  
      responseData.forEach(displayPetDetails);
    };

    
  
    fetchMethod(`${currentUrl}/api/pet/${playerId}`, callback);
  });
  