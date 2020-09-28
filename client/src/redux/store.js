import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import reducers from 'redux/reducers/';

const socket = io('http://localhost:5000');
const socketIoMiddleware = createSocketIoMiddleware(socket, 'io/');

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk), applyMiddleware(socketIoMiddleware))
);
