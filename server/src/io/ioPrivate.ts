import { Socket } from 'socket.io';
import User, { IUser } from '../db/models/user';
import Channel from '../db/models/channel';
import { reducePrivateUsers, reduceMessages } from './utils';

const getFriendRequestValidationError = async (name: string, friendName: string) => {
  if (friendName.length === 0) return `Friend name can't be empty.`;
  else if (name === friendName) return `You can't add yourself to the friend list!`;
  else {
    const friendExists = await User.exists({ name: friendName });
    if (!friendExists) return `User not found.`;
    // Find the user
    let user = await User.findOne({ name });
    // Find the friend
    const friend = await User.findOne({ name: friendName }).populate('friends');
    // Return if they are already friends
    const isAlreadyFriends: boolean = user.friends.includes(friend._id);
    if (isAlreadyFriends) return `${friendName} is already your friend!`;
  }
};

export const onUserSentFriendRequest = async (
  io: SocketIO.Server,
  socket: Socket,
  action: { type: string; payload: { friendName: string } }
) => {
  const { friendName } = action.payload;

  let user = await User.findOne({ socketId: socket.id })
    .populate('friends')
    .populate('usersMessagedBefore');

  // Validate
  const validationError: string | undefined = await getFriendRequestValidationError(
    user.name,
    friendName
  );
  if (validationError) {
    socket.emit('action', { type: 'io/response', payload: { error: validationError } });
    return;
  }

  const friend = await User.findOne({ name: friendName })
    .populate('friends')
    .populate('usersMessagedBefore');
  // Check if they messaged before, if not, create a new channel for them
  const messagedBefore = user.usersMessagedBefore.some(
    (otherUser: IUser) => otherUser.name === friendName
  );
  if (!messagedBefore) {
    // Create a new channel for their chat and save
    const channel = new Channel({
      name: `${user.name}${friend.name}_private`,
      messages: [],
      voice: false,
    });
    await channel.save();
    user.usersMessagedBefore.push(friend);
    friend.usersMessagedBefore.push(user);
  }
  // Add the friend to the user, also to messagedBefore
  user.friends.push(friend);
  await user.save();
  // Find the user again
  user = await User.findOne({ socketId: socket.id })
    .populate('friends')
    .populate('usersMessagedBefore');
  // Add user to the friend, also to messaged before
  friend.friends.push(user);
  await friend.save();

  // Send the new private user list to both users
  io.to(user.socketId).emit('action', {
    type: 'io/privateUsers',
    payload: reducePrivateUsers(user),
  });
  io.to(friend.socketId).emit('action', {
    type: 'io/privateUsers',
    payload: reducePrivateUsers(friend),
  });
};

export const onUserConnectedNewPrivateUser = async (
  io: SocketIO.Server,
  socket: Socket,
  action: {
    type: string;
    payload: {
      username: string;
    };
  }
) => {
  const { username } = action.payload;
  // Check if they messaged each other before
  let user = await User.findOne({ socketId: socket.id }).populate('usersMessagedBefore');
  let otherUser = await User.findOne({ name: username });
  const messagedBefore = user.usersMessagedBefore.some(
    (otherUser: IUser) => otherUser.name === username
  );
  // If not, create new private channel, save it
  if (!messagedBefore) {
    const channel = new Channel({
      name: `${user.name}${username}_private`,
      messages: [],
      voice: false,
    });
    await channel.save();

    // Update users' messagedBefore
    // @ts-ignore
    await User.updateOne(
      { socketId: socket.id },
      { $addToSet: { usersMessagedBefore: otherUser } }
    );
    // @ts-ignore
    await User.updateOne({ name: username }, { $addToSet: { usersMessagedBefore: user } });
  }
  // Emit updated privateUser list
  user = await User.findOne({ socketId: socket.id }).populate('usersMessagedBefore');
  io.to(user.socketId).emit('action', {
    type: 'io/privateUsers',
    payload: reducePrivateUsers(user),
  });
};

export const onUserRemovedFriend = async (
  io: SocketIO.Server,
  socket: Socket,
  action: {
    type: string;
    payload: {
      friendName: string;
    };
  }
) => {
  const { friendName } = action.payload;
  const user = await User.findOne({ socketId: socket.id })
    .populate('friends')
    .populate('usersMessagedBefore');
  // Remove friend from user
  user.friends = user.friends.filter((f: IUser) => f.name !== friendName);
  await user.save();
  // Remove user from friend
  const friend = await User.findOne({ name: friendName })
    .populate('friends')
    .populate('usersMessagedBefore');
  friend.friends = friend.friends.filter((f: IUser) => f.name !== user.name);
  await friend.save();

  // Send the new private user list to both users
  io.to(user.socketId).emit('action', {
    type: 'io/privateUsers',
    payload: reducePrivateUsers(user),
  });
  io.to(friend.socketId).emit('action', {
    type: 'io/privateUsers',
    payload: reducePrivateUsers(friend),
  });
};

export const onUserSelectedPrivateChannel = async (
  socket: Socket,
  action: {
    type: string;
    payload: {
      username: string;
    };
  }
) => {
  const { username } = action.payload;

  // Leave the current channel first
  const user = await User.findOne({ socketId: socket.id }).populate('currentChannel');
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
    (await Channel.findOne({ name: `${user.name}${username}_private` }).populate(populateFields)) ||
    (await Channel.findOne({ name: `${username}${user.name}_private` }).populate(populateFields));
  // Join the new channel

  await socket.join(channel._id.toString());

  // Update user's channel
  await User.updateOne({ socketId: socket.id }, { currentChannel: channel });
  // Emit the older messages to the user
  socket.emit('action', { type: 'io/messages', payload: reduceMessages(channel.messages) });
};
