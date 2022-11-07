const router = require("express").Router();

const {
    getThoughts,
    getSingleThought,
  createThought,
  createThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controller/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router
  .route("/:id")
  .get(getSingleThought)
  .put(createThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
router.route("/:thoughtId/reactions").post(addReaction);

module.exports = router;