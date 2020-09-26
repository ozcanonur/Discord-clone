import React from 'react';
import Main from 'components/Main/index';
import Sidebar from 'components/Sidebar/index';
import Grid from '@material-ui/core/Grid';

const App = () => {
  return (
    <div>
      <Grid container direction='row'>
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={9}>
          <Main />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
