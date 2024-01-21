// userModel.js
const pool = require("../services/db");

module.exports.insertNewUser = (data, callback) => {
  const SQLSTATMENT = `
    INSERT INTO User (username, email, password)
    VALUES (?, ? , ? );
   
   
    `;
  const VALUES = [data.username, data.email, data.password];

  pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.checkExistingEmail = (email, callback) => {
  const query = 'SELECT * FROM User WHERE email = ?';
  pool.query(query, [email], callback);
};

// Method to check if a username already exists
module.exports.checkExistingUsername = (username, callback) => {
  const query = 'SELECT * FROM User WHERE username = ?';
  pool.query(query, [username], callback);
};

module.exports.selectAll = (callback) => {
  const SQL_STATEMENT = `
    SELECT user_id, username, email, total_points FROM User;
  `;

  pool.query(SQL_STATEMENT, callback);
};



module.exports.updateUserTotalPoints = (userId, callback) => {
  const SQL_UPDATE_STATEMENT = `
  UPDATE User
  SET total_points = IFNULL((SELECT SUM(Task.points) FROM TaskProgress
                            LEFT JOIN Task ON TaskProgress.task_id = Task.task_id
                            WHERE User.user_id = TaskProgress.user_id), 0)
  WHERE user_id = ?;
  
  `;

  pool.query(SQL_UPDATE_STATEMENT, [userId], (error, results, fields) => {
    callback(error, results);
  });
};



// userModel.js
module.exports.getUserByUsername = (username, callback) => {
  const SQL_STATEMENT = `
    SELECT user_id, username, password
    FROM User
    WHERE username = ?;
  `;

  const VALUES = [username];
  pool.query(SQL_STATEMENT, VALUES, callback);
};


module.exports.getUserDetails = (userId, callback) => {
  const SQL_STATEMENT = `
  SELECT
  User.user_id,
  User.username,
  User.email,
  IFNULL(SUM(Task.points), 0) AS total_points
FROM
  User
LEFT JOIN
  TaskProgress ON User.user_id = TaskProgress.user_id
LEFT JOIN
  Task ON TaskProgress.task_id = Task.task_id
WHERE
  User.user_id = ?;

  `;

  pool.query(SQL_STATEMENT, [userId], (error, results, fields) => {
    callback(error, results[0]);
  });
};




// Model function to get task progress by user ID
module.exports.getTaskProgressByUserId = (userId, callback) => {
  const SQL_STATEMENT = `
      SELECT *
      FROM TaskProgress
      WHERE user_id = ?;
  `;

  const VALUES=[userId];
  pool.query(SQL_STATEMENT, VALUES, callback);
};

module.exports.getPlayerByUserEmail = (userEmail, callback) => {
  const SQL_STATEMENT = `
    SELECT *
    FROM Player
    WHERE email = ?;  -- Change to search by email
  `;

  const VALUES = [userEmail];
  pool.query(SQL_STATEMENT, VALUES, callback);
};