# A gamifying area where have user,player and pet

CA2 Project Overview

This repository encompasses a comprehensive CA2 project that seamlessly integrates two primary sections - Section A and Section B - to create a cohesive and feature-rich environment.

Section A: Authentication and User Interaction

Login and Registration: A robust authentication system has been successfully implemented, allowing users to securely register and log in.
Authorization: User roles, including player, pet owner, and admin, have been introduced to manage permissions effectively.
User Interaction Features:

Task and Progress Tracking: Once authenticated, users gain access to features allowing them to view tasks, track task progress, and manage their assignments.
Messaging System: Users can communicate through a messaging system, facilitating effective communication within the platform.
Section B: Player, Pet, and Admin Management

Player and Pet Creation: Users can create multiple players, each of whom can have an arbitrary number of associated pets. This establishes a flexible and user-centric approach to managing in-game entities.
Admin Rights: Admin functionalities are protected behind secure credentials (username: admin, password: 1234). Admins have exclusive rights to edit, add, and delete tasks or quests, ensuring a controlled and structured environment.
Integration of Sections A and B:

The seamless connection between the two sections enables users to create and manage multiple players and pets while benefiting from the authentication and authorization features established in Section A.
Key Features and Enhancements:

Secure Password Handling: Utilizing strong hashing algorithms ensures the secure storage of user passwords.
Role-Based Access Control (RBAC): A well-defined RBAC system governs user permissions and actions.
Structured Task and Quest Management: A structured system is in place to manage tasks and quests, with admins having exclusive control over these elements.
Messaging System for Communication: The implemented messaging system fosters communication among users, promoting collaboration and engagement.
User-Friendly Interface: The application prioritizes user experience, offering an intuitive interface for seamless navigation.
Continuous Improvement:

Ongoing efforts focus on refining error handling, implementing logging for critical events, and conducting thorough testing to ensure application reliability.
Input validation is prioritized to prevent security vulnerabilities and enhance overall system robustness.
This CA2 project aims to deliver a well-structured and user-centric environment, combining authentication, user interaction, and robust management functionalities for players, pets, and admins.

## Folder Structure
```
BED_CA2_CHAIJUNXUAN_p2336077
|
bed-ca2-junxuan000
├── node_modules
├── public
│   ├── css
│   │   └── style.css
│   ├── js
│   │   ├── file1.js
│   │   ├── file2.js
│   │   └── file3.js
│   ├── file1.html
│   ├── file2.html
│   ├── file3.html
│   ├── file4.html
│   └── file5.html
├── src
│   ├── configs
│   │   ├── createSchema.js
│   │   └── theTable.js
│   ├── controllers
│   │   ...
│   ├── middlewares
│   │   ├── bcryptMiddleware.js
│   │   └── jwtMiddleware.js
│   ├── models
│   │   ...
│   ├── routes
│   │   ...
│   ├── services
│   │   └── db.js
│   └── app.js
├── index.js
├── package.json
├── package-lock.json
└── readme.md
```

## Prerequisites

Before running the tests, ensure that the following dependencies are installed:

- Node.js
- npm (Node Package Manager)
- Chromium browser (Playwright will use this as the default browser)

## Clone the Repository

1. Open Visual Studio Code (VSCode) on your local machine.

2. Click on the "Source Control" icon in the left sidebar (the icon looks like a branch).

3. Click on the "Clone Repository" button.

4. In the repository URL input field, enter `https://github.com/ST0503-BED/bed-ca2-junxuan000`.

5. Choose a local directory where you want to clone the repository.

6. Click on the "Clone" button to start the cloning process.

## Setting Up Environment Variables

This repository provides instructions for setting up environment variables using a `.env` file in an Express.js application. The environment variables will be used in the `db.js` file located in the `src/services` directory.

### Setup

To set up environment variables for your Express.js application, follow these steps:

1. Create a file named `.env` in the root directory of your project.
2. Open the `.env` file and add the following lines:

   ```
   DB_HOST=<your_database_host>
   DB_USER=<your_database_user>
   DB_PASSWORD=<your_database_password>
   DB_DATABASE=<your_database_name>
   JWT_SECRET_KEY=<your_secret_key>
   JWT_EXPIRES_IN=<duration>
   JWT_ALGORITHM=<selected_algorithm>
   ```

   Replace `<your_database_host>`, `<your_database_user>`, `<your_database_password>`, and `<your_database_name>` with the appropriate values for your database connection.

   Replace `<your_secret_key>`, `<duration>`, and `<selected_algorithm>` with the appropriate values for your JSON web token usage.

   For example:

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=1234
   DB_DATABASE=bed
   JWT_SECRET_KEY=your-secret-key
   JWT_EXPIRES_IN=15m
   JWT_ALGORITHM=HS256
   ```

   Note: Make sure there are no spaces around the equal sign (=) in each line.

3. Save the `.env` file.

### Usage

The `db.js` file in the `src/services` directory uses the `dotenv` package to read the `.env` file and set the environment variables. Here's an example of how the `db.js` file should look:

```javascript
require('dotenv').config(); // Read .env file and set environment variables

const mysql = require('mysql2');

const setting = {
    connectionLimit: 10, // Set limit to 10 connections
    host: process.env.DB_HOST, // Get host from environment variable
    user: process.env.DB_USER, // Get user from environment variable
    password: process.env.DB_PASSWORD, // Get password from environment variable
    database: process.env.DB_DATABASE, // Get database from environment variable
    multipleStatements: true, // Allow multiple SQL statements
    dateStrings: true // Return date as string instead of Date object
}

const pool = mysql.createPool(setting);

module.exports = pool;
```

The `dotenv` package is used to load the environment variables from the `.env` file, and `process.env` is used to access these variables in your code.

Make sure to include the `require('dotenv').config();` line at the beginning of your file to load the environment variables from the `.env` file.

## Important Note

Ensure that the `.env` file is included in your `.gitignore` file to prevent sensitive information (such as database credentials) from being exposed in your version control system.

That's it! You have successfully set up environment variables using a `.env` file in your Express.js application. These variables can now be accessed in the `db.js` file or any other part of your application where needed.

Now you can move on to next part below.

## Install Dependencies

1. Open the terminal in VSCode by going to `View` > `Terminal` or using the shortcut `Ctrl + ``.

2. Navigate to the project root directory.(bed-ca2-junxuan000)

3. Install the required dependencies using npm:

   ```
   npm install
   ```

## Database Initialization

1. Make sure you have a MySQL database available for the mock test. Update the database configuration details in the `.env` file.

2. To initialize the database tables and populate them with sample data, open the terminal in VSCode and run the following command:

   ```
   npm run init_tables
   ```

## Commit and Sync Changes

1. Open the Source Control view in VSCode by clicking on the "Source Control" icon in the left sidebar.

2. Review the changes you made to the files.

3. Enter a commit message summarizing your changes in the input field at the top of the Source Control view.

4. Click on "Commit" to commit the changes.

5. Click on "Sync" to push your changes to the remote repository.

   Note: Make sure you have the necessary permissions to push changes to the repository.







