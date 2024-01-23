document.addEventListener("DOMContentLoaded", function () {
    const createPlayerForm = document.getElementById("createPlayerForm");
  
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      if (responseStatus == 201) {
        // Reset the form fields
        createPlayerForm.reset();
        // Check if create player was successful
        window.location.href = "profile.html";
      } else {
        alert(responseData.message);
      }
    };
  
    createPlayerForm.addEventListener("submit", function (event) {
      console.log("createPlayerForm.addEventListener");
      event.preventDefault();
  
      const character_name = document.getElementById("createPlayerName").value;
  
      const data = {
        playername: character_name,
      };
      // Perform login request
      fetchMethod( currentUrl + "/api/player", callback, "POST", data, localStorage.getItem("token"));
    });
  });
  