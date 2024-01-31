const model = require("../models/messageModel.js");

module.exports.createMessage = (req, res, next) => {
    const userId = res.locals.userId;
    const { message_text } = req.body;

    // Check if required data is present
    if (!userId || !message_text) {
        return res.status(400).json({ error: "Missing required data" });
    }

    const messageData = {
        user_id: userId,  // Fix here: Use userId instead of userId
        message_text,
    };

    model.insertSingle(messageData, (error, results) => {
        if (error) {
            console.error("Error creating message:", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            // Player created successfully
            res.status(201).json({ message: "Message created successfully", player: results });
        }
    });
};

module.exports.readMessageById = (req, res, next) => {
    const data = {
        id: res.locals.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readMessageById:", error);
            res.status(500).json(error);
        } else {
            if (results.length === 0) {
                res.status(404).json({
                    message: "Message not found"
                });
            } else {
                res.status(200).json({ messages: results });
            }
        }
    }

    model.selectById(data, callback);
}

module.exports.readAllMessage = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectAll(callback);
}

module.exports.updateMessageById = (req, res, next) => {
    const { message_text } = req.body;
    const userId = res.locals.userId;
    const id = req.params.id; // the parameter is named 'id'

    const data = {
        message_text,
        userId,
        id
    };

    model.updateById(data, (updateError, result) => {
        if (updateError) {
            console.error("Error updating message:", updateError);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (result.affectedRows === 0) {
            // No rows were affected, indicating that the pet ID might not exist
            return res.status(404).json({ error: " not found or no changes applied" });
        }

        // Equipment updated successfully
        res.status(200).json({ message: "Message updated successfully" });
    });
};



module.exports.deleteMessageById = (req, res, next) => {
    const data = {
        id:req.params.id,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteMessageById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.deleteById(data, callback);
}