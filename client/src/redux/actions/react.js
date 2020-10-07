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

export const selectTabInPrivate = (tabName) => {
  return {
    type: 'SELECT_TAB_IN_PRIVATE',
    payload: tabName,
  };
};

export const selectFriendChannel = (friendName) => {
  return {
    type: 'SELECT_FRIEND_CHANNEL',
    payload: friendName,
  };
};

export const selectFriend = (friendName) => {
  return {
    type: 'SELECT_FRIEND',
    payload: friendName,
  };
};

export const toggleActiveUsers = () => {
  return {
    type: 'TOGGLE_ACTIVE_USERS',
  };
};

export const clearPrivateNotification = (friendName) => {
  return {
    type: 'CLEAR_PRIVATE_NOTIFICATION',
    payload: friendName,
  };
};

export const clearPinNotification = (channel) => {
  return {
    type: 'CLEAR_PIN_NOTIFICATION',
    payload: channel,
  };
};

export const clearIoResponse = () => {
  return {
    type: 'CLEAR_IO_RESPONSE',
  };
};
