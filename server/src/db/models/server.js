const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

const ChannelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  messages: {
    type: [MessageSchema],
    default: [],
  },
});

const ServerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  channels: {
    type: [ChannelSchema],
    default: [],
  },
  users: {
    type: [String],
    default: [],
  },
});

const Server = mongoose.model('Server', ServerSchema);
module.exports = { Server };
