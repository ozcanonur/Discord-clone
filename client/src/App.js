import React from 'react';
import Main from 'views/Main/index';
import Sidebar from 'views/Sidebar/index';
import Grid from '@material-ui/core/Grid';

const App = () => {
  return (
    <Grid container direction='row'>
      <Grid item style={{ width: '35rem' }}>
        <Sidebar />
      </Grid>
      <Grid item xs>
        <Main />
      </Grid>
    </Grid>
  );
};

export default App;
