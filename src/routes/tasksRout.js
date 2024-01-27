//takRout
const express = require('express');
const router = express.Router();
const controller = require('../controllers/tasksController'); // Import usersController
const tokenController=require('../middleware/jwtMiddleware')
router.post('/', controller.createNewTask);
router.get('/', controller.readAllTask);
router.get('/:id', controller.readTaskById);
router.put('/:id',tokenController.verifyToken, controller.updateTaskById);
router.delete('/:id', controller.deleteTaskById);


module.exports = router;