document.addEventListener("DOMContentLoaded", function () {
    // Get user email from the query parameters
    const userEmail = new URLSearchParams(window.location.search).get("user_email");

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const taskProgressInfo = document.getElementById("taskProgressInfo");

        const displayPlayerForUser = (player) => {
            const displayItem = document.createElement("div");
            displayItem.className = "card";
            displayItem.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">Player ID: ${player.id}</h5>
                    <p class="card-text">
                        Player Name: ${player.playername}
                        <br>
                        Created At: ${player.created_at}
                        <br>
                        Email: ${player.email}
                    </p>
                </div>
            `;
            taskProgressInfo.appendChild(displayItem);
        };

        responseData.forEach(displayPlayerForUser);
    };

    // Fetch player data based on user email
    fetchMethod(`${currentUrl}/api/player?email=${userEmail}`, callback);
});
