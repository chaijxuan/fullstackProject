const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const petList = document.getElementById("petList");
    const rowContainer = document.createElement("div");
    rowContainer.className = "row";  // Adding Bootstrap row class

    responseData.forEach((pet) => {
        const displayItem = document.createElement("div");
        displayItem.className = "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
        displayItem.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <img src="${pet.photo_url}" style="width: 100%; height: 166.4px;">
                    <h5 class="card-title">${pet.pet_name}</h5>
                    <p class="card-text">
                        Species: ${pet.species} <br>
                        Points: ${pet.points} <br>
                        Created at: ${pet.created_at} <br>
                        Owner ID: ${pet.player_id} <br>
                    </p>
                    <a href="questTracker.html?pet_id=${pet.id}" class="btn btn-primary">View Battle Log</a>
                </div>
            </div>
        `;
        rowContainer.appendChild(displayItem);
    });

    petList.appendChild(rowContainer);
};

fetchMethod(currentUrl + "/api/pet", callback);
