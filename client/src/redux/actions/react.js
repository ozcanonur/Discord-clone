export const selectServerName = (serverName) => {
  return {
    type: 'SELECT_SERVER_NAME',
    payload: serverName,
  };
};

export const selectChannel = (channel) => {
  return {
    type: 'SELECT_CHANNEL',
    payload: channel,
  };
};
