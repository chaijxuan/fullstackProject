const express = require('express');
const router = express.Router();
const controller = require('../controllers/petsController');

// router.post('/', controller.createPet);
// router.get('/:petId', controller.getPetById);
// //router.put('/:petId/update',controller.upgradeThePet);
// router.delete('/:petId', controller.deletePetAndRelationsController);
// router.get('/petinventory/:id', controller.getInventory);
// router.post('/pvp/:pet1Id/:pet2Id', controller.pvp);
// router.put('/:petId',controller.updatePetEquipment);
router.get('/:playerId', controller.getPetsByPlayerId);



module.exports = router;