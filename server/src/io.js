const socketIo = require('socket.io');
const { server } = require('./index');

const { User } = require('./db/models/user');
const { Server } = require('./db/models/server');
const { findUserByUsername, setupDefaultServer } = require('./util');

const io = socketIo(server);

// Emit the current users to all sockets
const emitOnlineUsers = async () => {
  const users = await User.find({ online: true });
  io.emit('action', { type: 'io/users', payload: users });
};

const onUserConnected = async (socket, name) => {
  // If user already in DB, update its socketId and online status
  // If not, create a new user and save
  const user = await User.findOne({ name });
  if (user) await User.updateOne({ name }, { socketId: socket.id, online: true });
  else {
    const user = new User({
      name,
      socketId: socket.id,
      servers: ['Def'],
      online: true,
    });
    await user.save();
  }

  await emitOnlineUsers();
  // emitServers(socket, user.servers);
};

io.on('connection', (socket) => {
  socket.on('action', async (action) => {
    // Create default server if it doesn't exist
    await setupDefaultServer();

    if (action.type === 'io/userConnected') {
      const name = action.payload;
      await onUserConnected(socket, name);
    }
  });

  socket.on('disconnect', async () => {
    // Update the user's online status to false
    await User.updateOne({ socketId: socket.id }, { online: false });
    // Let the other users know
    await emitOnlineUsers();
  });
});
