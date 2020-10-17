/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';

import { connect } from '../../actions/socket';
import { login } from '../../actions/react';
import PrivateUserList from './PrivateUserList';
import ServerList from '../Servers/index';
import indexStyles from './styles/index';
import Header from './Header';
import ActiveUsers from '../Main/Body/ActiveUsers';
import Chat from './Chat';
import AddFriendBox from './AddFriendBox';

const useStyles = makeStyles(indexStyles);

const Private = () => {
  const classes = useStyles();

  const selectedTabInPrivate = useSelector((state: RootState) => state.selectedTabInPrivate);
  const activeUsersOpen = useSelector((state: RootState) => state.activeUsersOpen);

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
