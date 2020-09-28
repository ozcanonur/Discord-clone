import { combineReducers } from 'redux';

const message = (state = {}, action) => {
  switch (action.type) {
    case 'message':
      return action.payload;
    default:
      return state;
  }
};

const users = (state = [], action) => {
  switch (action.type) {
    case 'join':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  message,
  users,
});
