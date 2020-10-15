import { ClientIOActions } from './types';

export const connect = (name: string | null): ClientIOActions.ConnectIOAction => {
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
  name: string | null,
  channel: Channel
): ClientIOActions.SelectChannelIOAction => {
  return {
    type: 'io/userSelectedChannel',
    payload: { name, channel },
  };
};

export const createServer = (
  name: string | null,
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
  name: string | null,
  serverName: string
): ClientIOActions.JoinServerIOAction => {
  return {
    type: 'io/userJoinedServer',
    payload: { name, serverName },
  };
};

export const sendFriendRequest = (
  name: string | null,
  friendName: string
): ClientIOActions.SendFriendRequestIOAction => {
  return {
    type: 'io/userSentFriendRequest',
    payload: { name, friendName },
  };
};

export const removeFriend = (
  name: string | null,
  friendName: string
): ClientIOActions.RemoveFriendIOAction => {
  return {
    type: 'io/userRemovedFriend',
    payload: { name, friendName },
  };
};

export const createPin = (
  name: string | null,
  message: string,
  selectedChannel: Channel
): ClientIOActions.CreatePinIOAction => {
  return {
    type: 'io/userCreatedPin',
    payload: { name, message, selectedChannel },
  };
};

export const message = (name: string | null, message: string): ClientIOActions.MessageIOAction => {
  return {
    type: 'io/userMessaged',
    payload: { name, message },
  };
};

export const deleteMessage = (
  name: string | null,
  message: Message
): ClientIOActions.DeleteMessageIOAction => {
  return {
    type: 'io/userDeletedMessage',
    payload: { name, message },
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
  name: string | null,
  channelId: string
): ClientIOActions.DeleteChannelIOAction => {
  return {
    type: 'io/userDeletedChannel',
    payload: { name, channelId },
  };
};

export const selectPrivateChannel = (
  name: string | null,
  username: string
): ClientIOActions.SelectPrivateChannelIOAction => {
  return {
    type: 'io/userSelectedPrivateChannel',
    payload: { name, username },
  };
};

export const connectNewPrivateUser = (
  name: string | null,
  username: string
): ClientIOActions.ConnectNewPrivateUserIOAction => {
  return {
    type: 'io/userConnectedNewPrivateUser',
    payload: { name, username },
  };
};

export const leaveServer = (
  name: string | null,
  serverName: string
): ClientIOActions.LeaveServerIOAction => {
  return {
    type: 'io/userLeftServer',
    payload: { name, serverName },
  };
};
