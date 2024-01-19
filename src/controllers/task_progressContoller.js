const taskProgressModel = require('../models/task_progressModel');

module.exports.createTaskProgress = (req, res) => {
  const { user_id, task_id, completion_date, notes } = req.body;

  // Check if user_id, task_id, and completion_date are provided in the request body
  if (!user_id || !task_id || !completion_date) {
    return res.status(400).json({ error: 'Missing user_id, task_id, or completion_date' });
  }

  // Check if the user_id and task_id exist
  taskProgressModel.checkUser(user_id, (userError, userResults) => {
    if (userError) {
      console.error(userError);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    taskProgressModel.checkTask(task_id, (taskError, taskResults) => {
      if (taskError) {
        console.error(taskError);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (userResults[0].userCount > 0 && taskResults[0].taskCount > 0) {
        // Create task progress using the taskProgressModel
        taskProgressModel.createTaskProgress(
          { user_id, task_id, completion_date, notes },
          (createError, data) => {
            if (createError) {
              console.error(createError);
              return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Send the successful response
            return res.status(201).json({
              progress_id: data.insertId, 
              user_id,
              task_id,
              completion_date,
              notes,
            });
          }
        );
      } else {
        return res.status(404).json({ error: 'User or task not found' });
      }
    });
  });
};



module.exports.getTPById=(req, res)=>{
  const data = {
    id: req.params.id
}

const callback = (error, results, fields) => {
    if (error) {
        console.error("Error readTaskProgressById:", error);
        res.status(500).json(error);
    } else {
        if(results.length == 0) 
        {
            res.status(404).json({
                message: "Progress not found"
            });
        }
        else res.status(200).json(results[0]);
    }
}

taskProgressModel.readById(data, callback);
}

module.exports.updateTaskProgress = (req, res) => {
  if (req.body.notes === undefined) {
    return res.status(400).json({
      message: "Error: Task Progress is undefined",
    });
  }

  const data = {
    id: req.params.id,
    notes: req.body.notes,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateTaskProgress:", error);
      return res.status(500).json(error);
    } else {
      if (results.affectedRows === 0) {
        return res.status(404).json({
          message: "Task Progress not found",
        });
      } else {
        // After updating, fetch the updated data
        taskProgressModel.readById({ id: data.id }, (readError, readResults) => {
          if (readError) {
            console.error("Error reading updated Task Progress:", readError);
            return res.status(500).json(readError);
          }
          // Send the updated data in the response
          return res.status(200).json(readResults[0]);
        });
      }
    }
  };

  taskProgressModel.updateById(data, callback);
};



module.exports.deleteTaskProgressById = (req, res, next) => {
  const data = {
    id: req.params.id
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteTaskProgressById:", error);
      res.status(500).json(error);
    } else {
      // Check if the deletion was successful
      if (results && results.affectedRows > 0) {
        res.status(204).send(); // 204 No Content
      } else {
        // User not found or not deleted
        res.status(404).json({
          message: "Task Progress not found or not deleted"
        });
      }
    }
  };

  // Call the deleteById method from userModel
  taskProgressModel.deleteById(data, callback);
};




