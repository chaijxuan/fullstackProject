const pool = require("../services/db");
module.exports.inserSingle = (playerData, callback) => {

    const SQL_STATEMENT = `
        INSERT INTO Player (Username, Email, Password)
        VALUES (?, ?, ?);
      `;
    const VALUES = [playerData.username, playerData.email, playerData.password];

    pool.query(SQL_STATEMENT, VALUES, callback);
}


module.exports.deletePlayer = (playerId, callback) => {
  const SQL_STATEMENT = `
      DELETE FROM Player
      WHERE id = ?;
  `;
  const VALUES = [playerId];

  pool.query(SQL_STATEMENT, VALUES, callback);
};

module.exports.getPlayerById = (playerId, password, callback) => {
  const SQL_STATEMENT = `
    SELECT id, username, email FROM Player
    WHERE id = ? AND password = ?;
  `;
  const VALUES = [playerId, password];

  pool.query(SQL_STATEMENT, VALUES, callback);
};

module.exports.getPetsByPlayer = (playerId, callback) => {
  const SQL_STATEMENT = `
    SELECT pet_name 
    FROM pet 
    WHERE player_id = ?;
  `;

  const VALUES = [playerId];
  pool.query(SQL_STATEMENT, VALUES, callback);
};
