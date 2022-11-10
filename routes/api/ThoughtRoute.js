const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  // createThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controller/thoughtController");

router.route("/").get(getAllThoughts).post(createThought);

router
  .route("/:id")
  .get(getThoughtById)
  .put(createThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
router.route("/:thoughtId/reactions").post(addReaction);

module.exports = router;