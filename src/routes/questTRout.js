const express = require('express');
const router = express.Router();
const controller = require('../controllers/questTrController'); 

router.post('/:questId/:petId', controller.createQuestTrackerController);
router.get('/:pet_id',controller.getByPetId);
router.delete('/:tracker_id', controller.deleteQuestTracker);


module.exports = router;