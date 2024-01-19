const pool = require("../services/db");

module.exports = {
    createTaskProgress: (data, callback) => {
        const SQL_STATEMENT = `
            INSERT INTO taskprogress (user_id, task_id, completion_date, notes)
            VALUES (?, ?, ?, ?);
        `;
        const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes||null];

        pool.query(SQL_STATEMENT, VALUES, callback);
    },

    checkUser: (user_id, callback) => {
        const SQL_STATEMENT = 'SELECT COUNT(*) AS userCount FROM User WHERE user_id = ?';

        pool.query(SQL_STATEMENT, [user_id], callback);
    },

    checkTask: (task_id, callback) => {
        const SQL_STATEMENT = 'SELECT COUNT(*) AS taskCount FROM Task WHERE task_id = ?';

        pool.query(SQL_STATEMENT, [task_id], callback);
    },
};

module.exports.readById=(data,callback)=>{
    const SQL_STATEMENT=`
    SELECT
      progress_id,
      user_id,
      task_id,
      DATE(completion_date) AS completion_date,
      notes
    FROM taskprogress
    WHERE progress_id = ?;
    `
    const VALUES=[data.id];
    pool.query(SQL_STATEMENT, VALUES, callback);
}

module.exports.updateById=(data, callback)=>{
    const SQL_STATEMENT=`
    UPDATE TaskProgress
    SET notes=?
    WHERE progress_id=?;
    `
    const VALUES=[data.notes, data.id];
    pool.query(SQL_STATEMENT, VALUES, callback);
}


module.exports.deleteById = (data, callback) => {
    const SQL_STATEMENT = `
      DELETE FROM TaskProgress
      WHERE progress_id=?;
     
      
    `;
    const VALUES = [data.id];
  
    pool.query(SQL_STATEMENT, VALUES, callback);
  };
  

// Model function to get task progress by user ID
module.exports.getTaskProgressByUserId = (userId, callback) => {
    const SQL_STATEMENT = `
        SELECT *
        FROM TaskProgress
        WHERE user_id = ?;
    `;

    pool.query(SQL_STATEMENT, [userId], (error, results, fields) => {
        callback(error, results);
    });
};
