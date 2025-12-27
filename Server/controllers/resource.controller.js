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
