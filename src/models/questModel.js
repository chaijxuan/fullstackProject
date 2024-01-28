const pool = require("../services/db");

// models/questModel.js

module.exports.createQuest = (questData, callback) => {
  const { quest_name, description, points, difficulty, experience_points_reward, unlock_requirements, reward_item } = questData;

  const SQL_STATEMENT = `
    INSERT INTO Quest (quest_name, description, unlock_requirements, difficulty, experience_points_reward, reward_item)
    VALUES (?, ?, ?, ?, ?, ?);
  `;
  const VALUES = [quest_name, description, unlock_requirements, difficulty, experience_points_reward, reward_item];


  pool.query(SQL_STATEMENT, VALUES, callback);
};


module.exports.deleteQuestById = (questId, callback) => {
  const SQL_STATEMENT = `
    DELETE FROM Quest
    WHERE id = ?;
  `;
  const VALUES = [questId];

  pool.query(SQL_STATEMENT, VALUES, callback);
};

module.exports.getQuestById = (questId, callback) => {
  const SQL_STATEMENT = `
    SELECT * FROM Quest
    WHERE id = ?;
  `;
  const VALUES = [questId];

  pool.query(SQL_STATEMENT, VALUES, callback);
};


module.exports.showAll = (callback) => {
  const SQL_STATEMENT = `
  SELECT *
  FROM quest;
    `;

  pool.query(SQL_STATEMENT, callback);
};

module.exports.updateById = (questData, callback) => {
  const { id, quest_name, description, unlock_requirements, difficulty, experience_points_reward, reward_item } = questData;

  // UPDATE query for updating a quest by ID
  const updateSQL = `
      UPDATE Quest
      SET
          quest_name = ?,
          description = ?,
          unlock_requirements = ?,
          difficulty = ?,
          experience_points_reward = ?,
          reward_item = ?
      WHERE
          id = ?;
  `;

  // Values for the UPDATE query
  const updateValues = [quest_name, description, unlock_requirements, difficulty, experience_points_reward, reward_item, id];

  // Execute the UPDATE query and handle errors
  pool.query(updateSQL, updateValues, (error, results) => {
      if (error) {
          console.error("Error updating quest by ID:", error);
          return callback(error, null);
      }

      // Check if any rows were affected
      if (results.affectedRows === 0) {
          // No matching record found
          return callback({ message: "Quest not found" }, null);
      }

      // Success, callback with the updated data
      callback(null, questData);
  });
};