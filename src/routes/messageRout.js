const express = require('express');
const router = express.Router();

const controller = require('../controllers/messageController');
const tokenController = require('..//middleware/jwtMiddleware');

router.get('/', controller.readAllMessage);
router.post('/', controller.createMessage);
router.get('/token', tokenController.verifyToken, controller.readMessageById);
router.put('/token', tokenController.verifyToken, controller.updateMessageById);
router.delete('/token', tokenController.verifyToken, controller.deleteMessageById);

module.exports = router;