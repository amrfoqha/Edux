const RoomMessage = require('../models/room_message.model');

module.exports.findAllMessages = async (req, res) => {
    try {
        const messages = await RoomMessage.find()
            .populate('sender')
            .populate('room');
        res.json(messages);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};

module.exports.findOneMessage = async (req, res) => {
    try {
        const message = await RoomMessage.findOne({ _id: req.params.id })
            .populate('sender')
            .populate('room');
        res.json(message);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};

module.exports.createMessage = async (req, res) => {
    try {
        const message = await RoomMessage.create(req.body);
        const populated = await message.populate(['sender', 'room']);
        res.json(populated);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json(error.errors);
        }
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports.updateMessage = async (req, res) => {
    try {
        const message = await RoomMessage.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate(['sender', 'room']);
        res.json(message);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json(error.errors);
        }
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports.deleteMessage = async (req, res) => {
    try {
        const result = await RoomMessage.deleteOne({ _id: req.params.id });
        res.json(result);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};
