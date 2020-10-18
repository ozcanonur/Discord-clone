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
import { connect } from '../../actions/socket';
import { login, selectServerName } from '../../actions/react';
import indexStyles from './styles/index';

const useStyles = makeStyles(indexStyles);

const Private = () => {
  const classes = useStyles();

  const user = useSelector((state: RootState) => state.user);
  const selectedTabInPrivate = useSelector((state: RootState) => state.selectedTabInPrivate);
  const activeUsersOpen = useSelector((state: RootState) => state.activeUsersOpen);

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const authenticateAndInit = () => {
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
    };
    // If user is coming directly to /private instead of the login route (refresh etc.)
    if (user.name === null) {
      authenticateAndInit();
    } else {
      // @ts-ignore
      dispatch(login(user.name, user.id));
      dispatch(connect(user.name));
      dispatch(selectServerName('private'));
    }
  }, []);

  return (
    <Grid container direction='row'>
      <Grid item style={{ width: '35rem' }}>
        <Grid container direction='row'>
          <Grid item xs={3}>
            <ServerList />
          </Grid>
          <Grid item xs={9}>
            <PrivateUserList />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs>
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