const pool = require("../services/db");
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