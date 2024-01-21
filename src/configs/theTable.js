const pool = require("../services/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const callback = (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
}

bcrypt.hash('1234', saltRounds, (error, hash) => {
  if (error) {
    console.error("Error hashing password:", error);
  } else {
    console.log("Hashed password:", hash);

    const SQLSTATEMENT = `
    /* Drop existing tables if they exist */
    DROP TABLE IF EXISTS TaskProgress;
    DROP TABLE IF EXISTS Task;
    DROP TABLE IF EXISTS User;
    DROP TABLE IF EXISTS Pet;
    DROP TABLE IF EXISTS Player;
    DROP TABLE IF EXISTS playerpetrelation;

    /* Create the User table with the new structure */
    /* Create the User table with the new structure */

CREATE TABLE User (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username TEXT,
  email TEXT,
  password TEXT NOT NULL,
  total_points INT
);


    /* Create the Task table */
    CREATE TABLE Task (
      task_id INT PRIMARY KEY AUTO_INCREMENT,
      title TEXT,
      description TEXT,
      points INT
    );

    /* Create the TaskProgress table */
    CREATE TABLE TaskProgress (
      progress_id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      task_id INT NOT NULL,
      completion_date TIMESTAMP,
      notes TEXT
    );

    CREATE TABLE player (
      id INT AUTO_INCREMENT PRIMARY KEY,
      playername TEXT,
      email TEXT,
      password TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE pet (
      id INT AUTO_INCREMENT PRIMARY KEY,
      player_id INT,
      pet_name TEXT,
      species TEXT,
      points INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      weapon VARCHAR(255),
      head VARCHAR(255),
      armour VARCHAR(255)
    );

    CREATE TABLE playerpetrelation (
      id INT AUTO_INCREMENT PRIMARY KEY,
      player_id INT,
      pet_id INT
    );

    INSERT INTO taskprogress (user_id, task_id, completion_date, notes)VALUES 
    (2, 1, '2024-01-19 12:00:00', 'NA');

    /* Insert sample data into the Task table */
    INSERT INTO Task (task_id, title, description, points) VALUES
      (1, 'Plant a Tree', 'Plant a tree in your neighborhood or a designated green area.', 50),
      (2, 'Use Public Transportation', 'Use public transportation or carpool instead of driving alone.', 30),
      (3, 'Reduce Plastic Usage', 'Commit to using reusable bags and containers.', 40),
      (4, 'Energy Conservation', 'Turn off lights and appliances when not in use.', 25),
      (5, 'Composting', 'Start composting kitchen scraps to create natural fertilizer.', 35);

    /* Insert a sample user into the User table */
    INSERT INTO User (username, email, password) VALUES
      ('admin', 'a@a.com', '${hash}'),
      ('jxuan', 'chaijx3333@gmail.com', '123');

    INSERT INTO Player (playername, email, password) VALUES
      ('Ash', 'chaijx3333@gmail.com', '123'),
      ('Mis', 'chaijx3333@gmail.com', '123');

    INSERT INTO Pet (player_id, pet_name, species, points, created_at, weapon, head, armour)
    VALUES (1, 'Fluffy', 'Dog', 100, NOW(), 'Sword', 'Helmet', 'Chainmail');

    INSERT INTO playerpetrelation (player_id, pet_id) VALUES 
      (1, 1);

      
    `;

    pool.query(SQLSTATEMENT, (error, results, fields) => {
      if (error) {
        console.error("Error creating tables:", error);
      } else {
        console.log("Tables created successfully:", results);
      }
      process.exit();
    });
  }
});



