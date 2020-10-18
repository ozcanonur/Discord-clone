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
          dispatch(selectServerName('Default'));
        }
      } catch (err) {
        history.push('/login');
        console.log(err);
      }
    };

    // If user is not coming from the /private route
    if (user.name === null) {
      authenticateAndInit();
    } else {
      // @ts-ignore
      dispatch(login(user.name, user.id));
      dispatch(connect(user.name));
      dispatch(selectServerName('Default'));
    }

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
