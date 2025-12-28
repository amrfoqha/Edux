const User = require("../models/User.model");

module.exports.findAllUsers = async (req, res) => {
  try {
    const answer = await User.find();
    res.json(answer);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports.findUser = async (req, res) => {
  try {
    const answer = await User.findOne({ _id: req.params.id });
    res.json(answer);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const answer = await User.create(req.body);
    res.json(answer);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json(error.errors);
    }
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const resp = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(resp);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json(error.errors);
    }
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const answer = await User.deleteOne({ _id: req.params.id });
    res.json(answer);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("resources");

    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.getUserResourcesPage = async (req, res) => {
  try {
    const userId = req.params.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const searchQuery = req.query.q || "";
    const typeFilter = req.query.type || "";

    // base filter: only user's resources
    let filter = {
      uploader: userId,
    };

    // search
    if (searchQuery) {
      filter.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { tags: { $regex: searchQuery, $options: "i" } },
      ];
    }

    // filter by type
    if (typeFilter) {
      filter.type = typeFilter;
    }

    const totalItems = await Resource.countDocuments(filter);

    const resources = await Resource.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      hasNextPage: page < Math.ceil(totalItems / limit),
      hasPrevPage: page > 1,
      data: resources,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
