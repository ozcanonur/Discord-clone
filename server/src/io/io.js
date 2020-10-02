const socketIo = require('socket.io');
const server = require('../index');

const { setupDefaultServer } = require('./util');

const io = socketIo(server);

const { onUserConnected, onUserDisconnected } = require('./ioConnection');
const { onUserCreatedChannel, onUserCreatedServer, onUserJoinedServer } = require('./ioCreateJoin');
const { onUserSentFriendRequest } = require('./ioFriend');
const {
  onUserMessaged,
  onUserSelectedChannel,
  onUserSelectedFriendChannel,
} = require('./ioChannelMessage');

io.on('connection', (socket) => {
  socket.on('action', async (action) => {
    // Create default server if it doesn't exist
    await setupDefaultServer();
    switch (action.type) {
      case 'io/userConnected':
        await onUserConnected(io, socket, action);
        break;
      case 'io/userCreatedServer':
        await onUserCreatedServer(socket, action);
        break;
      case 'io/userCreatedChannel':
        await onUserCreatedChannel(io, action);
        break;
      case 'io/userJoinedServer':
        await onUserJoinedServer(socket, action);
        break;
      case 'io/userSentFriendRequest':
        await onUserSentFriendRequest(io, action);
        break;
      case 'io/userSelectedChannel':
        await onUserSelectedChannel(socket, action);
        break;
      case 'io/userSelectedFriendChannel':
        await onUserSelectedFriendChannel(socket, action);
        break;
      case 'io/userMessaged':
        await onUserMessaged(io, action);
        break;
    }
  });

  socket.on('disconnect', async () => {
    await onUserDisconnected(io, socket);
  });
});
