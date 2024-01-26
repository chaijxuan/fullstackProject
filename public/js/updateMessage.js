document.addEventListener("DOMContentLoaded", function () {
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    const urlSearchParams = new URLSearchParams(window.location.search);
    const message_id = urlSearchParams.get("message_id");
    const updateMessageForm = document.getElementById("updateMessageForm");

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseStatus === 200) {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message;
        } else {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message;
        }

        if (responseStatus === 201) {
            console.error("Success update message. Status:", responseStatus);
            // Display the success message
            showError("Success", assignQuestWarning); // Make sure showError is defined
            return;
        }
    };

    updateMessageForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const messageText = document.getElementById("message_text").value;

        if (!messageText) {
            // Handle empty input case if needed
            console.error("Message text cannot be empty");
            return;
        }

        const data = {
            message_text: messageText,
        };

        // Assuming messages.id is defined elsewhere in your code
        fetchMethod(currentUrl + `/api/message/${message_id}`, callback, "PUT", data, localStorage.getItem("token"));


        updateMessageForm.reset();
        window.location.reload();
    });
});
