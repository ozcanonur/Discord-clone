import { Socket } from 'socket.io';
import User, { IUser } from '../db/models/user';
import { reduceUsers, reduceServers, reducePrivateUsers } from './utils';

export const onUserConnected = async (
  io: SocketIO.Server,
  socket: Socket,
  action: { type: string; payload: string }
) => {
  const name = action.payload;

  let user: IUser = await User.findOne({ name }).populate([
    {
      path: 'servers',
      model: 'Server',
      populate: {
        path: 'channels',
        model: 'Channel',
      },
    },
    {
      path: 'friends',
      model: 'User',
    },
    {
      path: 'usersMessagedBefore',
      model: 'User',
    },
  ]);

  await User.updateOne({ name }, { socketId: socket.id, online: true, lastActiveAt: new Date() });

  // Let the other online users know
  const users: IUser[] = await User.find({ online: true });

  io.emit('action', { type: 'io/activeUsers', payload: reduceUsers(users) });
  // Send the current user's servers (with channels populated) and send to client
  // socket.emit('action', { type: 'io/servers', payload: reduceServers(user.servers) });
  // Also send friends
  socket.emit('action', {
    type: 'io/privateUsers',
    payload: reducePrivateUsers(user),
  });
};

export const onUserDisconnected = async (io: SocketIO.Server, socket: Socket) => {
  // Update the user's online status to false
  await User.updateOne({ socketId: socket.id }, { online: false });
  // Let other users know
  const users: IUser[] = await User.find({ online: true });
  io.emit('action', { type: 'io/activeUsers', payload: reduceUsers(users) });
};
