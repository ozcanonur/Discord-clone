const socketIo = require('socket.io');
const { server } = require('./index');

const { User } = require('./db/models/user');
const { Server } = require('./db/models/server');
const { setupDefaultServer } = require('./util');

const io = socketIo(server);

// Emit the current users to all sockets
const emitOnlineUsers = async () => {
  const users = await User.find({ online: true });
  io.emit('action', { type: 'io/users', payload: users });
};

const onUserConnected = async (socket, action) => {
  const name = action.payload;
  // If user is already in DB, update its socketId and online status
  // If not, create a new user and save
  let user = await User.findOne({ name });
  if (user) await User.updateOne({ name }, { socketId: socket.id, online: true });
  else {
    user = new User({
      name,
      socketId: socket.id,
      servers: ['Def'],
      online: true,
    });
    await user.save();
  }
  // Let other users know
  await emitOnlineUsers();
  // Find the current user's servers and send them back
  const userServers = await Server.find({ name: { $in: user.servers } });
  socket.emit('action', { type: 'io/servers', payload: userServers });
};

const onUserCreatedServer = async (socket, action) => {
  const { name, server } = action.payload;
  // Create the server
  const newServer = new Server(server);
  await newServer.save();

  // Update the user
  await User.updateOne({ name }, { $addToSet: { servers: server.name } });
  // Find the current user's servers and send them back
  const user = await User.findOne({ name });
  const userServers = await Server.find({ name: { $in: user.servers } });
  socket.emit('action', { type: 'io/servers', payload: userServers });
};

const onUserSelectedChannel = async (socket, action) => {
  const { name, server, channel } = action.payload;
  // Update the user's current channel
  const user = await User.findOne({ name });
  const uniqueServerAndChannel = `${server.name}_${channel}`;
  user.currentChannel = uniqueServerAndChannel;
  await user.save();
  // Join the channel room
  socket.join(uniqueServerAndChannel);
};

const onUserMessaged = async (io, action) => {
  // Send the message to user's current channel
  const { name, message } = action.payload;
  const user = await User.findOne({ name });
  io.to(user.currentChannel).emit('action', {
    type: 'messages',
    payload: { name, message },
  });
  // // TODO Save the message in server > channel > messages
  // const [serverName, channelName] = user.currentChannel.split('_');
  // const server = await Server.findOne({ name: serverName });
  // server.channels
};

io.on('connection', (socket) => {
  socket.on('action', async (action) => {
    // Create default server if it doesn't exist
    await setupDefaultServer();

    if (action.type === 'io/userConnected') await onUserConnected(socket, action);
    else if (action.type === 'io/userCreatedServer') await onUserCreatedServer(socket, action);
    else if (action.type === 'io/userSelectedChannel') await onUserSelectedChannel(socket, action);
    else if (action.type === 'io/userMessaged') await onUserMessaged(io, action);
  });

  socket.on('disconnect', async () => {
    // Update the user's online status to false
    await User.updateOne({ socketId: socket.id }, { online: false });
    // Let the other users know
    await emitOnlineUsers();
  });
});
