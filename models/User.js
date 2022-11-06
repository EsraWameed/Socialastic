const {Schema,model} = require('mongoose');

const userSchema = new Schema(
    {
        //string, unique, requried, trimmed
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
          },
          // string, required, unique, must match valid email address
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: {
                validator: function(v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Please enter a valid email"
            },
        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'thought',
            },
          ],
          friends: [
            {
              type: Schema.Types.ObjectId,
              ref: 'user',
            },
          ],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
)
//a virtual called friendCount that retreives length of the user's friends array field on query