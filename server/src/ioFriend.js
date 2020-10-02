const User = require('./db/models/user');
const Channel = require('./db/models/channel');

const onUserSentFriendRequest = async (io, action) => {
  const { name, friendName } = action.payload;
  // Find the user
  let user = await User.findOne({ name });
  // Find the friend
  const friend = await User.findOne({ name: friendName }).populate('friends');
  // Return if user not found
  if (!friend) return console.log('User not found');
  // Return if they are already friends
  const isAlreadyFriends = user.friends.includes(friend._id);
  if (isAlreadyFriends) return console.log('Already friends');

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
  io.to(user.socketId).emit('action', { type: 'io/friends', payload: user.friends });
  io.to(friend.socketId).emit('action', { type: 'io/friends', payload: friend.friends });
};

module.exports = { onUserSentFriendRequest };
