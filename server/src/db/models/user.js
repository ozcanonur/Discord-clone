const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  socketId: {
    type: String,
  },
  servers: [
    {
      type: String,
    },
  ],
  currentChannel: {
    type: String,
  },
  online: {
    type: Boolean,
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = { User };
