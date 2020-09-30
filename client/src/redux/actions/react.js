export const selectServer = (server) => {
  return {
    type: 'SELECT_SERVER',
    payload: server,
  };
};

export const selectChannel = (channel) => {
  return {
    type: 'SELECT_CHANNEL',
    payload: channel,
  };
};
