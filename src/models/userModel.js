// userModel.js
const pool = require("../services/db");

module.exports.insertNewUser = (data, callback) =>
{
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
    SELECT user_id, username, email FROM User;
  `;

  pool.query(SQL_STATEMENT, callback);
};


module.exports.getUserByUsername = (username, callback) => {
  const SQL_STATEMENT = `
    SELECT * FROM User
    WHERE username = ?;
  `;
  const VALUES = [username];

  pool.query(SQL_STATEMENT, VALUES,callback) 
    
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





module.exports.updateById = (data, callback) => {
  const SQL_STATEMENT = `
  UPDATE User
  SET username = ?, email = ?
    WHERE user_id = ?;
  `;
  const VALUES = [data.username, data.email, data.user_id];

  pool.query(SQL_STATEMENT, VALUES, callback);
}
/*
module.exports.deleteById = (data, callback) => {
  const SQLSTATMENT = `
  DELETE FROM User
  WHERE user_id = ?;

  ALTER TABLE user AUTO_INCREMENT = 1;
  `;
  const VALUES = [data.id];

  pool.query(SQLSTATMENT, VALUES, callback);

}
*/

/* Second choice*/
module.exports.deleteById = (data, callback) => {
  const SQL_STATEMENT = `
    DELETE FROM User
    WHERE user_id = ?;
   
    
  `;
  const VALUES = [data.id, data.id];

  pool.query(SQL_STATEMENT, VALUES, callback);
};
