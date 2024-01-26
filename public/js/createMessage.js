document.addEventListener("DOMContentLoaded", function () {
    const createMessageForm = document.getElementById("createMessageForm");
  
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      if (responseStatus == 201) {
        // Reset the form fields
        createPlayerForm.reset();
        
      } else {
        alert(responseData.message);
      }
    };
  
    createMessageForm.addEventListener("submit", function (event) {
      console.log("createMessageForm.addEventListener");
      event.preventDefault();
  
      const message_text = document.getElementById("createMessageText").value;
  
      const data = {
        message_text: message_text,
      };
      // Perform login request
      fetchMethod( currentUrl + "/api/message", callback, "POST", data, localStorage.getItem("token"));

      window.location.reload();
    });
  });
  