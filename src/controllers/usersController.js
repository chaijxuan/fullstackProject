// userController.js

// Import the userModel module
const userModel = require("../models/userModel");

// Controller function to create a new user
module.exports.createUser = (req, res) => {
  // Extract username and email from the request body
  const { username, email } = req.body;

  // Check if username or email is missing
  if (!username || !email) {
    return res.status(400).send({ error: 'Missing username or email' });
  }

  try {
    // Check for existing email in the database
    userModel.checkExistingEmail(email, (checkEmailError, checkEmailResult) => {
      if (checkEmailError) {
        console.error("Error checking existing email:", checkEmailError);
        return res.status(500).send({ error: 'Internal Server Error' });
      }

      console.log("Existing emails:", checkEmailResult);

      // If email already exists, return a conflict response
      if (checkEmailResult.length > 0) {
        return res.status(409).send({ error: 'Email already exists' });
      }

      // Insert the new user into the database
      userModel.insertSingle({ username, email }, (createUserError, createUserResult) => {
        if (createUserError || !createUserResult.insertId) {
          console.error("Error creating user:", createUserError);
          return res.status(500).send({ error: 'Internal Server Error' });
        }

        // Construct the new user object
        const newUser = {
          user_id: createUserResult.insertId,
          username,
          email,
        };

        // Send the successful response with the newly created user
        res.status(201).send({ message: 'User created successfully', user: newUser });
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

// Controller function to retrieve all users
module.exports.readAllUser = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllUser:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };

  // Call the selectAll method from userModel
  userModel.selectAll(callback);
};



// Controller function to retrieve user details by ID
module.exports.getUserById = (req, res) => {
  const userId = req.params.user_id;

  // Call the getUserDetails method from userModel
  userModel.getUserDetails(userId, (error, results) => {
    if (error) {
      console.error("Error retrieving user details:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results && hasNullFields(results)) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(results);
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
