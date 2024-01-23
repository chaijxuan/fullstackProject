// models/quesTrModel.js

const pool = require("../services/db");

module.exports.toCheck = (petId, questId, callback) => {
  // SQL query to check pet points and quest unlock requirements
  const checkSQL = `
    SELECT
      CASE
        WHEN pet.points >= quest.unlock_requirements THEN 1
        ELSE 0
      END AS unlockCondition
    FROM Pet 
    JOIN Quest ON pet.id = ? AND quest.id = ?;
  `;

  pool.query(checkSQL, [petId, questId], (error, results) => {
    if (error) {
      return callback(error, null);
    }

    // Assuming that the results array contains the unlockCondition
    const canCreate = results[0].unlockCondition === 1;
    callback(null, canCreate);
  });
};









// Function to create QuestTracker
module.exports.createQuestTracker = (questTrackerData, callback) => {
  const { pet_id, quest_id } = questTrackerData;

  // INSERT the data into QuestTracker
  const insertSQL = `
    INSERT INTO QuestTracker (pet_id, quest_id, accumulated_points, obtained_item)
    SELECT ?, ?, experience_points_reward, reward_item FROM Quest WHERE id = ?;
  `;
  const insertValues = [pet_id, quest_id, quest_id];

  // Execute the INSERT query and handle errors
  pool.query(insertSQL, insertValues, (insertErr, insertResults) => {
    if (insertErr) return callback(insertErr, null);


    //return the new row in order to get data from the row
    const selectSQL = `
      SELECT * FROM QuestTracker WHERE tracker_id = ?;
    `;

    // Execute the SELECT query to fetch the inserted row and handle errors
    pool.query(selectSQL, [insertResults.insertId], (selectErr, selectResults) => {
      if (selectErr) return callback(selectErr, null);

      // Callback with the inserted row
      callback(null, selectResults);
    });
  });
};



// Function to insert obtained item into PetInventory
module.exports.insertIntoPetInventory = (pet_id, obtainedItem, callback) => {
  // SQL query to insert item into PetInventory
  const SQL_STATEMENT = `
    INSERT INTO PetInventory (pet_id, obtained_item)
    VALUES (?, ?);
  `;
  const inventoryValues = [pet_id, obtainedItem];
  pool.query(SQL_STATEMENT, inventoryValues, callback);
  }


  module.exports.deleteQuestTrackerById = (trackerId, callback) => {
    const SQL_STATEMENT = 'DELETE FROM QuestTracker WHERE tracker_id = ?';
    
    pool.query(SQL_STATEMENT, [trackerId],callback);
      
  };