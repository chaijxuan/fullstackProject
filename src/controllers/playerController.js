const playerModel = require('../models/playerModel');

module.exports.createPlayer = (req, res, next) => {
  const playerData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error creating player:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      // Check if the insertion was successful
      if (results && results.affectedRows > 0) {
        res.status(201).json({ message: "Player created successfully" }); // 201 Created
      } else {
        // Player not created
        res.status(400).json({ error: "Unable to create the player" });
      }
    }
  };

  // Call the createPlayer function
  playerModel.inserSingle(playerData, callback);
};


module.exports.deletePlayer = (req, res) => {
  const playerId = req.params.id;

  playerModel.deletePlayer(playerId, (error, result) => {
    if (error) {
      console.error('Error deleting Player:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.affectedRows > 0) {
        // Player deleted successfully
        res.status(200).json({ message: 'Player deleted successfully' });
      } else {
        // No player found for the specified ID
        res.status(404).json({ error: 'No player found for the specified ID' });
      }
    }
  });
};




module.exports.getPlayerByIdWithAuth = (req, res) => {
  const playerId = req.params.id;
  const providedPassword = req.body.password;

  playerModel.getPlayerById(playerId, providedPassword, (error, result) => {
    if (error) {
      console.error('Error getting player by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result && result.length > 0) {
        // Player found and password verified
        res.status(200).json({ player: result[0] });
      } else {
        // Player not found or incorrect password
        res.status(404).json({ error: 'Player not found or incorrect password' });
      }
    }
  });
};


// Controller to get pets by player ID
module.exports.getPetsByPlayerController = (req, res) => {
  const playerId = req.params.playerId;

  playerModel.getPetsByPlayer(playerId, (error, results) => {
    if (error) {
      console.error("Error fetching pets by player ID:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length > 0) {
      // Pets found for the player
      const pets = results.map((pet) => pet.pet_name);

      // Format the response
      const playerResponse = {
        player: {
          id: playerId,
          pets: pets,
        },
      };

      res.status(200).json(playerResponse);
    } else {
      // No pets found for the player
      res.status(404).json({ message: "No pets found for the player" });
    }
  });
};
