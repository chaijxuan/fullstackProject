const taskModel = require("../models/taskModel");

module.exports.createNewTask = (req, res, next) => {
    const { title, description, points } = req.body;

    // Check if title, description, and points are provided in the request body
    if (!title || !description || !points) {
        return res.status(400).send({ error: 'Missing title, description, or points' });
    }

    try {
        // Use the custom method to insert data into the "Task" table
        taskModel.insertSingle({
            title,
            description,
            points
        },
            (error, result) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send({ error: 'Internal Server Error' });
                }

                const newTask = {
                    task_id: result.insertId,
                    title,
                    description,
                    points
                };

                // Send the successful response with the newly generated task_id
                return res.status(201).json(newTask);
            });

    } catch (error) {
        // Handle any errors that occur during task creation
        console.error(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};

module.exports.readAllTask = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllTask:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };

    // Call the selectAll method from userModel
    taskModel.selectAll(callback);
}

module.exports.readTaskById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    taskModel.selectById(data, callback);
}

module.exports.updateTaskById = (req, res, next) => {
    if (req.body.title == undefined || req.body.description == undefined || req.body.points == undefined) {
        res.status(400).json({
            message: "Error: title, description, or points is undefined"
        });
        return;
    }

    const data = {
        id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTaskById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Task not found"
                });
            } else {
                res.status(200).json(data);
            }
        }
    }

    taskModel.updateById(data, callback);
}

module.exports.deleteTaskById = (req, res, next) => {
    const data = {
        id: req.params.id
    };

    const callback = (error, results, fields) => {
        if (error) {
          console.error("Error deleteUserById:", error);
          res.status(500).json(error);
        } else {
          // Check if the deletion was successful
          if (results && results.affectedRows > 0) {
            res.status(204).send(); // 204 No Content
          } else {
            // User not found or not deleted
            res.status(404).json({
              message: "User not found or not deleted"
            });
          }
        }
      };
    
      // Call the deleteById method from userModel
      taskModel.deleteById(data, callback);
};

