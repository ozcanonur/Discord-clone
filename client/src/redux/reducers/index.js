import { combineReducers } from 'redux';

const messages = (state = [], action) => {
  switch (action.type) {
    case 'messages':
      return action.payload;
    default:
      return state;
  }
};

const users = (state = [], action) => {
  switch (action.type) {
    case 'users':
      return action.payload;
    default:
      return state;
  }
};

const servers = (state = [], action) => {
  switch (action.type) {
    case 'servers':
      return action.payload;
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

export default combineReducers({
  messages,
  users,
  servers,
  selectedServerName,
});
