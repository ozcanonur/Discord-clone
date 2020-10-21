import { ClientIOActions } from './types';

export const connect = (name: string | null): ClientIOActions.ConnectIOAction => {
  return {
    type: 'io/userConnected',
    payload: { name },
  };
};

export const disconnect = (): ClientIOActions.DisconnectIOAction => {
  return {
    type: 'io/userDisconnected',
  };
};

export const createChannel = (
  server: Server,
  channelName: string,
  isVoice: boolean
): ClientIOActions.CreateChannelIOAction => {
  return {
    type: 'io/userCreatedChannel',
    payload: { server, channelName, isVoice },
  };
};

export const selectChannel = (channel: Channel): ClientIOActions.SelectChannelIOAction => {
  return {
    type: 'io/userSelectedChannel',
    payload: { channel },
  };
};

export const createServer = (serverName: string): ClientIOActions.CreateServerIOAction => {
  return {
    type: 'io/userCreatedServer',
    payload: {
      server: serverName,
    },
  };
};

export const joinServer = (serverName: string): ClientIOActions.JoinServerIOAction => {
  return {
    type: 'io/userJoinedServer',
    payload: { serverName },
  };
};

export const addFriend = (friendName: string): ClientIOActions.AddFriendIOAction => {
  return {
    type: 'io/userAddedFriend',
    payload: { friendName },
  };
};

export const removeFriend = (friendName: string): ClientIOActions.RemoveFriendIOAction => {
  return {
    type: 'io/userRemovedFriend',
    payload: { friendName },
  };
};

export const createPin = (
  message: Message,
  selectedChannel: Channel
): ClientIOActions.CreatePinIOAction => {
  return {
    type: 'io/userCreatedPin',
    payload: { message, selectedChannel },
  };
};

export const message = (message: string): ClientIOActions.MessageIOAction => {
  return {
    type: 'io/userMessaged',
    payload: { message },
  };
};

export const deleteMessage = (message: Message): ClientIOActions.DeleteMessageIOAction => {
  return {
    type: 'io/userDeletedMessage',
    payload: { message },
  };
};

export const deleteServer = (
  name: string | null,
  serverName: string
): ClientIOActions.DeleteServerIOAction => {
  return {
    type: 'io/userDeletedServer',
    payload: { name, serverName },
  };
};

export const deleteChannel = (
  channelId: string | undefined
): ClientIOActions.DeleteChannelIOAction => {
  return {
    type: 'io/userDeletedChannel',
    payload: { channelId },
  };
};

export const selectPrivateChannel = (
  username: string
): ClientIOActions.SelectPrivateChannelIOAction => {
  return {
    type: 'io/userSelectedPrivateChannel',
    payload: { username },
  };
};

export const connectNewPrivateUser = (
  username: string
): ClientIOActions.ConnectNewPrivateUserIOAction => {
  return {
    type: 'io/userConnectedNewPrivateUser',
    payload: { username },
  };
};

export const leaveServer = (serverName: string): ClientIOActions.LeaveServerIOAction => {
  return {
    type: 'io/userLeftServer',
    payload: { serverName },
  };
};
