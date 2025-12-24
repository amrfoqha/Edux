const Notification = require('../models/notification.model');


module.exports.findAllNotifications = async (req, res) => {
    try {
        const answer = await Notification.find().populate('user')
        res.json(answer)
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}


module.exports.findNotificationsByUserId = async (req, res) => {
    try {
        const answer = await Notification.find({user: req.params.userId}).populate('user')
        res.json(answer)
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}


module.exports.findNotification = async (req, res) => {
    try {
        const answer = await Notification.findOne({_id: req.params.id}).populate('user')
        res.json(answer)
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}


module.exports.createNotification = async (req, res) => {
    try {
        const answer = await Notification.create(req.body);
        const populated = await Notification.findById(answer._id).populate('user');
        res.json(populated);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json(error.errors);
        }
        return res.status(500).json({ message: "Server error" });
    }
};



module.exports.updateNotification = async (req, res) => {
    try {
        const resp = await Notification.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('user');
        res.json(resp);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json(error.errors);
        }
        return res.status(500).json({ message: "Server error" });
    }
};


module.exports.deleteNotification = async (req, res) => {
    try {
        const answer = await Notification.deleteOne({_id: req.params.id})
        res.json(answer)
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}
