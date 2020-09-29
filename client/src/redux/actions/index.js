export const join = (username) => {
  return {
    type: 'io/join',
    payload: username,
  };
};

export const sendMessage = (message) => {
  return {
    type: 'io/message',
    payload: message,
  };
};

export const createServer = (serverName) => {
  return {
    type: 'io/createServer',
    payload: {
      name: serverName,
      channels: [
        { name: 'general', type: 'text' },
        { name: 'voice', type: 'voice' },
      ],
    },
  };
};

export const selectServerName = (serverName) => {
  return {
    type: 'SELECT_SERVER_NAME',
    payload: serverName,
  };
};
