import { Socket } from 'socket.io';
import User, { IUser } from '../db/models/user';
import Server, { IServer } from '../db/models/server';
import Channel, { IChannel } from '../db/models/channel';
import { reduceServers } from './util';

const getCreateServerValidationError = async (server: string) => {
  if (server.split(' ').length > 3) return `Server name can't be longer than 4 words.`;
  else if (server.length === 0) return `Server name can't be empty.`;
  else if (await Server.exists({ name: server })) return `Server already exists.`;
};

export const onUserCreatedServer = async (
  socket: Socket,
  action: { type: string; payload: { name: string; server: string } }
) => {
  const { name, server } = action.payload;
  // Validate
  const validationError: string | undefined = await getCreateServerValidationError(server);
  if (validationError) {
    socket.emit('action', { type: 'io/response', payload: { error: validationError } });
    return;
  }

  let user: IUser = await User.findOne({ name });
  // Create the server, register the user, save
  const newServer: IServer = new Server({
    name: server,
    channels: [],
    users: [user],
    admin: user,
  });
  await newServer.save();

  // Update the user's servers
  // @ts-ignore
  await User.updateOne({ name }, { $addToSet: { servers: newServer } });
  // Find the user's servers and send them back
  user = await User.findOne({ name });
  const userServers = await Server.find({ _id: { $in: user.servers } }).populate('channels');
  socket.emit('action', { type: 'io/servers', payload: reduceServers(userServers) });
  // Emit success
  socket.emit('action', { type: 'io/response' });
};

const getCreateChannelValidationError = async (
  server: { _id: string; name: string; channels: any },
  channelName: string
) => {
  if (channelName.length > 10) return `Channel name can't be longer than 10 characters.`;
  else if (channelName.length === 0) return `Channel name can't be empty.`;
  else {
    // Check if the server has the channel already
    let found = false;
    for (let i = 0; i < server.channels.length; i++) {
      if (server.channels[i].name === channelName) {
        found = true;
        break;
      }
    }
    if (found) return `Channel already exists in ${server.name}.`;
  }
};

export const onUserCreatedChannel = async (
  io: SocketIO.Server,
  socket: Socket,
  action: {
    type: string;
    payload: {
      server: { _id: string; name: string; channels: any };
      channelName: string;
      isVoice: boolean;
    };
  }
) => {
  const { server, channelName, isVoice } = action.payload;
  // Validate
  const validationError: string | undefined = await getCreateChannelValidationError(
    server,
    channelName
  );
  if (validationError) {
    socket.emit('action', { type: 'io/response', payload: { error: validationError } });
    return;
  }

  // Create and save channel
  const channel = new Channel({
    name: channelName,
    messages: [],
    voice: isVoice,
  });
  await channel.save();

  // Add the channel to its server
  // @ts-ignore
  await Server.updateOne({ _id: server._id }, { $addToSet: { channels: channel } });
  // Find the users which are subscribed to this server
  const channelsServer = await Server.findOne({ _id: server._id }).populate('users');
  const userIds: string[] = channelsServer.users;
  const users = await User.find({ _id: { $in: userIds } }).populate({
    path: 'servers',
    model: 'Server',
    populate: {
      path: 'channels',
      model: 'Channel',
    },
  });
  // Send the updated servers to each of them
  users.forEach((user) => {
    const { socketId, servers }: { socketId: string; servers?: any } = user;
    io.to(socketId).emit('action', { type: 'io/servers', payload: reduceServers(servers) });
  });
};

const getJoinServerValidationError = async (name: string, serverName: string) => {
  if (serverName.trim().length === 0) return `Server name can't be empty.`;
  else if (!(await Server.exists({ name: serverName }))) return `Server doesn't exist.`;
  else {
    // User already in server
    const user = await User.findOne({ name }).populate('servers');
    const userServers = user.servers.map((server: IServer) => server.name);
    if (userServers.includes(serverName)) return `You are already in this server.`;
  }
};

export const onUserJoinedServer = async (
  socket: Socket,
  action: { type: string; payload: { name: string; serverName: string } }
) => {
  const { name, serverName } = action.payload;
  // Validate
  const validationError: string | undefined = await getJoinServerValidationError(name, serverName);
  if (validationError) {
    socket.emit('action', { type: 'io/response', payload: { error: validationError } });
    return;
  }
  // Find server and user
  let user = await User.findOne({ name });
  const server = await Server.findOne({ name: serverName }).populate('users');
  // Update server's users
  server.users.push(user);
  await server.save();
  // Update user's servers
  user.servers.push(server);
  await user.save();
  // Find the user's servers and send them back
  user = await User.findOne({ name });
  const userServers = await Server.find({ _id: { $in: user.servers } }).populate('channels');
  socket.emit('action', { type: 'io/servers', payload: reduceServers(userServers) });
};

export const onUserDeletedServer = async (
  io: SocketIO.Server,
  action: {
    type: string;
    payload: {
      name: string;
      serverName: string;
    };
  }
) => {
  const { name, serverName } = action.payload;
  // Check if the user is admin in this server, also if they are default servers
  const server = await Server.findOne({ name: serverName }).populate([
    { path: 'admin', model: 'User' },
    { path: 'users', model: 'User' },
  ]);
  const isDefaultServers = serverName === 'Default' || serverName === 'Games';
  if (isDefaultServers || server.admin.name !== name) return;

  // Remove the server, remnants will be taken care of by middleware
  await server.remove();

  const users = await User.find({ _id: { $in: server.users } }).populate({
    path: 'servers',
    model: 'Server',
    populate: {
      path: 'channels',
      model: 'Channel',
    },
  });
  // Emit the new server list to everyone that was subscribed to this server
  users.forEach((user) =>
    io.to(user.socketId).emit('action', {
      type: 'io/servers',
      payload: reduceServers(user.servers),
    })
  );
};

export const onUserDeletedChannel = async (
  io: SocketIO.Server,
  action: { type: string; payload: { name: string; channelId: string } }
) => {
  const { name, channelId } = action.payload;
  // Check if the user is admin in this server, also if they are default servers
  const server = await Server.findOne({ channels: { $all: channelId } }).populate('admin');
  const isDefaultServers = server.name === 'Default' || server.name === 'Games';
  if (isDefaultServers || server.admin.name !== name) return;

  // Remove the channel from the server
  server.channels = server.channels.filter((ch: IChannel) => ch._id.toString() !== channelId);
  await server.save();
  // Remove the channel, remnants will be taken care of by middleware
  const channel = await Channel.findOne({ _id: channelId });
  await channel.remove();

  const users = await User.find({ _id: { $in: server.users } }).populate({
    path: 'servers',
    model: 'Server',
    populate: {
      path: 'channels',
      model: 'Channel',
    },
  });
  // Emit the new server list containing new channels to everyone that was subscribed to this server
  // Emit the new server list to everyone that was subscribed to this server
  users.forEach((user) =>
    io.to(user.socketId).emit('action', {
      type: 'io/servers',
      payload: reduceServers(user.servers),
    })
  );
};
