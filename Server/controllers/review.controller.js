const Review = require('../models/review.model');

module.exports.findAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('user')
            .populate('resource');
        res.json(reviews);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};

module.exports.findOneReview = async (req, res) => {
    try {
        const review = await Review.findOne({ _id: req.params.id })
            .populate('user')
            .populate('resource');
        res.json(review);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};

module.exports.createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        const populated = await review.populate(['user', 'resource']);
        res.json(populated);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json(error.errors);
        }
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports.updateReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate(['user', 'resource']);
        res.json(review);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json(error.errors);
        }
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports.deleteReview = async (req, res) => {
    try {
        const result = await Review.deleteOne({ _id: req.params.id });
        res.json(result);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};
