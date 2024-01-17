const pool = require("../services/db");

const SQLSTATEMENT = `

CREATE TABLE User (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username TEXT,
  email TEXT
  );

  CREATE TABLE Task (
  task_id INT PRIMARY KEY AUTO_INCREMENT,
  title TEXT,
  description TEXT,
  points INT
  );

  CREATE TABLE TaskProgress (
  progress_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  task_id INT NOT NULL,
  completion_date TIMESTAMP,
  notes TEXT
  );

  INSERT INTO bed_ca1.task (task_id, title, description, points) VALUES
(1, 'Plant a Tree', 'Plant a tree in your neighbourhood or a designated green area.', 50),
(2, 'Use Public Transportation', 'Use public transportation or carpool instead of driving alone.', 30),
(3, 'Reduce Plastic Usage', 'Commit to using reusable bags and containers.', 40),
(4, 'Energy Conservation', 'Turn off lights and appliances when not in use.', 25),
(5, 'Composting', 'Start composting kitchen scraps to create natural fertilizer.', 35);

 
  `

pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully:", results);
  }
  process.exit();
});