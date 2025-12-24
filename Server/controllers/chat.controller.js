const Chat = require('../models/chat.model');


module.exports.findAllChats = async (req, res) => {
    try {
        const answer = await Chat.find().populate('resource').populate('sender').populate('receiver')
        res.json(answer)
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}


module.exports.findChatsByUserId = async (req, res) => {
    try {
        const answer = await Chat.find({
            $or: [
                { sender: req.params.userId },
                { receiver: req.params.userId }
            ]
        }).populate('resource').populate('sender').populate('receiver')
        res.json(answer)
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}


module.exports.findChat = async (req, res) => {
    try {
        const answer = await Chat.findOne({_id: req.params.id}).populate('resource').populate('sender').populate('receiver')
        res.json(answer)
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}


module.exports.createChat = async (req, res) => {
    try {
        const answer = await Chat.create(req.body);
        const populated = await Chat.findById(answer._id).populate('resource').populate('sender').populate('receiver');
        res.json(populated);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json(error.errors);
        }
        return res.status(500).json({ message: "Server error" });
    }
};



module.exports.updateChat = async (req, res) => {
    try {
        const resp = await Chat.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('resource').populate('sender').populate('receiver');
        res.json(resp);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json(error.errors);
        }
        return res.status(500).json({ message: "Server error" });
    }
};


module.exports.deleteChat = async (req, res) => {
    try {
        const answer = await Chat.deleteOne({_id: req.params.id})
        res.json(answer)
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}
