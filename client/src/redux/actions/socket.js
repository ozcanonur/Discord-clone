export const connect = (name) => {
  return {
    type: 'io/userConnected',
    payload: name,
  };
};

export const createServer = (name, serverName) => {
  return {
    type: 'io/userCreatedServer',
    payload: {
      name,
      server: serverName,
    },
  };
};

export const selectChannel = (name, channel) => {
  return {
    type: 'io/userSelectedChannel',
    payload: { name, channel },
  };
};

export const message = (name, message) => {
  return {
    type: 'io/userMessaged',
    payload: { name, message },
  };
};

export const createChannel = (server, channelName, isVoice) => {
  return {
    type: 'io/userCreatedChannel',
    payload: { server, channelName, isVoice },
  };
};

export const joinServer = (name, serverName) => {
  return {
    type: 'io/userJoinedServer',
    payload: { name, serverName },
  };
};
