import { Socket } from 'socket.io';
import { io } from '../index';
import { onUserConnected, onUserDisconnected } from './ioConnection';
import {
  onUserCreatedChannel,
  onUserDeletedChannel,
  onUserSelectedChannel,
  onUserSelectedVoiceChannel,
  onUserCreatedPin,
} from './ioChannel';
import {
  onUserCreatedServer,
  onUserJoinedServer,
  onUserDeletedServer,
  onUserLeftServer,
} from './ioServer';
import {
  onUserSentFriendRequest,
  onUserConnectedNewPrivateUser,
  onUserRemovedFriend,
  onUserSelectedPrivateChannel,
} from './ioPrivate';
import { onUserMessaged, onUserDeletedMessage } from './ioMessage';

export interface Action {
  type: string;
  payload: any;
}

io.on('connection', (socket: Socket) => {
  socket.on('action', async (action: Action) => {
    // ioConnection
    if (action.type === 'io/userConnected') await onUserConnected(io, socket, action);
    else if (action.type === 'io/userDisconnected') await onUserDisconnected(io, socket);
    // ioServer
    else if (action.type === 'io/userCreatedServer') await onUserCreatedServer(socket, action);
    else if (action.type === 'io/userJoinedServer') await onUserJoinedServer(socket, action);
    else if (action.type === 'io/userLeftServer') await onUserLeftServer(socket, action);
    else if (action.type === 'io/userDeletedServer') await onUserDeletedServer(io, action);
    // ioChannel
    else if (action.type === 'io/userCreatedChannel')
      await onUserCreatedChannel(io, socket, action);
    else if (action.type === 'io/userSelectedChannel')
      await onUserSelectedChannel(io, socket, action);
    else if (action.type === 'io/userSelectedVoiceChannel')
      await onUserSelectedVoiceChannel(io, socket, action);
    else if (action.type === 'io/userDeletedChannel') await onUserDeletedChannel(io, action);
    else if (action.type === 'io/userCreatedPin') await onUserCreatedPin(io, action);
    // ioPrivate
    else if (action.type === 'io/userConnectedNewPrivateUser')
      await onUserConnectedNewPrivateUser(io, action);
    else if (action.type === 'io/userSentFriendRequest')
      await onUserSentFriendRequest(io, socket, action);
    else if (action.type === 'io/userSelectedPrivateChannel')
      await onUserSelectedPrivateChannel(socket, action);
    else if (action.type === 'io/userRemovedFriend') await onUserRemovedFriend(io, action);
    // ioMessage
    else if (action.type === 'io/userMessaged') await onUserMessaged(io, action);
    else if (action.type === 'io/userDeletedMessage') await onUserDeletedMessage(io, action);
  });

  socket.on('disconnect', async () => {
    await onUserDisconnected(io, socket);
  });
});
