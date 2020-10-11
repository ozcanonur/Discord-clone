import { ClientIOActions } from './types';

export const connect = (name: string): ClientIOActions.ConnectIOAction => {
  return {
    type: 'io/userConnected',
    payload: name,
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

export const selectChannel = (
  name: string,
  channel: Channel
): ClientIOActions.SelectChannelIOAction => {
  return {
    type: 'io/userSelectedChannel',
    payload: { name, channel },
  };
};

export const createServer = (
  name: string,
  serverName: string
): ClientIOActions.CreateServerIOAction => {
  return {
    type: 'io/userCreatedServer',
    payload: {
      name,
      server: serverName,
    },
  };
};

export const joinServer = (
  name: string,
  serverName: string
): ClientIOActions.JoinServerIOAction => {
  return {
    type: 'io/userJoinedServer',
    payload: { name, serverName },
  };
};

export const sendFriendRequest = (
  name: string,
  friendName: string
): ClientIOActions.SendFriendRequestIOAction => {
  return {
    type: 'io/userSentFriendRequest',
    payload: { name, friendName },
  };
};

export const createPin = (
  name: string,
  message: string,
  selectedChannel: Channel
): ClientIOActions.CreatePinIOAction => {
  return {
    type: 'io/userCreatedPin',
    payload: { name, message, selectedChannel },
  };
};

export const message = (name: string, message: string): ClientIOActions.MessageIOAction => {
  return {
    type: 'io/userMessaged',
    payload: { name, message },
  };
};

export const deleteMessage = (
  name: string,
  message: Message
): ClientIOActions.DeleteMessageIOAction => {
  return {
    type: 'io/userDeletedMessage',
    payload: { name, message },
  };
};

export const deleteServer = (
  name: string,
  serverName: string
): ClientIOActions.DeleteServerIOAction => {
  return {
    type: 'io/userDeletedServer',
    payload: { name, serverName },
  };
};

export const deleteChannel = (
  name: string,
  channelId: string
): ClientIOActions.DeleteChannelIOAction => {
  return {
    type: 'io/userDeletedChannel',
    payload: { name, channelId },
  };
};

export const selectUserChannel = (
  name: string,
  username: string
): ClientIOActions.SelectPrivateChannelIOAction => {
  return {
    type: 'io/userSelectedPrivateChannel',
    payload: { name, username },
  };
};
