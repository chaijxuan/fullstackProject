document.addEventListener("DOMContentLoaded", function () {
    const userCardList = document.getElementById("messageList");

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        responseData.forEach((messages) => {
            const displayItem = document.createElement("div");
            displayItem.className =
                "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
            displayItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${messages.message_text}</h5>
                        <p class="card-text">
                            User ID: ${messages.user_id}<br>
                            Created At: ${messages.created_at}
                        </p>
                    </div>
                </div>
            `;
            userCardList.appendChild(displayItem);
        });
    };

    fetchMethod(currentUrl + "/api/message", callback);
});