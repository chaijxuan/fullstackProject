const express = require('express');
const router = express.Router();
const controller = require('../controllers/task_progressContoller'); 

router.post('/', controller.createTaskProgress);
router.get('/:id', controller.getTPById);
router.put('/:id', controller.updateTaskProgress);
router.delete('/:id',controller.deleteTaskProgressById)


module.exports = router;