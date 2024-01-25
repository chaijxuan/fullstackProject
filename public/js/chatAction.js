const callback = (responseStatus, responseData) => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const messageList = document.getElementById("messageList");
    responseData.message.forEach((message) => {
        const displayItem = document.createElement("div");
        displayItem.className = "col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
        displayItem.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${message.id}</h5>
                    <p class="card-text">
                        Message: ${message.message_text}
                    </p>
                    <a href="#" class="btn btn-danger" id="delete-${message.user_id}">Delete</a>
                    <a href="#" class="btn btn-danger" id="update-${message.user_id}">Update</a>
                </div>
            </div>
        `;
        messageList.appendChild(displayItem);

        const deleteButton = document.getElementById(`delete-${message.user_id}`);
        deleteButton.addEventListener("click", (event) => {
            event.preventDefault();
            const callbackForDelete = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
                window.location.reload();
            };
            fetchMethod(currentUrl + `/api/message/${message.user_id}`, callbackForDelete, 'DELETE', null, token);
        });

        const updateButton = document.getElementById(`update-${message.user_id}`);
        updateButton.addEventListener("click", (event) => {
            event.preventDefault();
            const callbackForUpdate = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
                window.location.reload();
            };
            fetchMethod(currentUrl + `/api/message/${message.user_id}`, callbackForUpdate, 'PUT', null, token);
        });
    });
};

fetchMethod(currentUrl + `/api/message/token`, callback, "GET", null, token);
