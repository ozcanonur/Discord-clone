import { Socket } from 'socket.io';
import { io } from '../index';
import { onUserConnected, onUserDisconnected } from './ioConnection';
import {
  onUserCreatedChannel,
  onUserDeletedChannel,
  onUserSelectedChannel,
  onUserCreatedPin,
} from './ioChannel';
import {
  onUserCreatedServer,
  onUserJoinedServer,
  onUserDeletedServer,
  onUserLeftServer,
} from './ioServer';
import {
  onUserAddedFriend,
  onUserConnectedNewPrivateUser,
  onUserRemovedFriend,
  onUserSelectedPrivateChannel,
} from './ioPrivate';
import {
  onUserTyping,
  onUserStoppedTyping,
  onUserMessaged,
  onUserDeletedMessage,
} from './ioMessage';

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
    else if (action.type === 'io/userDeletedChannel')
      await onUserDeletedChannel(io, socket, action);
    else if (action.type === 'io/userCreatedPin') await onUserCreatedPin(io, action);
    // ioPrivate
    else if (action.type === 'io/userConnectedNewPrivateUser')
      await onUserConnectedNewPrivateUser(socket, action);
    else if (action.type === 'io/userAddedFriend') await onUserAddedFriend(io, socket, action);
    else if (action.type === 'io/userSelectedPrivateChannel')
      await onUserSelectedPrivateChannel(io, socket, action);
    else if (action.type === 'io/userRemovedFriend') await onUserRemovedFriend(io, socket, action);
    // ioMessage
    else if (action.type === 'io/userTyping') await onUserTyping(io, socket);
    else if (action.type === 'io/userStoppedTyping') await onUserStoppedTyping(io, socket);
    else if (action.type === 'io/userMessaged') await onUserMessaged(io, socket, action);
    else if (action.type === 'io/userDeletedMessage')
      await onUserDeletedMessage(io, socket, action);
  });

  socket.on('disconnect', async () => {
    await onUserDisconnected(io, socket);
  });
});
