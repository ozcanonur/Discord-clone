import React from 'react';
import Grid from '@material-ui/core/Grid';
import FriendList from './FriendList';
import ServerList from '../Sidebar/ServerList/index';
import Main from './Main';

const Private = () => {
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
