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
import { login, selectServer, addPinNotification, setServers } from './actions/react';

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const authenticateAndInit = async () => {
      try {
        const authResponse = await axios.get('/user', { withCredentials: true });
        if (authResponse.status === 200) {
          const { name, id } = authResponse.data;
          const pinResponse = await axios.get('/unseenPins', {
            params: { name },
            withCredentials: true,
          });
          pinResponse.data.forEach((channelId: string) => {
            dispatch(addPinNotification('pin', channelId));
          });
          dispatch(login(name, id));
          dispatch(connect(name));

          const serversResponse = await axios.get('/servers', {
            params: { name },
            withCredentials: true,
          });
          dispatch(setServers(serversResponse.data));
          const defaultServer = serversResponse.data.find((s: Server) => s.name === 'Default');
          dispatch(selectServer(defaultServer));
        }
      } catch (err) {
        history.push('/login');
        console.log(err);
      }
    };

    authenticateAndInit();
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
