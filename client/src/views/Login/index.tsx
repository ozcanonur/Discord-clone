/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { createStyles } from '@material-ui/core';

import { disconnect } from '../../actions/socket';
import Login from './Login';
import Register from './Register';

const useStyles = makeStyles(
  createStyles({
    container: {
      width: '100%',
      height: '100%',
      padding: '10% 35%',
      backgroundColor: '#202225',
    },
  })
);

const LoginPage = () => {
  const classes = useStyles();

  const [registerOpen, setRegisterOpen] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(disconnect());
  }, []);

  return (
    <div className={classes.container}>
      {registerOpen ? (
        <Register registerOpen={registerOpen} setRegisterOpen={setRegisterOpen} />
      ) : (
        <Login registerOpen={registerOpen} setRegisterOpen={setRegisterOpen} />
      )}
    </div>
  );
};

export default LoginPage;
