/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import Main from './views/Main/index';
import Servers from './views/Servers';
import Channels from './views/Channels';
import { connect } from './actions/socket';
import { login } from './actions/react';

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get('/user', { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          const { name, id } = res.data;
          dispatch(login(name, id));
          dispatch(connect(name));
        }
      })
      .catch((err) => {
        history.push('/login');
        console.log(err);
      });
  }, []);

  return (
    <Grid container direction='row'>
      <Grid item style={{ width: '35rem' }}>
        <Grid container direction='row'>
          <Grid item xs={3}>
            <Servers />
          </Grid>
          <Grid item xs={9}>
            <Channels />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs>
        <Main />
      </Grid>
    </Grid>
  );
};

export default App;
