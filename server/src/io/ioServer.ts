import { Socket } from 'socket.io';
import User, { IUser } from '../db/models/user';
import Server, { IServer } from '../db/models/server';
import Channel, { IChannel } from '../db/models/channel';
import { reduceServers } from './utils';

const getCreateServerValidationError = async (server: string) => {
  if (server.split(' ').length > 3) return `Server name can't be longer than 4 words.`;
  else if (server.length === 0) return `Server name can't be empty.`;
  else if (await Server.exists({ name: server })) return `Server already exists.`;
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
  const userServers = await Server.find({ _id: { $in: user.servers } }).populate({
    path: 'channels',
    model: 'Channel',
    populate: {
      path: 'voiceUsers',
      model: 'User',
    },
  });
  socket.emit('action', { type: 'io/servers', payload: reduceServers(userServers) });
  // Emit success
  socket.emit('action', { type: 'io/response' });
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
  const userServers = await Server.find({ _id: { $in: user.servers } }).populate({
    path: 'channels',
    model: 'Channel',
    populate: {
      path: 'voiceUsers',
      model: 'User',
    },
  });
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
    path: 'channels',
    model: 'Channel',
    populate: {
      path: 'voiceUsers',
      model: 'User',
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

export const onUserLeftServer = async (
  socket: Socket,
  action: { type: string; payload: { name: string; serverName: string } }
) => {
  const { name, serverName } = action.payload;

  // Find the user, remove the server from it and save
  const user = await User.findOne({ name }).populate({
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
  });
  user.servers = user.servers.filter((server: IServer) => server.name !== serverName);
  await user.save();

  // Find the server, remove the user from it and save
  const server = await Server.findOne({ name: serverName }).populate('users');
  server.users = server.users.filter((u: IUser) => u.name !== name);
  await server.save();

  // Send the new server list back
  socket.emit('action', { type: 'io/servers', payload: reduceServers(user.servers) });
};
