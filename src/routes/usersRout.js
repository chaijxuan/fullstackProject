// usersRout.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController'); // Import usersController

// router.post('/', controller.register); // Use exported createUser function
// router.get('/',controller.readAllUser);
// router.get('/:user_id', controller.getUserById);
// router.put('/:id',controller.updateUserById);
 router.delete('/:id', controller.deleteUserById);
module.exports = router;
