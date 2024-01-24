document.addEventListener("DOMContentLoaded", function () {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const petId = urlSearchParams.get("pet_id");

    const petInventoryList = document.getElementById("petInventoryList");
    const weaponForm = document.getElementById("updateWeaponForm");
    const headForm = document.getElementById("updateHeadForm");
    const armorForm = document.getElementById("updateArmorForm");


     // Handle form submissions
     weaponForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const newWeapon = document.getElementById("weaponInput").value;
        const data = {
            weapon: newWeapon,
          };
          // Perform login request
          fetchMethod( currentUrl + `/api/pet/${petId}`, callback, "PUT", data);
    });

    headForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const newHead = document.getElementById("headInput").value;
        const data = {
            head: newHead,
          };
          // Perform login request
          fetchMethod( currentUrl + `/api/pet/${petId}`, callback, "PUT", data);
    });

    armorForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const newArmor = document.getElementById("armorInput").value;
        const data = {
            armour: newArmor,
          };
          // Perform login request
          fetchMethod( currentUrl + `/api/pet/${petId}`, callback, "PUT", data);
    });

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseStatus !== 200) {
            console.error("Error fetching pet inventory. Status:", responseStatus);
            // Handle the error as needed
            return;
        }

        if (responseData.error) {
            console.error("Server error:", responseData.error);
            // Handle the server error as needed
            return;
        }

        if (responseData.length === 0) {
            console.log("No pet inventory available");
            // Handle the case where there is no pet inventory available
            return;
        }

        petInventoryList.innerHTML = "";

        responseData.forEach((pet) => {
            const displayItem = document.createElement("div");
            displayItem.className =
                "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
            displayItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${pet.pet_name}</h5>
                        <p class="card-text">
                            Obtained Items:
                            <ul>
                                ${pet.obtained_items.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </p>
                    </div>
                </div>
            `;
            petInventoryList.appendChild(displayItem);
        });
    };

    // Fetch pet inventory items based on pet_id
    fetchMethod(currentUrl + `/api/petinventory/${petId}`, callback, "GET", null);

   
});
