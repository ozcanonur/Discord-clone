import { Socket } from 'socket.io';
import User, { IUser } from '../db/models/user';
import Server from '../db/models/server';
import { reduceUsers, reduceServers, reducePrivateUsers } from './utils';
import Channel from '../db/models/channel';

export const onUserConnected = async (
  io: SocketIO.Server,
  socket: Socket,
  action: { type: string; payload: { name: string } }
) => {
  const { name } = action.payload;

  let user: IUser = await User.findOne({ name }).populate([
    {
      path: 'servers',
      model: 'Server',
      populate: {
        path: 'channels',
        model: 'Channel',
        populate: {
          path: 'voiceUsers',
          model: 'User',
        },
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
  socket.emit('action', { type: 'io/servers', payload: reduceServers(user.servers) });
  // Also send friends
  socket.emit('action', {
    type: 'io/privateUsers',
    payload: reducePrivateUsers(user),
  });
};

export const onUserDisconnected = async (io: SocketIO.Server, socket: Socket) => {
  const user = await User.findOne({ socketId: socket.id }).populate('currentChannel');
  if (!user) return;

  const oldChannel = await Channel.findOne({ _id: user.currentChannel._id }).populate('voiceUsers');

  // Broadcast the new servers if this user was in a voice channel
  const wasOnVoice = oldChannel.voiceUsers.some((u) => u._id.toString() === user._id.toString());
  if (wasOnVoice) {
    oldChannel.voiceUsers = oldChannel.voiceUsers.filter(
      (u) => u._id.toString() !== user._id.toString()
    );
    await oldChannel.save();
    // Send the new servers back to each of the users that are subscribed to the channel's server
    // Find the server that this channel is on
    const server = await Server.findOne({ channels: { $all: [oldChannel._id] } }).populate({
      path: 'users',
      model: 'User',
      populate: {
        path: 'servers',
        model: 'Server',
        populate: {
          path: 'channels',
          model: 'Channel',
          populate: {
            path: 'voiceUsers',
            model: 'User',
          },
        },
      },
    });

    // Send the new servers to each of the users
    server.users.forEach((u) => {
      io.to(u.socketId).emit('action', { type: 'io/servers', payload: reduceServers(u.servers) });
    });
  }

  // Update the user's online status to false
  await User.updateOne({ socketId: socket.id }, { online: false, currentChannel: undefined });
  // Let other users know
  const users: IUser[] = await User.find({ online: true });
  io.emit('action', { type: 'io/activeUsers', payload: reduceUsers(users) });
};
