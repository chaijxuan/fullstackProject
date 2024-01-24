// petModel.js

const pool = require("../services/db");

module.exports.createPet = (petData, callback) => {
  const { player_id, pet_name, species } = petData;

  const SQL_STATEMENT = `
      INSERT INTO Pet (player_id, pet_name, species)
      VALUES (?, ?, ?);
    `;
  const VALUES = [player_id, pet_name, species];

  pool.query(SQL_STATEMENT, VALUES, callback);
};

module.exports.insertIntoRelation = (data, petId, callback) => {
  const SQL_STATEMENT = `
      INSERT INTO PlayerPetRelation (player_id, pet_id)
      VALUES (?, ?);
    `;
  const VALUES = [data.player_id, petId];
  pool.query(SQL_STATEMENT, VALUES, callback);
};

module.exports.getPetDetails = (petId, callback) => {
  const SQL_STATEMENT = `
  SELECT
  Pet.id AS pet_id,
  Pet.pet_name,
  Pet.weapon,
  Pet.head,
  Pet.armour,
  IFNULL(SUM(Quest.experience_points_reward), 0) AS points
FROM
  Pet
LEFT JOIN
  QuestTracker ON Pet.id = QuestTracker.pet_id
LEFT JOIN
  Quest ON QuestTracker.quest_id = Quest.id
WHERE
  Pet.id = ?
GROUP BY
  Pet.id, Pet.pet_name, Pet.weapon, Pet.head, Pet.armour;
  `;

  const VALUES = [petId]; // Fixed the reference to petId instead of data.player_id
  pool.query(SQL_STATEMENT, VALUES, callback);
};

module.exports.updatePetPoints = (petId, playerId, callback) => {
  const SQL_UPDATE_STATEMENT = `
  UPDATE Pet
  SET points = COALESCE((
    SELECT SUM(Quest.experience_points_reward)
    FROM QuestTracker
    LEFT JOIN Quest ON QuestTracker.quest_id = Quest.id
    WHERE QuestTracker.pet_id = ?
    GROUP BY QuestTracker.pet_id
  ), 0)
  WHERE id = ?;
  `;

  const VALUES = [petId, petId]; // Using petId for both WHERE conditions

  pool.query(SQL_UPDATE_STATEMENT, VALUES, callback);
};






module.exports.deletePetById = (petId, callback) => {
  const SQL_STATEMENT = 'DELETE FROM Pet WHERE id = ?';
  pool.query(SQL_STATEMENT, [petId], callback);
};


module.exports.deletePlayerPetRelationByPetId = (petId, callback) => {
  const SQL_STATEMENT = 'DELETE FROM PlayerPetRelation WHERE pet_id = ?';
  pool.query(SQL_STATEMENT, [petId], callback);
};

module.exports.getPetInventory = (data, callback) => {
  const SQL_STATEMENT = `
  SELECT petinventory.obtained_item, pet.pet_name
  FROM petinventory
  JOIN pet ON petinventory.pet_id = pet.id
  WHERE petinventory.pet_id = ?;
  `;
  
  const VALUES = [data.pet_id];
  
  pool.query(SQL_STATEMENT, VALUES, callback);
};


module.exports.pvp = (pet1Id, pet2Id, callback) => {
  const SQL_STATEMENT = `
  SELECT
  (SELECT pet_name FROM pet WHERE id = ?) AS pet1_name,
  (SELECT COALESCE(points, 0) FROM pet WHERE id = ?) AS pet1_points,
  (SELECT pet_name FROM pet WHERE id = ?) AS pet2_name,
  (SELECT COALESCE(points, 0) FROM pet WHERE id = ?) AS pet2_points,
  CASE
    WHEN COALESCE((SELECT points FROM pet WHERE id = ?), 0) > COALESCE((SELECT points FROM pet WHERE id = ?), 0) THEN 'Pet 1 is the winner'
    WHEN COALESCE((SELECT points FROM pet WHERE id = ?), 0) < COALESCE((SELECT points FROM pet WHERE id = ?), 0) THEN 'Pet 2 is the winner'
    ELSE 'It''s a tie!'
  END AS winner;
  `;
  const VALUES = [pet1Id, pet1Id, pet2Id, pet2Id, pet1Id, pet2Id, pet1Id, pet2Id];

  pool.query(SQL_STATEMENT, VALUES, callback);
};




module.exports.updateEquipment = (petId, newWeapon, newHead, newArmour, callback) => {
  const SQL_STATEMENT = `
    UPDATE Pet
    SET
      weapon = CASE WHEN (SELECT COUNT(*) FROM PetInventory WHERE pet_id = ? AND obtained_item = ?) > 0 THEN ? ELSE weapon END,
      head = CASE WHEN (SELECT COUNT(*) FROM PetInventory WHERE pet_id = ? AND obtained_item = ?) > 0 THEN ? ELSE head END,
      armour = CASE WHEN (SELECT COUNT(*) FROM PetInventory WHERE pet_id = ? AND obtained_item = ?) > 0 THEN ? ELSE armour END
    WHERE
      id = ?;
  `;

  const updateEquipmentValues = [
    petId,       // Replaces the first occurrence of ?
    newWeapon,   // Replaces the second occurrence of ?
    newWeapon,   // Replaces the third occurrence of ?
    petId,       // Replaces the fourth occurrence of ?
    newHead,     // Replaces the fifth occurrence of ?
    newHead,     // Replaces the sixth occurrence of ?
    petId,       // Replaces the seventh occurrence of ?
    newArmour,   
    newArmour,   
    petId        
  ];
  

  pool.query(SQL_STATEMENT, updateEquipmentValues, callback);
};

// petModel.js



module.exports.getPetsByPlayerId = (playerId, callback) => {
  const SQL_STATEMENT = 'SELECT * FROM pet WHERE player_id = ?';
  pool.query(SQL_STATEMENT, [playerId], callback);
};
