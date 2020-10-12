/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import qs from 'qs';

import Main from './views/Main/index';
import Servers from './views/Servers';
import Channels from './views/Channels';
import { connect } from './actions/socket';

const App = () => {
  const { name }: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connect(name));
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
