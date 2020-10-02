const User = require('./db/models/user');
const Channel = require('./db/models/channel');
const Message = require('./db/models/message');

const onUserSelectedChannel = async (socket, action) => {
  const { name, channel } = action.payload;
  // Update the user's current channel
  await User.updateOne({ name }, { currentChannel: channel });
  // Join the channel room
  console.log(name + ' joined id of: ' + channel._id + ' with type ' + typeof channel._id);
  socket.join(channel._id);
  // Find the older messages in the channel
  const currChannel = await Channel.findOne({ _id: channel._id }).populate({
    path: 'messages',
    model: 'Message',
    populate: {
      path: 'user',
      model: 'User',
    },
  });
  // Emit the older messages to client
  socket.emit('action', { type: 'io/messages', payload: currChannel.messages });
};

const onUserMessaged = async (io, action) => {
  const { name, message } = action.payload;
  // Find the user
  const user = await User.findOne({ name });
  // Find the channel
  const channel = await Channel.findOne({ _id: user.currentChannel });
  // Create and save the message
  const newMessage = new Message({
    user,
    message,
    createdAt: new Date(),
  });
  await newMessage.save();
  // Save the message in channel also
  channel.messages.push(newMessage);
  await channel.save();

  // Find and re-populate the channel
  const currChannel = await Channel.findOne({ _id: channel._id }).populate({
    path: 'messages',
    model: 'Message',
    populate: {
      path: 'user',
      model: 'User',
    },
  });

  // Send the messages in the channel back
  const otherUser = await User.findOne({ name: 'Rachel' }).populate('currentChannel');
  // console.log(user.currentChannel._id, otherUser.currentChannel._id);
  io.to(user.currentChannel._id.toString()).emit('action', {
    type: 'io/messages',
    payload: currChannel.messages,
  });
};

const onUserSelectedFriendChannel = async (io, socket, action) => {
  const { name, friendName } = action.payload;
  // Find the channel, try both combinations since we don't know who added who
  // And we create the channel name via concat'ing the names above
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

  // Join the channel
  socket.join(channel._id.toString());
  console.log(
    name + ' joined id of: ' + channel._id + ' with type ' + typeof channel._id.toString()
  );
  // Update user's channel to private name+friendname channel
  await User.updateOne({ name }, { currentChannel: channel });
  // Emit the older messages to the user
  socket.emit('action', { type: 'io/messages', payload: channel.messages });
};

module.exports = { onUserMessaged, onUserSelectedChannel, onUserSelectedFriendChannel };
