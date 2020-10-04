const socketIo = require('socket.io');
const server = require('../index');

const { setupServer } = require('./util');

const io = socketIo(server);

const { onUserConnected, onUserDisconnected } = require('./ioConnection');
const { onUserCreatedChannel, onUserCreatedServer, onUserJoinedServer } = require('./ioCreateJoin');
const { onUserSentFriendRequest } = require('./ioFriend');
const {
  onUserMessaged,
  onUserSelectedChannel,
  onUserSelectedFriendChannel,
} = require('./ioChannelMessage');
const { onUserCreatedPin } = require('./ioMisc');

io.on('connection', (socket) => {
  socket.on('action', async (action) => {
    // Create default servers if it doesn't exist
    await setupServer('Default', [
      { name: 'general', isVoice: false },
      { name: 'world news', isVoice: false },
      { name: 'covid-19', isVoice: false },
      { name: 'voice', isVoice: true },
    ]);
    await setupServer('Games', [
      { name: 'general', isVoice: false },
      { name: 'World of Warcraft', isVoice: false },
      { name: 'Path of Exile', isVoice: false },
      { name: 'voice', isVoice: true },
    ]);

    if (action.type === 'io/userConnected') await onUserConnected(io, socket, action);
    else if (action.type === 'io/userCreatedServer') await onUserCreatedServer(socket, action);
    else if (action.type === 'io/userCreatedChannel')
      await onUserCreatedChannel(io, socket, action);
    else if (action.type === 'io/userJoinedServer') await onUserJoinedServer(socket, action);
    else if (action.type === 'io/userSentFriendRequest')
      await onUserSentFriendRequest(io, socket, action);
    else if (action.type === 'io/userSelectedChannel') await onUserSelectedChannel(socket, action);
    else if (action.type === 'io/userSelectedFriendChannel')
      await onUserSelectedFriendChannel(socket, action);
    else if (action.type === 'io/userMessaged') await onUserMessaged(io, action);
    else if (action.type === 'io/userCreatedPin') await onUserCreatedPin(io, action);
  });

  socket.on('disconnect', async () => {
    await onUserDisconnected(io, socket);
  });
});
