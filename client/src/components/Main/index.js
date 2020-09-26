import React from 'react';
import Grid from '@material-ui/core/Grid';

import Header from './Header';
import Chat from './Chat';

const Main = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <Header />
      </Grid>
      <Grid item>
        <Chat />
      </Grid>
    </Grid>
  );
};

export default Main;
