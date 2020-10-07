import { uniqBy } from 'lodash';

export const friends = (state = [], action) => {
  switch (action.type) {
    case 'io/friends':
      return [...action.payload];
    default:
      return state;
  }
};

export const notifications = (state = [], action) => {
  switch (action.type) {
    case 'io/notification':
      return uniqBy([...state, action.payload], (e) => e.from);
    case 'CLEAR_PRIVATE_NOTIFICATION':
      return action.payload
        ? state.filter((notification) => notification.from && notification.from !== action.payload)
        : state.filter((notification) => notification.type !== 'private');
    // Clear channel pin notification
    case 'CLEAR_PIN_NOTIFICATION':
      return state.filter(
        (notification) => notification.channel && notification.channel._id !== action.payload._id
      );
    default:
      return state;
  }
};

export const ioResponse = (state = {}, action) => {
  switch (action.type) {
    case 'io/response':
      return { ...action.payload };
    case 'CLEAR_IO_RESPONSE':
      return {};
    default:
      return state;
  }
};

export const pinnedMessages = (state = [], action) => {
  switch (action.type) {
    case 'io/pinnedMessages':
      return [...action.payload];
    default:
      return state;
  }
};

export const activeUsers = (state = [], action) => {
  switch (action.type) {
    case 'io/activeUsers':
      return [...action.payload];
    default:
      return state;
  }
};

export const servers = (state = [], action) => {
  switch (action.type) {
    case 'io/servers':
      return [...action.payload];
    default:
      return state;
  }
};

export const messages = (state = [], action) => {
  switch (action.type) {
    case 'io/messages':
      return [...action.payload];
    default:
      return state;
  }
};
