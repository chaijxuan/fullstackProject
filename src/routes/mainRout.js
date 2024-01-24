// mainRouter.js

const express = require('express');
const router = express.Router();


const usersRout = require('./usersRout'); // Import usersRout module
const taskRout= require('./tasksRout');
const taskProgressRout= require('./task_progressRout');
const playerRout = require('./playerRout'); // Import usersRout module
const petRout=require('./petRout');
const questRout=require('./questRout');
const questTrackerRout=require('./questTRout');
const petInventoryRout=require('./petinventoryRout')



router.use('/player', playerRout); 
router.use('/pet',petRout);
router.use('/quest',questRout);
router.use('/questTr',questTrackerRout)
router.use('/users', usersRout); 
router.use('/tasks', taskRout);
router.use('/taskprogress', taskProgressRout);
router.use('/player',playerRout)
router.use('/petinventory', petInventoryRout)



const jwtMiddleware=require('../middleware/jwtMiddleware');
const bcryptMiddleware=require('../middleware/bcryptMiddleware');
const userController=require('../controllers/usersController');



router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);




/*************************************************************************************** */



module.exports = router;
