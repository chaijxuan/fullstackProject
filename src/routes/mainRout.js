// mainRouter.js

const express = require('express');
const router = express.Router();

const usersRout = require('./usersRout'); // Import usersRout module
const taskRout= require('./tasksRout');
const taskProgressRout= require('./task_progressRout');

router.use('/users', usersRout); 
router.use('/tasks', taskRout);
router.use('/taskprogress', taskProgressRout);


const playerRout = require('./playerRout'); // Import usersRout module
const petRout=require('./petRout');
const questRout=require('./questRout');
const questTrackerRout=require('./questTRout')


router.use('/player', playerRout); 
router.use('/pet',petRout);
router.use('/quest',questRout);
router.use('/questTr',questTrackerRout)



module.exports = router;
