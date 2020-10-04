import { combineReducers } from 'redux';

const activeUsers = (state = [], action) => {
  switch (action.type) {
    case 'io/activeUsers':
      return [...action.payload];
    default:
      return state;
  }
};

const servers = (state = [], action) => {
  switch (action.type) {
    case 'io/servers':
      return [...action.payload];
    default:
      return state;
  }
};

const messages = (state = [], action) => {
  switch (action.type) {
    case 'io/messages':
      return [...action.payload];
    default:
      return state;
  }
};

const selectedServerName = (state = '', action) => {
  switch (action.type) {
    case 'SELECT_SERVER_NAME':
      return action.payload;
    default:
      return state;
  }
};

const selectedChannel = (state = { messages: [] }, action) => {
  switch (action.type) {
    case 'SELECT_CHANNEL':
      return { ...action.payload };
    default:
      return state;
  }
};

const selectedTabInPrivate = (state = 'Chat', action) => {
  switch (action.type) {
    case 'SELECT_TAB_IN_PRIVATE':
      return action.payload;
    default:
      return state;
  }
};

const friends = (state = [], action) => {
  switch (action.type) {
    case 'io/friends':
      return [...action.payload];
    default:
      return state;
  }
};

const selectedFriend = (state = '', action) => {
  switch (action.type) {
    case 'SELECT_FRIEND':
      return action.payload;
    default:
      return state;
  }
};

const activeUsersOpen = (state = true, action) => {
  switch (action.type) {
    case 'TOGGLE_ACTIVE_USERS':
      return !state;
    default:
      return state;
  }
};

const userNotification = (state = { hasNotification: false, from: '' }, action) => {
  switch (action.type) {
    case 'io/notification':
      return { hasNotification: true, from: action.payload };
    case 'CLEAR_NOTIFICATION':
      return { hasNotification: false, from: '' };
    default:
      return state;
  }
};

const ioResponse = (state = {}, action) => {
  switch (action.type) {
    case 'io/response':
      return { ...action.payload };
    case 'CLEAR_IO_RESPONSE':
      return {};
    default:
      return state;
  }
};

const pinnedMessages = (state = [], action) => {
  switch (action.type) {
    case 'io/pinnedMessages':
      return [...action.payload];
    default:
      return state;
  }
};

export default combineReducers({
  messages,
  activeUsers,
  servers,
  selectedServerName,
  selectedChannel,
  selectedTabInPrivate,
  friends,
  selectedFriend,
  activeUsersOpen,
  userNotification,
  ioResponse,
  pinnedMessages,
});
