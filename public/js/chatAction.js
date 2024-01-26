const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const messageList = document.getElementById("messageList");
    responseData.messages.forEach((message) => {
        const displayItem = document.createElement("div");
        displayItem.className = "col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
        displayItem.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${message.message_text}</h5>
                    <p class="card-text">
                        User_id: ${message.user_id}
                    </p>
                    <a href="#" class="btn btn-success update-btn" id="update-${message.id}" data-message-id="${message.id}">Update</a>
                    <a href="#" class="btn btn-danger" id="delete-${message.id}">Delete</a>
                </div>
            </div>
        `;
        messageList.appendChild(displayItem);

        const deleteButton = document.getElementById(`delete-${message.id}`);
        deleteButton.addEventListener("click", (event) => {
            event.preventDefault();
            const callbackForDelete = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
                window.location.reload();
            };
            fetchMethod(currentUrl + `/api/message/`+message.id, callbackForDelete, "DELETE", null),localStorage.getItem("token");
        });

        const updateMessageButtons = document.querySelectorAll(".update-btn");
        updateMessageButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                const messageId = button.getAttribute("data-message-id");
                window.location.href = `updateMessage.html?message_id=${messageId}`;
            });
        });
    });
};

fetchMethod(currentUrl + `/api/message/token`, callback, "GET", null, localStorage.getItem("token"));
