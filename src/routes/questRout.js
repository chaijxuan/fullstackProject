const express = require('express');
const router = express.Router();
const controller = require('../controllers/questController'); 

router.post('/', controller.createQuest);
router.get('/', controller.getAll);
router.put('/:id', controller.editQuestById)
router.get('/:id', controller.getQuestById); 
router.delete('/:id', controller.deleteQuestById);


module.exports = router;