// questController.js

const Quest = require("../models/questModel"); // Import your Quest model

// Controller function to handle the creation of a quest
module.exports.createQuest = (req, res) => {
  const questData = req.body;

  Quest.createQuest(questData, (error, results, fields) => {
    if (error) {
      console.error("Error creating quest:", error);
      res.status(500).json({ error: "Error creating quest" });
    } else {
      res.status(201).json({ message: "Quest created successfully", quest_id: results.insertId });
    }
  });
};



// Controller function to handle the deletion of a quest by ID
module.exports.deleteQuestById = (req, res) => {
  const questId = req.params.id;

  Quest.deleteQuestById(questId, (error, result) => {
    if (error) {
      console.error('Error deleting quest:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Quest deleted successfully' });
      } else {
        res.status(404).json({ error: 'Quest not found' });
      }
    }
  });
};

// Controller function to handle the retrieval of a quest by ID
module.exports.getQuestById = (req, res) => {
  const questId = req.params.id;

  Quest.getQuestById(questId, (error, result) => {
    if (error) {
      console.error('Error getting quest by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result && result.length > 0) {
        res.status(200).json({  quest: result[0] });
      } else {
        res.status(404).json({ error: 'Quest not found' });
      }
    }
  });
};




module.exports.getAll = (req, res, next) => {
  const callback = (error, results, fields) => {
      if (error) {
          console.error("Error readAllTask:", error);
          res.status(500).json(error);
      } else {
          res.status(200).json(results);
      }
  };

  // Call the selectAll method from userModel
  Quest.showAll(callback);
}




module.exports.editQuestById = (req, res, next) => {
  if (
      req.body.quest_name === undefined ||
      req.body.description === undefined ||
      req.body.unlock_requirements === undefined ||
      req.body.difficulty === undefined ||
      req.body.experience_points_reward === undefined ||
      req.body.reward_item === undefined
  ) {
      res.status(400).json({
          message: "Error: Some required fields are undefined"
      });
      return;
  }

  const data = {
      id: req.params.id,
      quest_name: req.body.quest_name,
      description: req.body.description,
      unlock_requirements: req.body.unlock_requirements,
      difficulty: req.body.difficulty,
      experience_points_reward: req.body.experience_points_reward,
      reward_item: req.body.reward_item
  };

  const callback = (error, results, fields) => {
      if (error) {
          console.error("Error editQuestById:", error);
          res.status(500).json(error);
      } else {
          if (results.affectedRows == 0) {
              res.status(404).json({
                  message: "Quest not found"
              });
          } else {
              // Add a custom success message for status 200
              res.status(200).json({
                  message: "Quest updated successfully"
              });
          }
      }
  };

  Quest.updateById(data, callback); // Make sure to implement the updateById function in your questModel
};

