import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Main from 'views/Main/index';
import Sidebar from 'views/Sidebar/index';
import Grid from '@material-ui/core/Grid';
import { join } from 'redux/actions/index';
import qs from 'qs';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const { username } = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    dispatch(join(username));
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
