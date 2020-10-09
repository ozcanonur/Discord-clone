import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { store } from './store';
import Private from './views/Private';
import Login from './views/Login';
import App from './App';
import './style.css';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Lato, sans-serif',
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/main' component={App} />
          <Route path='/private' component={Private} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
