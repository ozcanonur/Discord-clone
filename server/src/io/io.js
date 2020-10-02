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
    if (action.type === 'io/userConnected') await onUserConnected(io, socket, action);
    else if (action.type === 'io/userCreatedServer') await onUserCreatedServer(socket, action);
    else if (action.type === 'io/userSelectedChannel') await onUserSelectedChannel(socket, action);
    else if (action.type === 'io/userMessaged') await onUserMessaged(io, action);
    else if (action.type === 'io/userCreatedChannel') await onUserCreatedChannel(io, action);
    else if (action.type === 'io/userJoinedServer') await onUserJoinedServer(socket, action);
    else if (action.type === 'io/userSentFriendRequest') await onUserSentFriendRequest(io, action);
    else if (action.type === 'io/userSelectedFriendChannel')
      await onUserSelectedFriendChannel(io, socket, action);
  });

  socket.on('disconnect', async () => {
    await onUserDisconnected(io, socket);
  });
});
