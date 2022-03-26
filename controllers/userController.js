const { User } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const userData = await User.find();
            res.status(200).json(userData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.status(200).json(userData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async getSingleUser(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.id })
                .select('-__v')
                .populate('thoughts')
                .populate('friends')
            if (!userData) {
                res.status(404).json({ message: 'No user with that ID' })
                return;
            }
            res.status(200).json(userData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async updateUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true, runValidators: true }
            );
            if (!userData) {
                res.status(404).json({ message: 'No user with that ID' })
                return;
            }
            res.status(200).json(userData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async deleteUser(req, res) {
        try {
            const userData = await User.findOneAndDelete(
                { _id: req.params.id }
            );
            if (!userData) {
                res.status(404).json({ message: "No user with that ID" });
                return;
            }
            res.status(200).json(userData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async addFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { friends: req.params.friendId } },
                { new: true }
            )
                .select("-__v")
                .populate("friends")
            if (!userData) {
                res.status(404).json({ message: "Unable to complete friend request" });
                return;
            }
            res.status(200).json(userData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async deleteFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            )
                .select("-__v")
                .populate("friends")
            if (!userData) {
                res.status(404).json({ message: "No user with that ID" });
                return;
            }
            res.status(200).json(userData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

