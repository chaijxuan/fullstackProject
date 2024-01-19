// usersRout.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController'); // Import usersController
const taskprogressRouter=require('./questTRout');
router.use('/taskprogress',taskprogressRouter);

// router.post('/', controller.register); // Use exported createUser function
router.get('/',controller.readAllUser);
 router.get('/:user_id', controller.getUserById);
 router.get('/taskprogress/:user_id', controller.getTPByUserId);
// router.put('/:id',controller.updateUserById);
//router.delete('/:id', controller.deleteUserById);
module.exports = router;
