const User = require('../db/models/user');
const Channel = require('../db/models/channel');
const Message = require('../db/models/message');
const Server = require('../db/models/server');

const { reduceMessages } = require('./util');

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
  const channel = await Channel.findOne({ _id: selectedChannel._id }).populate({
    path: 'pinnedMessages',
    model: 'Message',
    populate: {
      path: 'user',
      model: 'User',
    },
  });
  // Save the message in channel's pins
  channel.pinnedMessages.push(newPinMessage);
  await channel.save();
  // Find users that are currently in this channel
  const users = await User.find({ currentChannel: channel._id });
  // Send all the pins to each of them
  // Sort by date first
  const sortedPinnedMessages = channel.pinnedMessages.sort((x, y) => y.createdAt - x.createdAt);
  users.forEach((user) => {
    io.to(user.socketId).emit('action', {
      type: 'io/pinnedMessages',
      payload: reduceMessages(sortedPinnedMessages),
    });
  });
  // Find the channel's server, send notification to all users subscribed to that server
  const server = await Server.findOne({ channels: { $all: [channel.id] } }).populate('users');
  server.users.forEach((user) => {
    io.to(user.socketId).emit('action', {
      type: 'io/notification',
      payload: { type: 'pin', channel },
    });
  });
};

module.exports = { onUserCreatedPin };
