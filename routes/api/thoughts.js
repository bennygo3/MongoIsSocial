const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  newReaction,
  deleteReaction
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts).post(createThought);

// router.route('/:userId').post(createThought);

router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions/:reactionId').post(newReaction).delete(deleteReaction);



module.exports = router;