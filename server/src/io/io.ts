import socketIo, { Socket } from 'socket.io';
import server from '../index';
import { setupServer } from './util';
import { onUserConnected, onUserDisconnected } from './ioConnection';
import {
  onUserCreatedChannel,
  onUserCreatedServer,
  onUserJoinedServer,
  onUserDeletedServer,
  onUserDeletedChannel,
} from './ioCreateJoin';
import { onUserSentFriendRequest, onUserConnectedNewPrivateUser } from './ioPrivate';
import { onUserMessaged, onUserDeletedMessage } from './ioMessage';
import { onUserSelectedChannel, onUserSelectedPrivateChannel } from './ioSelectChannel';
import { onUserCreatedPin } from './ioMisc';

export interface Action {
  type: string;
  payload: any;
}

const io: SocketIO.Server = socketIo(server);

io.on('connection', (socket: Socket) => {
  socket.on('action', async (action: Action) => {
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
    else if (action.type === 'io/userSelectedPrivateChannel')
      await onUserSelectedPrivateChannel(socket, action);
    else if (action.type === 'io/userMessaged') await onUserMessaged(io, action);
    else if (action.type === 'io/userCreatedPin') await onUserCreatedPin(io, action);
    else if (action.type === 'io/userDeletedMessage') await onUserDeletedMessage(io, action);
    else if (action.type === 'io/userDeletedServer') await onUserDeletedServer(io, action);
    else if (action.type === 'io/userDeletedChannel') await onUserDeletedChannel(io, action);
    else if (action.type === 'io/userConnectedNewPrivateUser')
      await onUserConnectedNewPrivateUser(io, action);
  });

  socket.on('disconnect', async () => {
    await onUserDisconnected(io, socket);
  });
});
