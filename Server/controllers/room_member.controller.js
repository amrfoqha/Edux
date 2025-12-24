const RoomMember = require('../models/room_member.model');

module.exports.findAllMembers = async (req, res) => {
    try {
        const members = await RoomMember.find()
            .populate('user')
            .populate('room');
        res.json(members);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};

module.exports.findOneMember = async (req, res) => {
    try {
        const member = await RoomMember.findOne({ _id: req.params.id })
            .populate('user')
            .populate('room');
        res.json(member);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};

module.exports.createMember = async (req, res) => {
    try {
        const member = await RoomMember.create(req.body);
        const populated = await member.populate(['user', 'room']);
        res.json(populated);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json(error.errors);
        }
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports.updateMember = async (req, res) => {
    try {
        const member = await RoomMember.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate(['user', 'room']);
        res.json(member);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json(error.errors);
        }
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports.deleteMember = async (req, res) => {
    try {
        const result = await RoomMember.deleteOne({ _id: req.params.id });
        res.json(result);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};
