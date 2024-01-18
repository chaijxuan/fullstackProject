const pool = require("../services/db");
module.exports.inserSingle = (playerData, callback) => {

    const SQL_STATEMENT = `
        INSERT INTO Player (Playername, Email, Password)
        VALUES (?, ?, ?);
      `;
    const VALUES = [playerData.username, playerData.email, playerData.password];

    pool.query(SQL_STATEMENT, VALUES, callback);
}

module.exports.getAllPlayers = (callback) => {
  const SQL_STATEMENT = 'SELECT player.*, pet.pet_name as petname FROM Player player LEFT JOIN Pet pet ON player.id = pet.player_id';
  pool.query(SQL_STATEMENT, callback);
};


// playerModel
module.exports.getPlayersWithUsers = (callback) => {
  const SQL_STATEMENT = `
    SELECT Player.*, User.username AS user_username, User.email AS user_email
    FROM Player
    INNER JOIN User ON Player.UserID = User.user_id;
  `;

  pool.query(SQL_STATEMENT, callback);
};


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
    SELECT id, playername, email FROM Player
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
