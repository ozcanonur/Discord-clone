import { ClientIOActions } from './types';

export const connect = (name: string): ClientIOActions.ConnectIOAction => {
  return {
    type: 'io/userConnected',
    payload: name,
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

export const selectChannel = (
  name: string,
  channel: Channel
): ClientIOActions.SelectChannelIOAction => {
  return {
    type: 'io/userSelectedChannel',
    payload: { name, channel },
  };
};

export const message = (name: string, message: Message): ClientIOActions.MessageIOAction => {
  return {
    type: 'io/userMessaged',
    payload: { name, message },
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

export const selectFriendChannel = (
  name: string,
  friendName: string
): ClientIOActions.SelectFriendChannelIOAction => {
  return {
    type: 'io/userSelectedFriendChannel',
    payload: { name, friendName },
  };
};

export const createPin = (
  name: string,
  message: Message,
  selectedChannel: Channel
): ClientIOActions.CreatePinIOAction => {
  return {
    type: 'io/userCreatedPin',
    payload: { name, message, selectedChannel },
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
