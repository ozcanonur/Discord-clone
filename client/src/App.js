import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Main from 'views/Main/index';
import Sidebar from 'views/Sidebar/index';
import Grid from '@material-ui/core/Grid';
import { connect, selectChannel as selectChannelIo } from 'redux/actions/socket';
import { selectServerName, selectChannel } from 'redux/actions/react';
import qs from 'qs';

const App = () => {
  const { name } = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const servers = useSelector((state) => state.servers);

  const dispatch = useDispatch();

  useEffect(() => {
    // Connect to socket io, gets servers
    dispatch(connect(name));
    // Select the default server on entry
    dispatch(selectServerName('Default'));
  }, [dispatch, name]);

  useEffect(() => {
    // Select the first channel on entry
    const server = servers.find((server) => server.name === 'Default');
    if (!server) return;
    const firstChannel = server.channels[0];
    dispatch(selectChannel(firstChannel));
    dispatch(selectChannelIo(name, firstChannel));
  }, [dispatch, name, servers]);

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
