const User = require('../db/models/user');
const Server = require('../db/models/server');

const onUserConnected = async (io, socket, action) => {
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
    {
      path: 'friends',
      model: 'User',
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
    const defaultServer = await Server.findOne({ name: 'Default' }).populate('channels');
    user.servers.push(defaultServer);
    await user.save();

    // Push the user into the default server, save
    defaultServer.users.push(user);
    await defaultServer.save();
  }

  // Let other users know
  const users = await User.find({ online: true });
  io.emit('action', { type: 'io/activeUsers', payload: users });
  // Send the current user's servers (with channels populated) and send to client
  socket.emit('action', { type: 'io/servers', payload: user.servers });
  // Also send friends
  socket.emit('action', { type: 'io/friends', payload: user.friends });
};

const onUserDisconnected = async (io, socket) => {
  // Update the user's online status to false
  await User.updateOne({ socketId: socket.id }, { online: false });
  // Let other users know
  const users = await User.find({ online: true });
  io.emit('action', { type: 'io/activeUsers', payload: users });
};

module.exports = { onUserConnected, onUserDisconnected };
