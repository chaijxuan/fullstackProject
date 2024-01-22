// usersRout.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController'); // Import usersController
const tokenController=require('..//middleware/jwtMiddleware');
const playerController=require('../controllers/playerController')


const taskprogressRouter=require('./questTRout');
const playerRouter=require('./playerRout');


router.use('/taskprogress',taskprogressRouter);
router.use('/player',playerRouter);

// router.post('/', controller.register); // Use exported createUser function
router.get('/',controller.readAllUser);
//router.get('/:user_id', controller.getUserById);
router.get('/taskprogress/:user_id', controller.getTPByUserId);
router.get('/token/player', tokenController.verifyToken, playerController.getPlayerInfoByToken);

//router.get('/player/:user_email', controller.getPlayerByUserEmail);
// router.put('/:id',controller.updateUserById);
//router.delete('/:id', controller.deleteUserById);
module.exports = router;
