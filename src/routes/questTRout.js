const express = require('express');
const router = express.Router();
const controller = require('../controllers/questTrController'); 

router.post('/:questId/:petId', controller.createQuestTrackerController);

router.delete('/:tracker_id', controller.deleteQuestTracker);


module.exports = router;