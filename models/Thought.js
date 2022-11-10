const {Schema,model,Types} = require('mongoose');

//Reaction schema only, mongoose subdocument for the reaction field in the thoughts model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
          },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
          },
        username: { type: String, required: true },
        createdAt: {
            type: Date,
            default: Date.now,
            get:() =>{
              let date = new Date();
              return date.toLocaleString();
          },
          },
       
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
);

//create thought schema/model

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        username: { type: String, required: true },
        //an array of nested documents created with reactionSchema
        reactios: [reactionSchema],
    },
    {
        toJSON: {
        virtuals: true,
          getters: true,
        },
        id: false,
      }
);

//a virtual called reactionCount that retreives the length of the thougt's reactions array field on query

thoughtSchema
.virtual('reactionCount')
.get(function(){
    return `${this.reactions.length}`
});

//initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;