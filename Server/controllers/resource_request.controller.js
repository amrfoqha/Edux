const ResourceRequest = require("../models/resource_request.model");

module.exports.findAllRequests = async (req, res) => {
  try {
    const requests = await ResourceRequest.find()
      .populate("resource")
      .populate("owner")
      .populate("requestor");
    res.json(requests);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports.findOneRequest = async (req, res) => {
  try {
    const request = await ResourceRequest.findOne({ _id: req.params.id })
      .populate("resource")
      .populate("owner")
      .populate("requestor");
    res.json(request);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports.createRequest = async (req, res) => {
  try {
    const request = await ResourceRequest.create(req.body);
    const populated = await request.populate("resource owner requestor");
    res.json(populated);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json(error.errors);
    }
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports.updateRequest = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    const request = await ResourceRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate(["resource owner requestor"]);
    res.json(request);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json(error.errors);
    }
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports.deleteRequest = async (req, res) => {
  try {
    const result = await ResourceRequest.deleteOne({ _id: req.params.id });
    res.json(result);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports.getResourceStatus = async (req, res) => {
  try {
    const request = await ResourceRequest.findOne({
      resource: req.params.id,
      requestor: req.params.user,
    })
      .populate("resource")
      .populate("owner")
      .populate("requestor");
    if (!request) return null;
    res.json(request.status);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports.getUserRequests = async (req, res) => {
  try {
    const requests = await ResourceRequest.find({ owner: req.params.id })
      .populate("resource")
      .populate("owner")
      .populate("requestor");
    res.json(requests);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};
