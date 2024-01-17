const express = require('express');
const router = express.Router();
const controller = require('../controllers/playerController'); 

router.post('/', controller.createPlayer);
router.delete('/:id', controller.deletePlayer);
router.get('/:id', controller.getPlayerByIdWithAuth);
router.get('/pet/:playerId', controller.getPetsByPlayerController);


module.exports = router;