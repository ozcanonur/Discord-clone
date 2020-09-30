const socketIo = require('socket.io');
const server = require('./index');

const User = require('./db/models/user');
const Server = require('./db/models/server');
const Channel = require('./db/models/channel');
const Message = require('./db/models/message');

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
  // If not, create a new user, assign default server and save
  // Also populate its servers + channels because they will be sent back to client later
  let user = await User.findOne({ name }).populate([
    {
      path: 'servers',
      model: 'Server',
      populate: {
        path: 'channels',
        model: 'Channel',
      },
    },
  ]);

  if (user)
    await User.updateOne({ name }, { socketId: socket.id, online: true, lastActiveAt: new Date() });
  else {
    // Create the user, push the default server, save
    user = new User({
      name,
      socketId: socket.id,
      servers: [],
      online: true,
      lastActiveAt: new Date(),
    });
    const defaultServer = await Server.findOne({ name: 'Def' }).populate('channels');
    user.servers.push(defaultServer);
    await user.save();

    // Push the user into the default server, save
    defaultServer.users.push(user);
    await defaultServer.save();
  }
  // Let other users know
  await emitOnlineUsers();
  // Send the current user's servers (with channels populated) and send to client
  socket.emit('action', { type: 'io/servers', payload: user.servers });
};

const onUserCreatedServer = async (socket, action) => {
  const { name, server } = action.payload;
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
  // Find the current user's servers and send them back
  user = await User.findOne({ name });
  const userServers = await Server.find({ _id: { $in: user.servers } });
  socket.emit('action', { type: 'io/servers', payload: userServers });
};

const onUserSelectedChannel = async (socket, action) => {
  const { name, channel } = action.payload;
  // Update the user's current channel
  await User.updateOne({ name }, { currentChannel: channel });
  // Join the channel room
  socket.join(channel._id);
  // Find the older messages in the channel
  const currChannel = await Channel.findOne({ _id: channel._id }).populate({
    path: 'messages',
    model: 'Message',
    populate: {
      path: 'user',
      model: 'User',
    },
  });
  // Emit the older messages to client
  socket.emit('action', { type: 'io/messages', payload: currChannel.messages });
};

const onUserMessaged = async (io, action) => {
  const { name, message } = action.payload;
  // Find the user
  const user = await User.findOne({ name });
  // Find the channel
  const channel = await Channel.findOne({ _id: user.currentChannel });
  // Create and save the message
  const newMessage = new Message({
    user,
    message,
    createdAt: new Date(),
  });
  await newMessage.save();
  // Save the message in channel also
  channel.messages.push(newMessage);
  await channel.save();

  // Find and re-populate the channel
  const currChannel = await Channel.findOne({ _id: channel._id }).populate({
    path: 'messages',
    model: 'Message',
    populate: {
      path: 'user',
      model: 'User',
    },
  });
  // Send the messages in the channel back
  io.to(user.currentChannel).emit('action', {
    type: 'io/messages',
    payload: currChannel.messages,
  });
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
