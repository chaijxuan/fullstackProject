document.addEventListener("DOMContentLoaded", function () {
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    const urlSearchParams = new URLSearchParams(window.location.search);
    const player_id = urlSearchParams.get("player_id");
    const createPetForm = document.getElementById("petForm");

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseStatus === 201) {
            // Success: Show success message in green
            showStatusMessage("Success", responseData.message, "text-success");
        } else {
            // Error: Show error message in red
            showStatusMessage("Error", responseData.message, "text-danger");
        }
    };

    createPetForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const petName = document.getElementById("pet_name").value;
        const species = document.getElementById("pet_species").value;

        if (!petName || !species) {
            // Handle empty input case if needed
            console.error("Pet name and species cannot be empty");
            return;
        }

        const data = {
            pet_name: petName,
            species: species
        };

        fetchMethod(currentUrl + `/api/pet/${player_id}`, callback, "POST", data);

        createPetForm.reset();
    });

    function showStatusMessage(title, message, textColorClass) {
        warningCard.classList.remove("d-none");
        warningText.innerText = message;
        warningText.className = textColorClass;
    }
});
