//playerRout.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/playerController'); 
const middleware=require('../middleware/jwtMiddleware')
const petsRouter = require('./petRout'); 

router.use('/pets', petsRouter);

router.post('/', middleware.verifyToken,controller.createPlayer);
router.delete('/:id', controller.deletePlayer);
//router.get('/:id', controller.getPlayerByIdWithAuth);
router.get('/pet/:playerId', controller.getPetsByPlayerController);
router.get('/', controller.getAllPlayers);
router.get('/:user_email', controller.getPlayerByUserEmail);


module.exports = router;