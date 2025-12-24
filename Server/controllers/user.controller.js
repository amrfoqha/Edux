const User = require('../models/User.model');


module.exports.findAllUsers = async (req, res) => {
    try {
        const answer = await User.find()
        res.json(answer)
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}


module.exports.findUser = async (req, res) => {
    try {
        const answer = await User.findOne({_id: req.params.id})
        res.json(answer)
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}


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
        const resp = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
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
        const answer = await User.deleteOne({_id: req.params.id})
        res.json(answer)
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}
