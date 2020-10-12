import { Socket } from 'socket.io';
import User, { IUser } from '../db/models/user';
import Server, { IServer } from '../db/models/server';
import { reduceUsers, reduceServers, reducePrivateUsers } from './util';
import { IChannel } from '../db/models/channel';

export const onUserConnected = async (
  io: SocketIO.Server,
  socket: Socket,
  action: { type: string; payload: string }
) => {
  const name = action.payload;
  // If user is already in DB, update its socketId and online status
  // If not, create a new user, assign default server and save
  // Also populate its servers + channels because they will be sent back to client later
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

  if (user)
    await User.updateOne({ name }, { socketId: socket.id, online: true, lastActiveAt: new Date() });
  else {
    // Create the user, push the default servers, save
    user = new User({
      name,
      socketId: socket.id,
      servers: [],
      online: true,
      lastActiveAt: new Date(),
    });
    const defaultServer: IServer = await Server.findOne({ name: 'Default' }).populate('channels');
    user.servers.push(defaultServer);
    const secondaryServer: IServer = await Server.findOne({ name: 'Games' }).populate('channels');
    user.servers.push(secondaryServer);
    await user.save();

    // Push the user into the default server, save
    defaultServer.users.push(user);
    await defaultServer.save();
    secondaryServer.users.push(user);
    await secondaryServer.save();

    // Also send pin notifications
    // First, get the channelIds in the default servers
    const defaultChannelIds = defaultServer.channels.map((ch: IChannel) => ch._id);
    const secondaryChannelIds = secondaryServer.channels.map((ch: IChannel) => ch._id);
    // Send pin notification for each channel in default servers
    [...defaultChannelIds, ...secondaryChannelIds].forEach((id: string) => {
      console.log(id);
      socket.emit('action', {
        type: 'io/notification',
        payload: { type: 'pin', channelId: id },
      });
    });
  }

  // Let other users know
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
  // Update the user's online status to false
  await User.updateOne({ socketId: socket.id }, { online: false });
  // Let other users know
  const users: IUser[] = await User.find({ online: true });
  io.emit('action', { type: 'io/activeUsers', payload: reduceUsers(users) });
};
