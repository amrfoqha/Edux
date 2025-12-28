const Chat = require('../models/chat.model');
const mongoose = require('mongoose');


module.exports.findAllChats = async (req, res) => {
    try {
        const answer = await Chat.find().populate('resource').populate('sender').populate('receiver')
        res.json(answer)
    } catch (error) {
        return res.status(400).send({ error: error.message })
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
        return res.status(400).send({ error: error.message })
    }
}


module.exports.findChat = async (req, res) => {
    try {
        const answer = await Chat.findOne({ _id: req.params.id }).populate('resource').populate('sender').populate('receiver')
        res.json(answer)
    } catch (error) {
        return res.status(400).send({ error: error.message })
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
        const answer = await Chat.deleteOne({ _id: req.params.id })
        res.json(answer)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

module.exports.getConversation = async (req, res) => {
    try {
        const { otherUserId } = req.params;
        const currentUserId = req.user.id;

        const messages = await Chat.find({
            $or: [
                { sender: currentUserId, receiver: otherUserId },
                { sender: otherUserId, receiver: currentUserId }
            ]
        })
            .sort({ createdAt: 1 })
            .populate('sender', '_id name')
            .populate('receiver', '_id name');

        res.json(messages);
    } catch (error) {
        console.error("Error fetching conversation:", error);
        return res.status(500).json({ message: "Failed to fetch conversation" });
    }
};

module.exports.getUnreadCounts = async (req, res) => {
    try {
        const userId = req.user.id;
        const unreadCounts = await Chat.aggregate([
            {
                $match: {
                    receiver: new mongoose.Types.ObjectId(userId),
                    isRead: false
                }
            },
            {
                $group: {
                    _id: "$sender",
                    count: { $sum: 1 }
                }
            }
        ]);

        const countsMap = unreadCounts.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {});

        res.json(countsMap);
    } catch (error) {
        console.error("Error fetching unread counts:", error);
        return res.status(500).json({ message: "Failed to fetch unread counts" });
    }
};

module.exports.markAsRead = async (req, res) => {
    try {
        const { senderId } = req.params;
        const currentUserId = req.user.id;

        await Chat.updateMany(
            {
                sender: senderId,
                receiver: currentUserId,
                isRead: false
            },
            {
                $set: { isRead: true }
            }
        );

        res.json({ success: true });
    } catch (error) {
        console.error("Error marking messages as read:", error);
        return res.status(500).json({ message: "Failed to mark messages as read" });
    }
};

module.exports.getLastMessages = async (req, res) => {
    try {
        const currentUserId = new mongoose.Types.ObjectId(req.user.id);

        const lastMessages = await Chat.aggregate([
            {
                $match: {
                    $or: [
                        { sender: currentUserId },
                        { receiver: currentUserId }
                    ]
                }
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $group: {
                    _id: {
                        $cond: [
                            { $eq: ["$sender", currentUserId] },
                            "$receiver",
                            "$sender"
                        ]
                    },
                    lastMessage: { $first: "$message" },
                    createdAt: { $first: "$createdAt" }
                }
            }
        ]);

        const lastMessagesMap = lastMessages.reduce((acc, curr) => {
            acc[curr._id] = {
                message: curr.lastMessage,
                timestamp: curr.createdAt
            };
            return acc;
        }, {});

        res.json(lastMessagesMap);
    } catch (error) {
        console.error("Error fetching last messages:", error);
        return res.status(500).json({ message: "Failed to fetch last messages" });
    }
};
