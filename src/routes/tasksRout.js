//takRout
const express = require('express');
const router = express.Router();
const controller = require('../controllers/tasksController'); // Import usersController

router.post('/', controller.createNewTask);
router.get('/', controller.readAllTask);
router.get('/:id', controller.readTaskById);
router.put('/:id', controller.updateTaskById);
router.delete('/:id', controller.deleteTaskById);


module.exports = router;