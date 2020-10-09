import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import qs from 'qs';

import { connect } from '../../actions/socket';
import FriendList from './FriendList';
import ServerList from '../Sidebar/ServerList/index';
import indexStyles from './styles/index';
import Header from './Header';
import ActiveUsers from '../Main/ActiveUsers';
import Chat from './Chat';
import AddFriendBox from './AddFriendBox';

const useStyles = makeStyles(indexStyles);

const Private = () => {
  const classes = useStyles();

  const { name }: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const selectedTabInPrivate = useSelector((state: RootState) => state.selectedTabInPrivate);
  const activeUsersOpen = useSelector((state: RootState) => state.activeUsersOpen);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(connect(name));
  }, [dispatch, name]);

  return (
    <Grid container direction='row'>
      <Grid item style={{ width: '35rem' }}>
        <Grid container direction='row'>
          <Grid item xs={3}>
            <ServerList />
          </Grid>
          <Grid item xs={9}>
            <FriendList />
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