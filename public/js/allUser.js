document.addEventListener("DOMContentLoaded", function () {
  const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      const userCardList = document.getElementById("userList");
      responseData.forEach((user) => {
          const displayItem = document.createElement("div");
          displayItem.className =
              "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
          displayItem.innerHTML = `
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">${user.username}</h5>
                      <p class="card-text">
                          Email: ${user.email}<br>
                          Points: ${user.total_points}
                      </p>
                      <a href="taskProgressInfo.html?user_id=${user.user_id}" class="btn btn-primary view-details-btn" data-user-id="${user.user_id}">Task Progress</a>
                  </div>
              </div>
          `;
          userCardList.appendChild(displayItem);
      });

      const viewDetailsButtons = document.querySelectorAll(".view-details-btn");
      viewDetailsButtons.forEach((button) => {
          button.addEventListener("click", (event) => {
              event.preventDefault();
              const userId = button.getAttribute("data-user-id");
              window.location.href = `taskProgressInfo.html?user_id=${userId}`;
          });
      });
  };

  fetchMethod(currentUrl + "/api/users", callback);
});
