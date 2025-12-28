const Resource = require("../models/Resource.model");
const User = require("../models/User.model");

module.exports.findAllResources = async (req, res) => {
  try {
    const answer = await Resource.find().populate("uploader");
    res.json(answer);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports.findResource = async (req, res) => {
  try {
    const answer = await Resource.findOne({ _id: req.params.id }).populate(
      "uploader"
    );
    res.json(answer);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports.createResource = async (req, res) => {
  const { uploader } = req.body;

  try {
    const resource = await Resource.create(req.body);
    const populated = await resource.populate("uploader");
    await User.findByIdAndUpdate(uploader, {
      $addToSet: { resources: resource._id },
    });
    res.json(populated);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json(error.errors);
    }
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.updateResource = async (req, res) => {
  try {
    const resp = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("uploader");
    res.json(resp);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json(error.errors);
    }
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.deleteResource = async (req, res) => {
  try {
    const answer = await Resource.deleteOne({ _id: req.params.id });
    res.json(answer);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports.getResourcesByPage = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 9, 1);
    const skip = (page - 1) * limit;
    console.log(req.query);

    const { q, type, university, faculty, department } = req.query;
    console.log(q, type, university, faculty, department);
    const filter = {};

    if (q && q.trim()) {
      const regex = new RegExp(q.trim(), "i");
      filter.$or = [
        { title: regex },
        { description: regex },
        { tags: { $in: [regex] } },
      ];
    }

    if (type) filter.type = type;
    if (university) filter.university = university;
    if (faculty) filter.faculty = faculty;
    if (department) filter.department = department;

    const totalItems = await Resource.countDocuments(filter);

    const resources = await Resource.find(filter)
      .populate("uploader", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      currentPage: page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      hasNextPage: page * limit < totalItems,
      hasPrevPage: page > 1,
      data: resources,
    });
  } catch (error) {
    console.error("Pagination Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
