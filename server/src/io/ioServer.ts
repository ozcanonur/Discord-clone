import { Socket } from 'socket.io';
import User from '../db/models/user';
import Server from '../db/models/server';

import { findUserServers, findUsersSubscribedToServer } from '../utils/dbUtils';
import { getCreateServerValidationError, getJoinServerValidationError } from '../utils/validation';
import { reduceServers } from '../utils/reduce';
import { emitServers } from '../utils/emit';

export const onUserCreatedServer = async (socket: Socket, action: CreateServerIOAction) => {
  const { server } = action.payload;

  let user = await User.findOne({ socketId: socket.id });

  // Validate
  const validationError: string | undefined = await getCreateServerValidationError(server);
  if (validationError)
    return socket.emit('action', { type: 'io/response', payload: { error: validationError } });

  // Create the server, register the user, save
  const newServer = new Server({
    name: server,
    users: [user],
    admin: user,
  });
  await newServer.save();

  // Update the user's servers
  await User.updateOne({ socketId: socket.id }, { $addToSet: { servers: newServer } });

  // Find the user's servers and send them back
  user = await User.findOne({ socketId: socket.id });
  const userServers = await findUserServers(user);

  socket.emit('action', { type: 'io/servers', payload: reduceServers(userServers) });
  // Emit success
  socket.emit('action', { type: 'io/response' });
};

export const onUserJoinedServer = async (socket: Socket, action: JoinServerIOAction) => {
  const { serverName } = action.payload;

  // Find the server and user
  const user = await User.findOne({ socketId: socket.id });
  const server = await Server.findOne({ name: serverName }).populate('users');

  // Validate
  const validationError: string | undefined = await getJoinServerValidationError(
    user.name,
    serverName
  );
  if (validationError)
    return socket.emit('action', { type: 'io/response', payload: { error: validationError } });

  // Update the server's users
  server.users.push(user);
  await server.save();
  // Update user's servers
  user.servers.push(server);
  await user.save();

  // Find the user's servers and send them back
  const userServers = await findUserServers(user);
  socket.emit('action', { type: 'io/servers', payload: reduceServers(userServers) });
};

export const onUserDeletedServer = async (io: SocketIO.Server, action: DeleteServerIOAction) => {
  const { name, serverName } = action.payload;

  // Check if the user is admin in this server, also if they are default servers
  const server = await Server.findOne({ name: serverName }).populate([
    { path: 'admin', model: 'User' },
    { path: 'users', model: 'User' },
  ]);
  const isDefaultServers = serverName === 'Default' || serverName === 'Games';
  if (isDefaultServers || server.admin.name !== name) return;

  // Remove the server, remnants (channels and messages) will be taken care of by middleware
  await server.remove();

  // Emit the new server list to everyone that was subscribed to this server
  const users = await findUsersSubscribedToServer(server);
  emitServers(io, users);
};

export const onUserLeftServer = async (socket: Socket, action: LeaveServerIOAction) => {
  const { serverName } = action.payload;

  // Find the user, remove the server from it and save
  const user = await User.findOne({ socketId: socket.id }).populate({
    path: 'servers',
    model: 'Server',
    populate: {
      path: 'channels',
      model: 'Channel',
    },
  });
  user.servers = user.servers.filter((server) => server.name !== serverName);
  await user.save();

  // Find the server, remove the user from it and save
  const server = await Server.findOne({ name: serverName }).populate({
    path: 'channels',
    model: 'Channel',
    populate: {
      path: 'voiceUsers',
      model: 'User',
    },
  });

  server.users = server.users.filter((u) => u._id.toString() !== user.id.toString());
  await server.save();

  // Send the new server list back
  socket.emit('action', { type: 'io/servers', payload: reduceServers(user.servers) });
};
