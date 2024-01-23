// petController.js

const Pet = require("../models/petsModel");

module.exports.createPet = (req, res) => {
  const petData = req.body;

  Pet.createPet(petData, (error, results, fields) => {
    if (error) {
      console.error("Error creating pet:", error);
      res.status(500).json({ error: "Error creating pet" });
    } else {
      const petId = results.insertId;

      // Insert into PlayerPetRelation table
      Pet.insertIntoRelation(petData, petId, (error, results, fields) => {
        if (error) {
          console.error("Error inserting into relation:", error);
        } else { 
          console.log("Inserted into relation successfully");
        }
      });

      res.status(201).json({ message: "Pet created successfully", pet_id: petId });
    }
  });
};

// Controller function to get a specific pet by pet ID
module.exports.getPetById = (req, res) => {
  const petId = req.params.petId;

  Pet.getPetDetails(petId, (error, results, fields) => {
    if (error) {
      console.error("Error getting pet by ID:", error);
      res.status(500).json({ error: "Error getting pet by ID" });
    } else {
      if (results.length === 0) {
        return res.status(404).json({
          message: "Pet not found"
        });
      }
      
      // Assuming you want to send the pet details in the response
      const petDetails = results[0];

      // Update points after getting the pet details
      Pet.updatePetPoints(petId, (updateError, updateResults, updateFields) => {
        if (updateError) {
          console.error("Error updating points by ID:", updateError);
          res.status(500).json({ error: "Error updating points by ID" });
        } else {
          // Assuming you want to send the updated pet details with points
          const updatedPetDetails = {
            ...petDetails,
            
            //if more than 0 than assign the point if not assign zero then
            points: updateResults.affectedRows > 0 ? petDetails.points : 0
          };
          
          res.status(200).json(updatedPetDetails);
        }
      });
    }
  });
};



module.exports.deletePetAndRelationsController = (req, res) => {
  const petId = req.params.petId;

  // Delete related entries in PlayerPetRelation table first
  Pet.deletePlayerPetRelationByPetId(petId, (relationDeleteError, relationDeleteResults) => {
    if (relationDeleteError) {
      console.error('Error deleting playerpetrelation:', relationDeleteError);
      res.status(500).json({ error: 'Error deleting playerpetrelation' });
    } else {
      // Now delete the pet
      Pet.deletePetById(petId, (deleteError, deleteResults) => {
        if (deleteError) {
          console.error('Error deleting pet:', deleteError);
          res.status(500).json({ error: 'Error deleting pet' });
        } else {
          if (deleteResults.affectedRows === 0) {
            res.status(404).json({ message: 'Pet not found for deletion' });
          } else {
            res.status(200).json({ message: 'Pet and related entries deleted successfully' });
          }
        }
      });
    }
  });
};


/*module.exports.upgradeThePet = (req, res) => {
  const petId = req.params.petId;

  // Upgrade pet level
  Pet.upgradePetLevel({ petId }, (upgradeError, upgradeResults) => {
    if (upgradeError) {
      console.error('Error upgrading pet level:', upgradeError);
      return res.status(500).json({ error: 'Error upgrading pet level' });
    }

    // Delete completed quest entries
    Pet.deleteCompletedQuestEntries({ petId }, (deleteQuestError, deleteQuestResults) => {
      if (deleteQuestError) {
        console.error('Error deleting completed quest entries:', deleteQuestError);
        return res.status(500).json({ error: 'Error deleting completed quest entries' });
      }

      res.status(200).json({ message: 'Pet actions performed successfully' });
    });
  });
};*/



module.exports.getInventory = (req, res) => {
  const petId = req.params.id;

  const callback = (error, results) => {
    if (error) {
      console.error("Error getInventory:", error);
      res.status(500).json(error);
    } else {
      // Groups the results by pet_name and constructs a final result array with a structure of { pet_name, obtained_items }
      const groupedResults = results.reduce((acc, item) => {
        const petName = item.pet_name;
        // If the petName is not present in the accumulator, initialize it with an empty array
        if (!acc[petName]) {
          acc[petName] = [];
        }
        if (item.obtained_item) {
          acc[petName].push(item.obtained_item);
        }
        return acc;
      }, {});

      // Convert the grouped results into an array of objects
      const finalResult = Object.entries(groupedResults).map(([petName, obtainedItems]) => {
        return {
          pet_name: petName,
          obtained_items: obtainedItems
        };
      });

      res.status(200).json(finalResult);
    }
  };

  Pet.getPetInventory({ id: petId }, callback);
};


module.exports.pvp = (req, res) => {
  const pet1Id = req.params.pet1Id;
  const pet2Id = req.params.pet2Id;

  Pet.pvp(pet1Id, pet2Id, (error, result) => {
    if (error) {
      console.error('Error performing PvP comparison:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ result });
    }
  });
};


module.exports.updatePetEquipment = (req, res) => {
  const petId = req.params.petId;
  const { weapon, head, armour } = req.body;

  // Proceed with the update
  Pet.updateEquipment(petId, weapon, head, armour, (updateError, result) => {
    if (updateError) {
      console.error("Error updating equipment:", updateError);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.affectedRows === 0) {
      // No rows were affected, indicating that the pet ID might not exist
      return res.status(404).json({ error: "Pet not found or no changes applied" });
    }

    // Equipment updated successfully
    res.status(200).json({ message: "Equipment updated successfully" });
  });
};








module.exports.getPetsByPlayerId = (req, res) => {
  const playerId = req.params.playerId;

  Pet.getPetsByPlayerId(playerId, (error, pets) => {
    if (error) {
      console.error('Error fetching pets:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Update points for each pet
      pets.forEach((pet) => {
        Pet.updatePetPoints(pet.id, playerId, (updateError, updateResult) => {
          if (updateError) {
            console.error('Error updating pet points:', updateError);
          } else {
            console.log(`Points updated for Pet ID ${pet.id}`);
          }
        });
      });

      res.status(200).json(pets);
    }
  });
};

