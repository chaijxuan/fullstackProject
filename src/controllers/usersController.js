// Import the userModel module
const model = require("../models/userModel");



//userController
module.exports.register = (req, res, next) => {
  const data = {
    username: req.body.username,
    email: req.body.email,
    password: res.locals.hash,
  };

  const callback = (error, result) => {
    if (error) {
      console.error("Error registering user:", error);
      res.status(500).json(error);
      return;
    } else if (result.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    } else {
      // Extract the user_id from the result
      const user_id = result.insertId; // Assuming the user_id is available in the result object

      // Store user_id in res.locals
      res.locals.userId = user_id;

      const user = data.username;
      res.status(200).json({ message: `User ${user} created successfully.`, user_id: user_id });
    }
  };

  model.registerUser(data, callback);
};





//userController
module.exports.checkUsernameOrEmailExist = (req, res, next) => {
  // Extract username and email from the request body
  const { username, email } = req.body;

  // Check if username or email is missing
  if (!username || !email) {
    return res.status(400).send({ error: 'Missing username or email' });
  }

  // Check for existing email in the database
  model.checkExistingEmail(email, (checkEmailError, checkEmailResult) => {
    if (checkEmailError) {
      console.error("Error checking existing email:", checkEmailError);
      return res.status(500).send({ error: 'Internal Server Error' });
    }

    console.log("Existing emails:", checkEmailResult);

    // If email already exists, return a conflict response
    if (checkEmailResult.length > 0) {
      return res.status(409).send({ error: 'Email already exists' });
    }

    // Check for existing username in the database
    model.checkExistingUsername(username, (checkUsernameError, checkUsernameResult) => {
      if (checkUsernameError) {
        console.error("Error checking existing username:", checkUsernameError);
        return res.status(500).send({ error: 'Internal Server Error' });
      }

      console.log("Existing usernames:", checkUsernameResult);

      // If username already exists, return a conflict response
      if (checkUsernameResult.length > 0) {
        return res.status(409).send({ error: 'Username already exists' });
      }

      // Save email and username in res.locals
      res.locals.email = email;
      res.locals.username = username;

      next();
    });
  });
};






// Function to update total points for a user
const updateUserTotalPoints = (userId, callback) => {
  model.updateUserTotalPoints(userId, (error, results) => {
    if (error) {
      console.error("Error updating total points:", error);
      // Handle the error as needed
      callback(error, null);
    } else {
      console.log("Total points updated successfully");
      // Handle the success as needed
      callback(null, results);
    }
  });
};

// Controller function to retrieve all users and update total points
module.exports.readAllUser = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllUser:", error);
      res.status(500).json(error);
    } else {
      // Assuming results contains an array of user data
      // Iterate through the users and update total points for each
      results.forEach((user) => {
        updateUserTotalPoints(user.user_id, (updateError, updateResults) => {
          // Handle the update result or error if needed
          if (updateError) {
            console.error("Error updating total points for user:", user.user_id, updateError);
          } else {
            console.log("Total points updated successfully for user:", user.user_id);
          }
        });
      });

      // Send the user data as the response
      res.status(200).json(results);
    }
  };

  // Call the selectAll method from userModel
  model.selectAll(callback);
};



// userController
module.exports.login = (req, res, next) => {
  const data = {
    username: req.body.username,
    password: req.body.password,
  };

  const callback = (error, results) => {
    if (error) {
      console.error("Error login user", error);
      res.status(500).json(error);
    } else if (results.length == 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      // Assuming your user ID is available in the results
      const userId = results[0].user_id;

      // Store userId in res.locals
      res.locals.userId = userId;

      // Store hashed password in res.locals for further use (if needed)
      res.locals.hash = results[0].password;

      // Continue to the next middleware
      next();
    }
  };

  model.loginUser(data, callback);
};




// Controller function to update user details by ID
module.exports.updateUserById = (req, res, next) => {
  const { username, email } = req.body;
  const user_id = req.params.id;

  // Check if username or email is undefined
  if (username === undefined || email === undefined) {
    return res.status(400).json({
      message: "Error: username or email is undefined"
    });
  }

  const data = {
    user_id,
    username,
    email,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateUserById:", error);
      return res.status(500).json(error);
    }

    // Check if the user was not found
    if (results.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Directly send a successful response with the updated user details
    return res.status(200).json({


      user_id,
      username,
      email,

    });
  };

  // Call the updateById method from userModel
  userModel.updateById(data, callback);
};


module.exports.deleteUserById = (req, res, next) => {
  const data = {
    id: req.params.id
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteUserById:", error);
      res.status(500).json(error);
    } else {
      // Check if the deletion was successful
      if (results && results.affectedRows > 0) {
        res.status(204).send(); // 204 No Content
      } else {
        // User not found or not deleted
        res.status(404).json({
          message: "User not found or not deleted"
        });
      }
    }
  };

  // Call the deleteById method from userModel
  userModel.deleteById(data, callback);
};


// Controller function to retrieve user details by ID
module.exports.getUserInfoByToken = (req, res, next) => {
  const userId = res.locals.userId;

  // Call the getUserDetails method from userModel
  model.getUserDetails(userId, (error, results) => {
    if (error) {
      console.error("Error retrieving user details:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results && hasNullFields(results)) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(results);
      next();
    }
  });
};
//function to check null field 
function hasNullFields(obj) {
  for (const key in obj) {
    if (obj[key] === null) {
      return true;
    }
  }
  return false;
}


module.exports.getTPByUserId = (req, res, next) => {
  const userId = req.params.user_id;

  model.getTaskProgressByUserId(userId, (error, results) => {
    if (error) {
      console.error("Error fetching task progress by user ID:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length > 0) {
      // Assuming results contain an object with a 'taskprogress' property
      const taskprogress = results.map((tp) => tp.progress_id);

      const taskprogressresponse = {
        taskprogress: {
          id: userId,
          taskprogresses: taskprogress,
        }
      };

      res.status(200).json(taskprogressresponse);
    } else {
      // No task progress found for the user
      res.status(404).json({ message: "No task progress found for the user" });
    }
  });
};




module.exports.getPlayerByUserEmail = (req, res) => {
  const userEmail = req.params.user_email;

  model.getPlayerByUserEmail(userEmail, (error, pets) => {
    if (error) {
      console.error('Error fetching player:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(pets);
    }
  });
};

