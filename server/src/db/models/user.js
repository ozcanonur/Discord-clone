const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  socketId: String,
  servers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Server',
    },
  ],
  currentChannel: {
    type: Schema.Types.ObjectId,
    ref: 'Channel',
  },
  online: Boolean,
  lastActiveAt: Date,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
