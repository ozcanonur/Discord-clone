import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Main from 'views/Main/index';
import Sidebar from 'views/Sidebar/index';
import Grid from '@material-ui/core/Grid';
import { connect } from 'redux/actions/socket';
import qs from 'qs';

const App = () => {
  const { name } = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(connect(name));
  }, [dispatch, name]);

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
