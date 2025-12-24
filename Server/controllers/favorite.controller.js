const Favorite = require('../models/favorite.model');


module.exports.findAllFavorites = async (req, res) => {
    try {
        const answer = await Favorite.find().populate('resource').populate('user')
        res.json(answer)
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}


module.exports.findFavoritesByUserId = async (req, res) => {
    try {
        const answer = await Favorite.find({user: req.params.userId}).populate('resource').populate('user')
        res.json(answer)
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}


module.exports.findFavorite = async (req, res) => {
    try {
        const answer = await Favorite.findOne({_id: req.params.id}).populate('resource').populate('user')
        res.json(answer)
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}


module.exports.createFavorite = async (req, res) => {
    try {
        const existingFavorite = await Favorite.findOne({
            user: req.body.user,
            resource: req.body.resource
        });

        if (existingFavorite) {
            return res.status(400).json({ message: "This resource is already in your favorites" });
        }

        const answer = await Favorite.create(req.body);
        const populated = await Favorite.findById(answer._id).populate('resource').populate('user');
        res.json(populated);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json(error.errors);
        }
        return res.status(500).json({ message: "Server error" });
    }
};



module.exports.updateFavorite = async (req, res) => {
    try {
        const resp = await Favorite.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('resource').populate('user');
        res.json(resp);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json(error.errors);
        }
        return res.status(500).json({ message: "Server error" });
    }
};


module.exports.deleteFavorite = async (req, res) => {
    try {
        const answer = await Favorite.deleteOne({_id: req.params.id})
        res.json(answer)
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}
