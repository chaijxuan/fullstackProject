const inventoryModel = require("../models/petInventoryModel");

module.exports.getInventory = (req, res) => {
    const petId = req.params.pet_id;
  
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
  
    inventoryModel.getPetInventory({ pet_id: petId }, callback);
  
  };