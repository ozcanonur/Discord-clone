import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { connect } from 'redux/actions/socket';
import qs from 'qs';
import FriendList from './FriendList';
import ServerList from '../Sidebar/ServerList/index';
import Main from './Body';

const Private = () => {
  const { name } = qs.parse(window.location.search, { ignoreQueryPrefix: true });

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
        <Main />
      </Grid>
    </Grid>
  );
};

export default Private;
