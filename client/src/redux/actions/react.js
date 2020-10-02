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
