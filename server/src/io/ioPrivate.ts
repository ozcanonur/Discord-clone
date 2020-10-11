import { Socket } from 'socket.io';
import User, { IUser } from '../db/models/user';
import Channel from '../db/models/channel';
import { reduceUsers, reducePrivateUsers } from './util';

const getFriendRequestValidationError = async (name: string, friendName: string) => {
  if (friendName.length === 0) return `Friend name can't be empty.`;
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
  action: { type: string; payload: { name: string; friendName: string } }
) => {
  const { name, friendName } = action.payload;
  // Validate
  const validationError: string | undefined = await getFriendRequestValidationError(
    name,
    friendName
  );
  if (validationError) {
    socket.emit('action', { type: 'io/response', payload: { error: validationError } });
    return;
  }

  let user = await User.findOne({ name }).populate('usersMessagedBefore');
  const friend = await User.findOne({ name: friendName }).populate('friends');
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
  }
  // Add the friend to the user, also to messagedBefore
  user.friends.push(friend);
  user.usersMessagedBefore.push(friend);
  await user.save();
  // Find the user again
  user = await User.findOne({ name }).populate('friends').populate('usersMessagedBefore');
  // Add user to the friend, also to messaged before
  friend.friends.push(user);
  friend.usersMessagedBefore.push(user);
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
  action: {
    type: string;
    payload: {
      name: string;
      username: string;
    };
  }
) => {
  const { name, username } = action.payload;
  // Check if they messaged each other before
  let user = await User.findOne({ name }).populate('usersMessagedBefore');
  let otherUser = await User.findOne({ name: username });
  const messagedBefore = user.usersMessagedBefore.some(
    (otherUser: IUser) => otherUser.name === username
  );
  // If not, create new private channel, save it
  if (!messagedBefore) {
    const channel = new Channel({
      name: `${name}${username}_private`,
      messages: [],
      voice: false,
    });
    await channel.save();

    // Update users' messagedBefore
    // @ts-ignore
    await User.updateOne({ name }, { $addToSet: { usersMessagedBefore: otherUser } });
    // @ts-ignore
    await User.updateOne({ name: username }, { $addToSet: { usersMessagedBefore: user } });
  }
  // Emit updated privateUser list
  user = await User.findOne({ name }).populate('usersMessagedBefore');
  otherUser = await User.findOne({ name: username }).populate('usersMessagedBefore');
  io.to(user.socketId).emit('action', {
    type: 'io/privateUsers',
    payload: reducePrivateUsers(user),
  });
  io.to(otherUser.socketId).emit('action', {
    type: 'io/privateUsers',
    payload: reducePrivateUsers(otherUser),
  });
};
