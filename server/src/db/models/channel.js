const Message = require('./message');

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
  category: String,
  pinnedMessages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

ChannelSchema.pre('remove', async function (next) {
  const channel = this;
  // Remove the messages in this channel
  const messageIds = channel.messages;
  await Message.deleteMany({ _id: { $in: messageIds } });

  next();
});

const Channel = mongoose.model('Channel', ChannelSchema);
module.exports = Channel;
