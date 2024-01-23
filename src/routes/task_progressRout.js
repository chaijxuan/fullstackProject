const express = require('express');
const router = express.Router();
const controller = require('../controllers/task_progressContoller'); 

// router.post('/', controller.createTaskProgress);
// router.get('/:id', controller.getTPById);
// router.put('/:id', controller.updateTaskProgress);
// router.delete('/:id',controller.deleteTaskProgressById);
router.get('/:user_id', controller.getTPByUserId);


module.exports = router;