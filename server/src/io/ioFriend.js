const User = require('../db/models/user');
const Channel = require('../db/models/channel');

const { reduceFriends } = require('./util');

const getFriendRequestValidationError = async (name, friendName) => {
  if (friendName.length === 0) return `Friend name can't be empty.`;
  else {
    const friendExists = await User.exists({ name: friendName });
    if (!friendExists) return `User not found.`;
    // Find the user
    let user = await User.findOne({ name });
    // Find the friend
    const friend = await User.findOne({ name: friendName }).populate('friends');
    // Return if they are already friends
    const isAlreadyFriends = user.friends.includes(friend._id);
    if (isAlreadyFriends) return `${friendName} is already your friend!`;
  }
};

const onUserSentFriendRequest = async (io, socket, action) => {
  const { name, friendName } = action.payload;
  // Validate
  const validationError = await getFriendRequestValidationError(name, friendName);
  if (validationError) {
    socket.emit('action', { type: 'io/response', payload: { error: validationError } });
    return;
  }

  let user = await User.findOne({ name });
  const friend = await User.findOne({ name: friendName }).populate('friends');
  // Add the friend to the user
  user.friends.push(friend);
  await user.save();
  // Find the user again
  user = await User.findOne({ name }).populate('friends');
  // Add user to the friend
  friend.friends.push(user);
  await friend.save();

  // Create a new channel for their chat and save
  const channel = new Channel({
    name: `${user.name}${friend.name}_private`,
    messages: [],
    voice: false,
  });
  await channel.save();
  // Send the new friends list to both users
  io.to(user.socketId).emit('action', { type: 'io/friends', payload: reduceFriends(user.friends) });
  io.to(friend.socketId).emit('action', {
    type: 'io/friends',
    payload: reduceFriends(friend.friends),
  });
};

module.exports = { onUserSentFriendRequest };
