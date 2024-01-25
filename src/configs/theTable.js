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
DROP TABLE IF EXISTS quest;
DROP TABLE IF EXISTS questtracker;
DROP TABLE IF EXISTS petinventory;
DROP TABLE IF EXISTS Messages;

CREATE TABLE Messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  message_text TEXT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


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

CREATE TABLE Player (
    id INT AUTO_INCREMENT PRIMARY KEY,
    playername TEXT,
    email TEXT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Pet (
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

CREATE TABLE quest (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quest_name TEXT,
    description TEXT,
    unlock_requirements INT,
    difficulty TEXT,
    experience_points_reward INT,
    reward_item VARCHAR(255)
);

CREATE TABLE questtracker (
    tracker_id INT AUTO_INCREMENT PRIMARY KEY,
    pet_id INT,
    quest_id INT,
    experience_points INT,
    accumulated_points INT,
    obtained_item VARCHAR(255)
);

CREATE TABLE playerpetrelation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT,
    pet_id INT
);

CREATE TABLE petinventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT,
  obtained_item VARCHAR(255)
);


INSERT INTO taskprogress (user_id, task_id, completion_date, notes) VALUES 
    (2, 1, '2024-01-19 12:00:00', 'NA');

/* Insert sample data into the Task table */
INSERT INTO Task (title, description, points) VALUES
    ('Plant a Tree', 'Plant a tree in your neighborhood or a designated green area.', 50),
    ('Use Public Transportation', 'Use public transportation or carpool instead of driving alone.', 30),
    ('Reduce Plastic Usage', 'Commit to using reusable bags and containers.', 40),
    ('Energy Conservation', 'Turn off lights and appliances when not in use.', 25),
    ('Composting', 'Start composting kitchen scraps to create natural fertilizer.', 35);

/* Insert a sample user into the User table */
INSERT INTO User (username, email, password) VALUES
    ('admin', 'a@a.com', '${hash}'),
    ('jxuan', 'chaijx3333@gmail.com', '${hash}');

INSERT INTO Player (playername, email, user_id) VALUES
    ('Ash', 'chaijx3333@gmail.com', 2), 
    ('Mis', 'chaijx3333@gmail.com', 2);

INSERT INTO Pet (player_id, pet_name, species, points, created_at, weapon, head, armour)
VALUES (1, 'Fluffy', 'Dog', 100, NOW(), 'Sword', 'Helmet', 'Chainmail');

INSERT INTO playerpetrelation (player_id, pet_id) VALUES 
    (1, 1);

INSERT INTO quest (quest_name, description, unlock_requirements, difficulty, experience_points_reward, reward_item)
VALUES 
    ('Cave Quest', 'Explore the mysterious cave', 1000, 'Hard', 10, 'Magic Sword'),
    ('NewBie Quest', 'For New Player', 0, 'Easy', 10, 'normal sword');

    INSERT INTO Messages (message_text, user_id) VALUES
    ("Hello world!", 1),
    ("Yummy!", 2),  
    ("I am the one", 3);
  
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



