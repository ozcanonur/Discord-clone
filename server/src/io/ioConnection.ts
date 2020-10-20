import { Socket } from 'socket.io';
import User from '../db/models/user';

import { findUserByNameAndPopulatePrivate } from '../utils/dbUtils';
import { emitActiveUsers, removeIfVoiceAndEmitServers } from '../utils/emit';
import { reduceServers, reducePrivateUsers } from '../utils/reduce';

export const onUserConnected = async (
  io: SocketIO.Server,
  socket: Socket,
  action: ConnectIOAction
) => {
  const { name } = action.payload;

  // Update the user
  await User.updateOne({ name }, { socketId: socket.id, online: true, lastActiveAt: new Date() });

  // Let the other users who are online know
  emitActiveUsers(io);

  const user = await findUserByNameAndPopulatePrivate(name);

  // Send the current user's servers (with channels populated) to client
  socket.emit('action', { type: 'io/servers', payload: reduceServers(user.servers) });

  // Also send private contacts
  socket.emit('action', {
    type: 'io/privateUsers',
    payload: reducePrivateUsers(user.friends, user.usersMessagedBefore),
  });
};

export const onUserDisconnected = async (io: SocketIO.Server, socket: Socket) => {
  const user = await User.findOne({ socketId: socket.id }).populate('currentChannel');
  if (!user) return;

  // Remove the user from voiceUsers of the channel if present
  if (user.currentChannel) removeIfVoiceAndEmitServers(io, user);

  // Update the user's online status and current channel
  await User.updateOne({ socketId: socket.id }, { online: false, currentChannel: undefined });

  // Let the other users who are online know
  emitActiveUsers(io);
};
