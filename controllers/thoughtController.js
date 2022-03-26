const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughtData = await Thought.find()
                .select('-__v')
                .populate({ path: 'reactions', select: '-__v' });
            res.status(200).json(thoughtData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thoughtData = await Thought.findOne(
                { _id: req.params.id }
            )
                .select('-__v')
                .populate({ path: 'reactions', select: '-__v' });
            if (!thoughtData) {
                res.status(404).json({
                    message: 'This ID does not have any posted thoughts',
                });
            } res.status(200).json(thoughtData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            await User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { thoughts: thoughtData._id } },
                { new: true }
            ).populate('thoughts'); console.log(thoughtData)
            res.status(200).json(thoughtData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.id, },
                req.body,
                { new: true, runValidators: true }
            )
                .select('-__v')
                .populate({ path: 'reactions', select: '-__v' });
            if (!thoughtData) {
                res.status(404).json({
                    message: "Couldn't update thought"
                });
            } res.status(200).json(thoughtData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.deleteOne(
                { _id: req.params.id }
            );
            if (!thoughtData) {
                res.status(404).json({
                    message: "Unable to delete thought"
                });
            } res.status(200).json(thoughtData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async newReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId, },
                { $push: { reactions: req.body } },
                { new: true, runValidators: true }
            )
                .select('-__v')
                .populate({ path: 'reactions', select: '-__v' });
            if (!thoughtData) {
                res.status(404).json({
                    message: "Couldn't create new reaction"
                });
            } res.status(200).json(thoughtData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async deleteReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId, },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thoughtData) {
                res.status(404).json({
                    message: "Couldn't delete reaction"
                });
            } res.status(200).json(thoughtData);
        } catch (error) {
            res.status(500).json(error);
        }
    }

}





