import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

import {
  messages,
  activeUsers,
  servers,
  friends,
  notifications,
  ioResponse,
  pinnedMessages,
} from './reducers/socket';
import {
  selectedServerName,
  selectedChannel,
  selectedTabInPrivate,
  selectedFriend,
  activeUsersOpen,
} from './reducers/react';

const reducers = combineReducers({
  selectedServerName,
  selectedChannel,
  selectedTabInPrivate,
  selectedFriend,
  activeUsersOpen,
  messages,
  activeUsers,
  servers,
  friends,
  notifications,
  ioResponse,
  pinnedMessages,
});

const socket = io('http://localhost:5000');
const socketIoMiddleware = createSocketIoMiddleware(socket, 'io/');

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk), applyMiddleware(socketIoMiddleware))
);
