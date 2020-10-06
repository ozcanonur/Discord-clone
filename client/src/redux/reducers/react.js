export const name = (state = '', action) => {
  switch (action.type) {
    case 'SET_NAME':
      return action.payload;
    default:
      return state;
  }
};

export const selectedServerName = (state = '', action) => {
  switch (action.type) {
    case 'SELECT_SERVER_NAME':
      return action.payload;
    default:
      return state;
  }
};

export const selectedChannel = (state = { messages: [] }, action) => {
  switch (action.type) {
    case 'SELECT_CHANNEL':
      return { ...action.payload };
    default:
      return state;
  }
};

export const selectedTabInPrivate = (state = 'Chat', action) => {
  switch (action.type) {
    case 'SELECT_TAB_IN_PRIVATE':
      return action.payload;
    default:
      return state;
  }
};

export const selectedFriend = (state = '', action) => {
  switch (action.type) {
    case 'SELECT_FRIEND':
      return action.payload;
    default:
      return state;
  }
};

export const activeUsersOpen = (state = true, action) => {
  switch (action.type) {
    case 'TOGGLE_ACTIVE_USERS':
      return !state;
    default:
      return state;
  }
};
