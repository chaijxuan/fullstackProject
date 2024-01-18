const pool = require("../services/db");

module.exports.insertSingle = (data, callback) => {
  const SQL_STATEMENT = `
    INSERT INTO Task (title, description, points)
    VALUES (?, ?, ?);
  `;
  const VALUES = [data.title, data.description, data.points];

  pool.query(SQL_STATEMENT, VALUES, callback);
};

module.exports.selectAll = (callback) => {
  const SQL_STATEMENT = `
      SELECT task_id, title, description, points FROM Task;
    `;

  pool.query(SQL_STATEMENT, callback);
};

module.exports.selectById = (data, callback) => {
  const SQL_STATEMENT = `
    SELECT * FROM Task
      WHERE task_id = ?;
    `;
  const VALUES = [data.id];

  pool.query(SQL_STATEMENT, VALUES, callback);
}

module.exports.updateById = (data, callback) => {
  const SQL_STATEMENT = `
      UPDATE Task 
      SET title = ?, description = ?, points = ?
      WHERE task_id = ?;  
  `;
  const VALUES = [data.title, data.description, data.points, data.id];

  pool.query(SQL_STATEMENT, VALUES, callback);
}

module.exports.deleteById = (data, callback) => {
  const SQL_STATEMENT = `
    DELETE FROM Task
    WHERE task_id = ?;
   
    
  `;
  const VALUES = [data.id, data.id];

  pool.query(SQL_STATEMENT, VALUES, callback);
};

