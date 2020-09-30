const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
  voice: {
    type: Boolean,
    default: false,
  },
});

const Channel = mongoose.model('Channel', ChannelSchema);
module.exports = Channel;
