import React from 'react';
import Grid from '@material-ui/core/Grid';

import ServerList from './ServerList/index';
import ChannelList from './ChannelList/index';

const Sidebar = () => {
  return (
    <div>
      <Grid container direction='row'>
        <Grid item xs={3}>
          <ServerList />
        </Grid>
        <Grid item xs={9}>
          <ChannelList />
        </Grid>
      </Grid>
    </div>
  );
};

export default Sidebar;
