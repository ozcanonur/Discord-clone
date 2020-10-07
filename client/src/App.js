/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import qs from 'qs';

import Main from './views/Main/index';
import Sidebar from './views/Sidebar/index';
import { connect, selectChannel as selectChannelIo } from './redux/actions/socket';
import { selectServerName, selectChannel } from './redux/actions/react';

const App = () => {
  const { name } = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const servers = useSelector((state) => state.servers);

  const dispatch = useDispatch();

  useEffect(() => {
    // Connect to socket io, gets servers
    dispatch(connect(name));
    // Select the default server on entr y
    dispatch(selectServerName('Default'));
  }, []);

  useEffect(() => {
    // Select the first channel on entry
    const server = servers.find((server) => server.name === 'Default');
    if (!server) return;
    const firstChannel = server.channels[0];
    dispatch(selectChannel(firstChannel));
    dispatch(selectChannelIo(name, firstChannel));
  }, [servers]);

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
