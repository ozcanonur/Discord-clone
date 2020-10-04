const User = require('../db/models/user');
const Channel = require('../db/models/channel');
const Message = require('../db/models/message');

const onUserCreatedPin = async (io, action) => {
  const { name, message, selectedChannel } = action.payload;
  // Find which user
  const user = await User.findOne({ name });
  // Create and save the message
  const newPinMessage = new Message({
    user,
    message,
    createdAt: new Date(),
  });
  await newPinMessage.save();

  // Find the channel
  const channel = await Channel.findOne({ _id: selectedChannel._id }).populate('pinnedMessages');
  // Save the message in channel's pins
  channel.pinnedMessages.push(newPinMessage);
  await channel.save();
  // Find users that are currently in this channel
  const users = await User.find({ currentChannel: selectedChannel._id });
  // Send all the pins to each of them
  for (let user of users) {
    io.to(user.socketId).emit('action', {
      type: 'io/pinnedMessages',
      payload: channel.pinnedMessages,
    });
  }
};

module.exports = { onUserCreatedPin };
