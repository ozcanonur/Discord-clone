import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { reducers } from 'reducers';
import Private from 'components/Private';
import Login from 'components/Login';
import App from './App';
import './style.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#dcddde',
    },
    secondary: {
      main: '#202225',
    },
  },
  typography: {
    fontFamily: 'Whitney Medium, sans-serif',
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});

const serverUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://ozcanonur-discord.herokuapp.com';

// @ts-ignore
const socket = io(serverUrl);
const socketIoMiddleware = createSocketIoMiddleware(socket, 'io/');

const store = createStore(reducers, composeWithDevTools(applyMiddleware(socketIoMiddleware)));

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/main' component={App} />
          <Route path='/private' component={Private} />
          <Redirect to='/login' />
        </Switch>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
