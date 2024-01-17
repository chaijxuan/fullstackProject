const mysql = require('mysql2');

const setting = {
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'chaijunxuan2336077',
  database: 'bed_ca1',
  multipleStatements: true,
  dateStrings: true
};

const pool = mysql.createPool(setting);

module.exports = pool;
