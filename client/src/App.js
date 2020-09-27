import React from 'react';
import Main from 'components/Main/index';
import Sidebar from 'components/Sidebar/index';
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
