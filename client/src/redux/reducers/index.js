import { combineReducers } from 'redux';

const messages = (state = [], action) => {
  switch (action.type) {
    case 'messages':
      return [...state, action.payload];
    case 'CLEAR_MESSAGES':
      return [];
    default:
      return state;
  }
};

const users = (state = [], action) => {
  switch (action.type) {
    case 'io/users':
      return action.payload;
    default:
      return state;
  }
};

const servers = (state = [], action) => {
  switch (action.type) {
    case 'io/servers':
      return action.payload;
    default:
      return state;
  }
};

const selectedServer = (state = '', action) => {
  switch (action.type) {
    case 'SELECT_SERVER':
      return action.payload;
    default:
      return state;
  }
};

const selectedChannelName = (state = '', action) => {
  switch (action.type) {
    case 'SELECT_CHANNEL_NAME':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  messages,
  users,
  servers,
  selectedServer,
  selectedChannelName,
});
