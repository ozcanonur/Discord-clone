import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Main from 'views/Main/index';
import Sidebar from 'views/Sidebar/index';
import Grid from '@material-ui/core/Grid';
import { connect } from 'redux/actions/socket';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(connect());
  }, [dispatch]);

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
