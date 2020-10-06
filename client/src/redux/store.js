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
} from 'redux/reducers/socket';
import {
  name,
  selectedServerName,
  selectedChannel,
  selectedTabInPrivate,
  selectedFriend,
  activeUsersOpen,
} from 'redux/reducers/react';

const reducers = combineReducers({
  name,
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
