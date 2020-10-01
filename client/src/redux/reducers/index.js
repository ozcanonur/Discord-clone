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

export default combineReducers({
  messages,
  activeUsers,
  servers,
  selectedServerName,
  selectedChannel,
});
