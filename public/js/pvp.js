document.addEventListener("DOMContentLoaded", function () {
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    const urlSearchParams = new URLSearchParams(window.location.search);
    const pet1Id = urlSearchParams.get("pet_id");
    const pet2IdForm = document.getElementById("pet2IdForm");

    pet2IdForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const pet2IdInput = pet2IdForm.querySelector("input[name='pet2Id']");
        const pet2Id = pet2IdInput.value.trim();

        if (!pet2Id) {
            // Handle empty input case if needed
            console.error("Pet ID cannot be empty");
            showErrorMessage("Pet ID cannot be empty");
            return;
        }

        const data = {
            pet2Id: pet2Id,
        };

        fetchMethod(currentUrl + `/api/pet/pvp/${pet1Id}`, callback, "POST", data);
    });

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
    
        if (responseStatus === 200) {
            // Check if there is a winner message
            const winnerMessage = responseData.winnerMessage;
            const pet1Name = responseData.pet1Name; 
            const pet2Name = responseData.pet2Name; 
    
            if (winnerMessage) {
                // Display the winner message as a warning with pet names
                showWarningMessage(`${pet1Name} vs ${pet2Name}: ${winnerMessage}`);
            } else {
                // Handle other cases if needed
                showStatusMessage("Info", `${pet1Name} vs ${pet2Name}: It's a tie!`, "text-info");
            }
        } else if (responseStatus === 400) {
            // Handle bad request (e.g., empty input)
            showStatusMessage("Error", "Bad Request: " + responseData.message, "text-danger");
        } else {
            // Handle other error cases
            showStatusMessage("Error", "Failed to determine the winner", "text-danger");
            console.error("Error details:", responseData.error); // Log the error details
        }
    };
    

    const data = {};

 

    function showErrorMessage(message) {
        warningText.innerText = message;
        warningCard.classList.remove("d-none");
    }

    function showWarningMessage(message) {
        warningText.innerText = message;
        warningCard.classList.remove("d-none");
        
        setTimeout(() => {
            warningCard.classList.add("d-none");
        }, 5000); // Hides the warning after 5 seconds 
    }
});
