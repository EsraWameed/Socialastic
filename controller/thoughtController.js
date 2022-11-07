const { Thought, User } = require("../models");
//find all thoughts
module.exports ={
    getThoughts(req, res){
        Thought.find()
        .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
    },
    //get single thought by id
    getSingleThought(req, res){
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },
  // delete a thought
deleteThought(req, res) {
  Thought.findOneAndDelete({_id: req.params.id})
  .then((thought) => {
      if(!thought){
          res.status(404).json({message: 'No thought with that ID'}) 


      }      
      
      return User.findOneAndUpdate(
          {_id:req.body.userID},
          {$pull:{thoughts:thought._id}},
          {new:true}

      )
 }).then(() => res.json({message: 'User and associated apps deleted!'})).catch((err) => res.status(500).json(err));
},
// add Reaction
addReaction(req, res) {
  console.log('You are adding a reaction');
  console.log(req.body);
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body} },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res
            .status(404)
            .json({ message: 'No friend found with that ID :(' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},


//delete Reaction

deleteReaction(req, res) {
console.log(req.params)

  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId} } },
    { runValidators: true, new: true }
    
  )
    .then((thought) =>
   
      !thought
        ? res
            .status(404)
            .json({ message: 'No thought found with that ID :(' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},
};

module.exports = thoughtController;