const User = require('../db/models/user');
const Server = require('../db/models/server');
const Channel = require('../db/models/channel');

const { reduceServers } = require('./util');

const getCreateServerValidationError = async (server) => {
  if (server.split(' ').length > 3) return `Server name can't be longer than 4 words.`;
  else if (server.length === 0) return `Server name can't be empty.`;
  else if (await Server.exists({ name: server })) return `Server already exists.`;
};

const onUserCreatedServer = async (socket, action) => {
  const { name, server } = action.payload;
  // Validate
  const validationError = await getCreateServerValidationError(server);
  if (validationError) {
    socket.emit('action', { type: 'io/response', payload: { error: validationError } });
    return;
  }

  let user = await User.findOne({ name });
  // Create the server, register the user, save
  const newServer = new Server({
    name: server,
    channels: [],
    users: [user],
    admin: user,
  });
  await newServer.save();

  // Update the user's servers
  await User.updateOne({ name }, { $addToSet: { servers: newServer } });
  // Find the user's servers and send them back
  user = await User.findOne({ name });
  const userServers = await Server.find({ _id: { $in: user.servers } }).populate('channels');
  socket.emit('action', { type: 'io/servers', payload: reduceServers(userServers) });
  // Emit success
  socket.emit('action', { type: 'io/response' });
};

const getCreateChannelValidationError = async (server, channelName) => {
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

const onUserCreatedChannel = async (io, socket, action) => {
  const { server, channelName, isVoice } = action.payload;
  // Validate
  const validationError = await getCreateChannelValidationError(server, channelName);
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
  await Server.updateOne({ _id: server._id }, { $addToSet: { channels: channel } });
  // Find the users which are subscribed to this server
  const channelsServer = await Server.findOne({ _id: server._id }).populate('users');
  const userIds = channelsServer.users;
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
    const { socketId, servers } = user;
    io.to(socketId).emit('action', { type: 'io/servers', payload: reduceServers(servers) });
  });
};

const getJoinServerValidationError = async (name, serverName) => {
  if (serverName.trim().length === 0) return `Server name can't be empty.`;
  else if (!(await Server.exists({ name: serverName }))) return `Server doesn't exist.`;
  else {
    // User already in server
    const user = await User.findOne({ name }).populate('servers');
    const userServers = user.servers.map((server) => server.name);
    if (userServers.includes(serverName)) return `You are already in this server.`;
  }
};

const onUserJoinedServer = async (socket, action) => {
  const { name, serverName } = action.payload;
  // Validate
  const validationError = await getJoinServerValidationError(name, serverName);
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

const onUserDeletedServer = async (io, action) => {
  const { name, serverName } = action.payload;
  // Check if the user is admin in this server, also if they are default servers
  const server = await Server.findOne({ name: serverName }).populate([
    { path: 'admin', model: 'User' },
    { path: 'users', model: 'User' },
  ]);
  const isDefaultServers = serverName === 'Default' || serverName === 'Games';
  if (isDefaultServers || server.admin.name !== name) return;
  // Find everyone subscribed to this server
  const users = await User.find({ _id: { $in: server.users } }).populate({
    path: 'servers',
    model: 'Server',
    populate: {
      path: 'channels',
      model: 'Channel',
    },
  });
  // Delete the server from them
  for (let user of users) {
    const newServers = user.servers.filter((s) => s._id.toString() !== server._id.toString());
    user.servers = newServers;
    await user.save();
  }
  // Delete the server
  await Server.deleteOne({ name: serverName });
  // Emit the new server list to everyone that was subscribed to this server
  users.forEach((user) =>
    io.to(user.socketId).emit('action', {
      type: 'io/servers',
      payload: reduceServers(user.servers),
    })
  );
};

module.exports = {
  onUserCreatedChannel,
  onUserCreatedServer,
  onUserJoinedServer,
  onUserDeletedServer,
};
