import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { reducers } from './reducers';

const socket = io('http://localhost:5000');
const socketIoMiddleware = createSocketIoMiddleware(socket, 'io/');

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(socketIoMiddleware))
);
