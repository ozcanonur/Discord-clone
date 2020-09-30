const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  channels: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Channel',
    },
  ],
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User,',
  },
});

const Server = mongoose.model('Server', ServerSchema);
module.exports = Server;
