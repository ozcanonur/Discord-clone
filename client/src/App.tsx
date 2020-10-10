/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import qs from 'qs';

import Main from './views/Main/index';
import Sidebar from './views/Sidebar/index';
import { connect } from './actions/socket';

const App = () => {
  const { name }: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connect(name));
  }, []);

  // useEffect(() => {
  //   // Select the first channel on entry
  //   const server = servers.find((server: Server) => server.name === 'Default');
  //   if (!server) return;
  //   const firstChannel = server.channels[0];
  //   dispatch(selectChannel(firstChannel));
  //   dispatch(selectChannelIo(name, firstChannel));
  // }, [servers]);

  return (
    <Grid container direction='row'>
      <Grid item style={{ width: '35rem' }}>
        <Sidebar />
      </Grid>
      <Grid item xs>
        <Main />
      </Grid>
    </Grid>
  );
};

export default App;
