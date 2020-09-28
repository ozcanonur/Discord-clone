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

export default combineReducers({
  messages,
  users,
});
