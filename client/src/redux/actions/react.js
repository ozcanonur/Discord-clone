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

export const clearNotificationByType = (type) => {
  return {
    type: 'CLEAR_NOTIFICATION_BY_TYPE',
    payload: type,
  };
};

export const clearIoResponse = () => {
  return {
    type: 'CLEAR_IO_RESPONSE',
  };
};
