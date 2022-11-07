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

// Set up GET all and POST at /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route("/:id")
  .get(getSingleThought)
  .put(createThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
router.route("/:thoughtId/reactions").post(addReaction);

module.exports = router;