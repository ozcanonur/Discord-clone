import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { store } from './store';
import Private from './views/Private';
import Login from './views/Login';
import App from './App';
import './style.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(220,221,222)',
    },
    secondary: {
      main: 'rgb(32,34,37)',
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
