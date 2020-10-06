const User = require('../db/models/user');
const Channel = require('../db/models/channel');

const onUserSelectedChannel = async (socket, action) => {
  const { name, channel } = action.payload;
  // Leave the current channel first
  const user = await User.findOne({ name }).populate('currentChannel');
  if (user.currentChannel) await socket.leave(user.currentChannel._id.toString());

  // Join the new channel
  await socket.join(channel._id.toString());
  // Update the user's current channel
  await User.updateOne({ name }, { currentChannel: channel });
  // Find the older messages in the channel
  const currChannel = await Channel.findOne({ _id: channel._id }).populate([
    {
      path: 'messages',
      model: 'Message',
      populate: {
        path: 'user',
        model: 'User',
      },
    },
    {
      path: 'pinnedMessages',
      model: 'Message',
      populate: {
        path: 'user',
        model: 'User',
      },
    },
  ]);
  // Emit the older messages to client
  socket.emit('action', { type: 'io/messages', payload: currChannel.messages });
  // Emit the pins also, Sort by date first
  const sortedPinnedMessaages = currChannel.pinnedMessages.sort(
    (x, y) => y.createdAt - x.createdAt
  );
  socket.emit('action', { type: 'io/pinnedMessages', payload: sortedPinnedMessaages });
};

const onUserSelectedFriendChannel = async (socket, action) => {
  const { name, friendName } = action.payload;
  // Leave the current channel first
  const user = await User.findOne({ name }).populate('currentChannel');
  if (user.currentChannel) await socket.leave(user.currentChannel._id.toString());

  // Find the channel, try both combinations since we don't know who added who
  // And we created the channel name via concat'ing the names above
  const populateFields = {
    path: 'messages',
    model: 'Message',
    populate: {
      path: 'user',
      model: 'User',
    },
  };
  let channel =
    (await Channel.findOne({ name: `${name}${friendName}_private` }).populate(populateFields)) ||
    (await Channel.findOne({ name: `${friendName}${name}_private` }).populate(populateFields));
  // Join the new channel
  await socket.join(channel._id.toString());
  // Update user's channel
  await User.updateOne({ name }, { currentChannel: channel });
  // Emit the older messages to the user
  socket.emit('action', { type: 'io/messages', payload: channel.messages });
};

module.exports = { onUserSelectedChannel, onUserSelectedFriendChannel };
