const express = require('express');
const router = express.Router();
const controller = require('../controllers/petsController');

 router.post('/:player_id', controller.createPet);
//router.get('/petname/:petId', controller.getPetById);
// //router.put('/:petId/update',controller.upgradeThePet);
// router.delete('/:petId', controller.deletePetAndRelationsController);
router.get('/petinventory/:pet_id', controller.getInventory);
router.post('/pvp/:pet1Id', controller.pvp);
router.get('/',controller.getAll);
router.put('/:petId',controller.updatePetEquipment);
router.get('/:playerId', controller.getPetsByPlayerId);
router.get('petname/:petId', controller.getPetNameById)



module.exports = router;