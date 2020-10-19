/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import Main from './components/Main';
import Servers from './components/Servers';
import Channels from './components/Channels';
import { connect } from './actions/socket';
import { login, selectServerName, addPinNotification, selectChannel } from './actions/react';

const App = () => {
  const user = useSelector((state: RootState) => state.user);

  const history = useHistory();
  const dispatch = useDispatch();

  // State on login/route change
  const dispatchInitState = (name: string | null, id: string | null) => {
    dispatch(login(name, id));
    dispatch(connect(name));
  };

  const authenticate = async () => {
    try {
      return await axios.get('/user', { withCredentials: true });
    } catch (err) {
      history.push('/login');
      return console.error(err);
    }
  };

  // Get unseen pins in currently subscribed servers
  // Between the time user logged out and pins created
  const getUnseenPins = async (name: string | null) => {
    try {
      return await axios.get('/unseenPins', {
        params: { name },
        withCredentials: true,
      });
    } catch (err) {
      return console.log(err);
    }
  };

  const init = async () => {
    const auth = await authenticate();
    if (auth && auth.status === 200) {
      const { name, id } = auth?.data;
      const pins = await getUnseenPins(name);

      if (pins) {
        pins.data.forEach((channelId: string) => {
          dispatch(addPinNotification('pin', channelId));
        });
      }

      dispatchInitState(name, id);
      // Also select the default server
      dispatch(selectServerName('Default'));
    }
  };

  useEffect(() => {
    // If user just logged in
    if (user.name === null) init();
    // If user is coming from any other route
    else dispatchInitState(user.name, user.id);
    // Just to cleanup things by switching to no channel
    return () => {
      dispatch(selectChannel({ _id: '', name: '', isVoice: false, voiceUsers: [] }));
    };
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
