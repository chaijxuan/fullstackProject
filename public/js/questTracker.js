const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const questTrackerList = document.getElementById("questTrackerList");
    const rowContainer = document.createElement("div");
    rowContainer.className = "row";  // Adding Bootstrap row class

    responseData.forEach((questTracker) => {
        const displayItem = document.createElement("div");
        displayItem.className = "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
        displayItem.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Quest Tracker ID: ${questTracker.tracker_id}</h5>
                    <p class="card-text">
                        Pet ID: ${questTracker.pet_id} <br>
                        Quest ID: ${questTracker.quest_id} <br>
                        Accumulated Points: ${questTracker.accumulated_points} <br>
                        Obtained Item: ${questTracker.obtained_item} <br>
                    </p>
                </div>
            </div>
        `;
        rowContainer.appendChild(displayItem);
    });

    questTrackerList.appendChild(rowContainer);
};

const urlSearchParams = new URLSearchParams(window.location.search);
const petId = urlSearchParams.get("pet_id");

fetchMethod(currentUrl + `/api/questTr/${petId}`, callback);
