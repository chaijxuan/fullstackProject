const express = require('express');
const router = express.Router();

const controller = require('../controllers/messageController');
const tokenController = require('..//middleware/jwtMiddleware');


router.get('/', controller.readAllMessage);
router.post('/', tokenController.verifyToken,controller.createMessage);
router.get('/token', tokenController.verifyToken, controller.readMessageById);
router.put('/:id',tokenController.verifyToken,controller.updateMessageById);
router.delete('/:id', controller.deleteMessageById);

module.exports = router;