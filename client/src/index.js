import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { store } from './redux/store';
import Private from './views/Private';
import Login from './views/Login';
import App from './App';
import './style.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/main' component={App} />
        <Route path='/private' component={Private} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
