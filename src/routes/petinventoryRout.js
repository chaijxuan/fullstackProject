const express = require('express');
const router = express.Router();
const controller = require('../controllers/petInventoryController'); 

router.get('/:pet_id', controller.getInventory);



module.exports = router;