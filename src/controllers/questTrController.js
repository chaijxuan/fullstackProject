// controller/questController.js

const Quest = require("../models/quesTrModel");

module.exports.createQuestTrackerController = (req, res) => {
  const questId = req.params.questId;
  const petId = req.params.petId;

  Quest.toCheck(petId, questId, (error, canCreate) => {
    if (error) {
      console.error("Error checking conditions:", error);
      return res.status(500).json({ error: "Error checking conditions" });
    }

    if (canCreate) {
      // Conditions are met, create QuestTracker
      Quest.createQuestTracker({ quest_id: questId, pet_id: petId }, (createError, createResults) => {
        if (createError) {
          console.error("Error creating QuestTracker:", createError);
          return res.status(500).json({ error: "Error creating QuestTracker" });
        }

        // Check if createResults is not empty
        if (createResults && createResults.length > 0) {
          // Pet obtained the item
          const obtainedItem = createResults[0].obtained_item;

          if (obtainedItem !== undefined) {
            // QuestTracker created successfully
            console.log("QuestTracker created successfully");

            // Insert obtained item into PetInventory
            Quest.insertIntoPetInventory(petId, obtainedItem, (inventoryErr) => {
              if (inventoryErr) {
                console.error("Error inserting into PetInventory:", inventoryErr);
                return res.status(500).json({ error: "Error inserting into PetInventory" });
              }

              // Pet obtained the item
              console.log("Obtained item:", obtainedItem);
              res.status(201).json({ message: `You have obtained the item: ${obtainedItem}` });
            });
          } else {
            // Pet did not obtain the item
            console.log("No item obtained");
            res.status(201).json({ message: "QuestTracker created successfully" });
          }
        } else {
          // Handle the case where createResults is empty
          console.log("No item obtained");
          res.status(201).json({ message: "QuestTracker created successfully" });
        }
      });
    } else {
      // Pet points do not meet the unlock requirement
      console.log("Pet points do not meet the unlock requirement");
      res.status(400).json({ error: "Pet points do not meet the unlock requirement" });
    }
  });
};



// Delete QuestTracker by tracker_id
module.exports.deleteQuestTracker = (req, res) => {
  const trackerId = req.params.tracker_id;

  Quest.deleteQuestTrackerById(trackerId, (error, result) => {
    if (error) {
      console.error('Error deleting QuestTracker:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'QuestTracker deleted successfully' });
    }
  });
};


module.exports.getByPetId = (req, res) => {
  const petId = req.params.pet_id;

  Quest.getQuestTrackerByPetId(petId, (error, questTracker) => {
    if (error) {
      console.error('Error fetching quest tracker:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(questTracker);
    }
  });
};