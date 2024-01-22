const playerModel = require('../models/playerModel');

module.exports.createPlayer = (req, res, next) => {
  // Extract necessary data from the request body
  const { username, email } = req.body;

  // Assuming the token is available in the request headers
  const token = req.headers.authorization; // Adjust this based on how your token is sent

  // Check if required data is present
  if (!username || !email || !token) {
    return res.status(400).json({ error: "Missing required data" });
  }

  // Assuming you have a function in your playerModel for creating a player
  const playerData = {
    username,
    email,
    token,
    // Add other player data as needed
  };

  playerModel.createPlayer(playerData, (error, results) => {
    if (error) {
      console.error("Error creating player:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      // Player created successfully
      res.status(201).json({ message: "Player created successfully", player: results });
    }
  });
};


// userController
module.exports.getPlayersWithUsers = (req, res, next) => {
  playerModel.getPlayersWithUsers((error, results, fields) => {
    if (error) {
      console.error("Error retrieving players with users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
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


module.exports.getAllPlayers = (req, res) => {
  playerModel.getAllPlayers((error, playersWithPets) => {
    if (error) {
      console.error('Error fetching players:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(playersWithPets);
    }
  });
};

module.exports.getPlayerByUserEmail = (req, res) => {
  const userEmail = req.params.user_email;

  playerModel.getPlayerByUserEmail(userEmail, (error, pets) => {
    if (error) {
      console.error('Error fetching player:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(pets);
    }
  });
};


module.exports.getPlayerInfoByToken = (req, res, next) => {
  const userId = res.locals.userId;

  playerModel.getPlayerById(userId, (error, result) => {
    if (error) {
      console.error('Error getting player by userID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result && result.length > 0) {
        // Player found and password verified
        res.status(200).json({ players: result }); // Sending an array of players
      } else {
        // Player not found or incorrect password
        res.status(404).json({ error: 'Player not found ' });
      }
    }
  });
};

