const Room = require("../models/room.model");

const RoomMember = require("../models/room_member.model");

module.exports.findAllRooms = async (req, res) => {
  try {
    const userId = req.user?.id;

    const rooms = await Room.find().populate("owner").lean();

    if (!userId) {
      return res.json(rooms.map(r => ({ ...r, isMember: false })));
    }

    const roomIds = rooms.map((r) => r._id);

    const memberships = await RoomMember.find({
      user: userId,
      room: { $in: roomIds },
    }).select("room").lean();

    const memberSet = new Set(memberships.map((m) => String(m.room)));

    const withFlags = rooms.map((r) => ({
      ...r,
      isMember: memberSet.has(String(r._id)),
    }));

    return res.json(withFlags);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};


module.exports.findRoom = async (req, res) => {
  try {
    const answer = await Room.findOne({ _id: req.params.id }).populate("owner");
    res.json(answer);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports.createRoom = async (req, res) => {
  try {
    const answer = await Room.create(req.body);
    answer.memberCount += 1;
    await answer.save();
    const populated = await Room.findById(answer._id).populate("owner");
    res.json(populated);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json(error.errors);
    }
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.updateRoom = async (req, res) => {
  try {
    const resp = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("owner");
    res.json(resp);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json(error.errors);
    }
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.deleteRoom = async (req, res) => {
  try {
    const answer = await Room.deleteOne({ _id: req.params.id });
    res.json(answer);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};
