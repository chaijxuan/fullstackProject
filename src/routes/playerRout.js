//playerRout.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/playerController'); 
const petsRouter = require('./petRout'); 
router.use('/pets', petsRouter);

router.post('/', controller.createPlayer);
router.delete('/:id', controller.deletePlayer);
//router.get('/:id', controller.getPlayerByIdWithAuth);
router.get('/pet/:playerId', controller.getPetsByPlayerController);
router.get('/', controller.getAllPlayers);
router.get('/:user_email', controller.getPlayerByUserEmail);


module.exports = router;