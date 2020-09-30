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
