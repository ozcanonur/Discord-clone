/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';

import PrivateUserList from './PrivateUserList';
import ServerList from '../Servers/index';
import Header from './Header';
import ActiveUsers from '../Main/Body/ActiveUsers';
import Chat from './Chat';
import AddFriendBox from './AddFriendBox';
import { connect, stopTyping } from 'actions/socket';
import { login, selectServerName } from 'actions/react';
import indexStyles from './styles/index';

const useStyles = makeStyles(indexStyles);

const Private = () => {
  const classes = useStyles();

  const user = useSelector((state: RootState) => state.user);
  const selectedTabInPrivate = useSelector((state: RootState) => state.selectedTabInPrivate);
  const activeUsersOpen = useSelector((state: RootState) => state.activeUsersOpen);

  const history = useHistory();
  const dispatch = useDispatch();

  // State on login/route change
  const dispatchInitState = (name: string | null, id: string | null) => {
    dispatch(login(name, id));
    dispatch(connect(name));
    dispatch(selectServerName('private'));
    // ({ _id: undefined, name: '', isVoice: false, voiceUsers: [] }));
  };

  const authenticate = async () => {
    try {
      return await axios.get('/user', { withCredentials: true });
    } catch (err) {
      history.push('/login');
      console.error(err);
    }
  };

  const init = async () => {
    const auth = await authenticate();
    if (auth && auth.status === 200) {
      const { name, id } = auth?.data;
      dispatchInitState(name, id);
    }
  };

  useEffect(() => {
    dispatch(stopTyping());
    // Clean voice thingies
    // @ts-ignore
    const streams = window.streams;
    if (streams) {
      streams.forEach((stream: MediaStream) => {
        stream.getAudioTracks().forEach((track: MediaStreamTrack) => {
          track.stop();
        });
      });
    }

    // Remove all audio html elements
    const audios = document.getElementsByTagName('audio');
    while (audios[0]) {
      audios[0].parentNode?.removeChild(audios[0]);
    }

    // If user is coming directly to /private instead of the login route (refresh etc.)
    if (user.name === null) init();
    else dispatchInitState(user.name, user.id);
  }, []);

  return (
    <Grid container direction='row'>
      <Grid item style={{ width: '35rem', zIndex: 1 }}>
        <Grid container direction='row'>
          <Grid item xs={3}>
            <ServerList />
          </Grid>
          <Grid item xs={9}>
            <PrivateUserList />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs style={{ zIndex: 1 }}>
        <div className={classes.container}>
          <Header />
          <div className={classes.chatContainer}>
            {selectedTabInPrivate === 'Chat' ? <Chat /> : <AddFriendBox />}
            {activeUsersOpen ? <ActiveUsers /> : null}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Private;
