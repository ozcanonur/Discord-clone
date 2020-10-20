import { Socket } from 'socket.io';
import User, { IUser } from '../db/models/user';
import Channel from '../db/models/channel';

import { getFriendRequestValidationError } from '../utils/validation';
import { reduceMessages } from '../utils/reduce';
import { emitPrivateUsers, removeIfVoiceAndEmitServers } from '../utils/emit';

export const onUserAddedFriend = async (
  io: SocketIO.Server,
  socket: Socket,
  action: AddFriendIOAction
) => {
  const { friendName } = action.payload;

  let user = await User.findOne({ socketId: socket.id })
    .populate('friends')
    .populate('usersMessagedBefore');

  const friend = await User.findOne({ name: friendName })
    .populate('friends')
    .populate('usersMessagedBefore');

  // Validate
  const validationError: string | undefined = await getFriendRequestValidationError(
    user.name,
    friendName
  );
  if (validationError)
    return socket.emit('action', { type: 'io/response', payload: { error: validationError } });

  // Check if they messaged before, if not, create a new channel for them
  const messagedBefore = user.usersMessagedBefore.some(
    (otherUser: IUser) => otherUser.name === friendName
  );
  if (!messagedBefore) {
    // Create a new channel for their chat and save
    const channel = new Channel({
      name: `${user.name}${friend.name}_private`,
      voice: false,
    });
    await channel.save();
    user.usersMessagedBefore.push(friend);
    friend.usersMessagedBefore.push(user);
  }
  // Add the friend to the user, also to messagedBefore
  user.friends.push(friend);
  await user.save();
  // Add the user to the friend, also to messagedBefore
  friend.friends.push(user);
  await friend.save();

  // Emit the new private user list to both users
  emitPrivateUsers(io, undefined, user);
  emitPrivateUsers(io, undefined, friend);
};

export const onUserConnectedNewPrivateUser = async (
  socket: Socket,
  action: ConnectNewPrivateUserIOAction
) => {
  const { username } = action.payload;

  // Check if they messaged each other before
  const user = await User.findOne({ socketId: socket.id }).populate('usersMessagedBefore');
  const otherUser = await User.findOne({ name: username });
  const messagedBefore = user.usersMessagedBefore.some((otherUser) => otherUser.name === username);

  // If not, create new private channel, save it
  if (!messagedBefore) {
    const channel = new Channel({
      name: `${user.name}${username}_private`,
      voice: false,
    });
    await channel.save();

    // Update user's messagedBefore
    await User.updateOne(
      { socketId: socket.id },
      { $addToSet: { usersMessagedBefore: otherUser } }
    );
    // Update the friend's messagedBefore
    await User.updateOne({ name: username }, { $addToSet: { usersMessagedBefore: user } });
  }

  // Emit the updated privateUser list
  emitPrivateUsers(undefined, socket, user);
};

export const onUserRemovedFriend = async (
  io: SocketIO.Server,
  socket: Socket,
  action: RemoveFriendIOAction
) => {
  const { friendName } = action.payload;

  const user = await User.findOne({ socketId: socket.id })
    .populate('friends')
    .populate('usersMessagedBefore');

  const friend = await User.findOne({ name: friendName })
    .populate('friends')
    .populate('usersMessagedBefore');

  // Remove friend from user
  user.friends = user.friends.filter((f) => f.name !== friendName);
  await user.save();
  // Remove user from friend
  friend.friends = friend.friends.filter((f) => f.name !== user.name);
  await friend.save();

  // Send the new private user list to both users
  emitPrivateUsers(io, undefined, user);
  emitPrivateUsers(io, undefined, friend);
};

export const onUserSelectedPrivateChannel = async (
  io: SocketIO.Server,
  socket: Socket,
  action: SelectPrivateChannelIOAction
) => {
  const { username } = action.payload;

  const user = await User.findOne({ socketId: socket.id }).populate('currentChannel');

  if (user.currentChannel) {
    // Leave the current channel first
    socket.leave(user.currentChannel._id.toString());
    // Remove the user from voiceUsers of the channel if present
    removeIfVoiceAndEmitServers(io, user);
  }

  // Find the channel, try both combinations since we don't know who added who
  // And we created the channel name via concating the user names
  const populateFields = {
    path: 'messages',
    model: 'Message',
    populate: {
      path: 'user',
      model: 'User',
    },
  };
  const channel =
    (await Channel.findOne({ name: `${user.name}${username}_private` }).populate(populateFields)) ||
    (await Channel.findOne({ name: `${username}${user.name}_private` }).populate(populateFields));

  // Join the new channel
  socket.join(channel._id.toString());

  // Update user's channel
  await User.updateOne({ socketId: socket.id }, { currentChannel: channel });

  // Emit the older messages to the user
  socket.emit('action', { type: 'io/messages', payload: reduceMessages(channel.messages) });
};
