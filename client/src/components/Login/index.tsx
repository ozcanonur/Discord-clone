/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { login } from '../../actions/react';
import { disconnect } from '../../actions/socket';
import Login from './Login';
import Register from './Register';
import loginStyles from './styles/login';
import Blob from './blob';

const useStyles = makeStyles(loginStyles);

const LoginPage = () => {
  const classes = useStyles();

  const [registerOpen, setRegisterOpen] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(login(null, null));
    dispatch(disconnect());
  }, []);

  // Blob animation on top left
  const root = document.getElementById('root');
  if (root) root.appendChild(Blob);

  return (
    <div id='container' className={classes.container}>
      <div className={classes.loginContainer}>
        {registerOpen ? (
          <Register registerOpen={registerOpen} setRegisterOpen={setRegisterOpen} />
        ) : (
          <Login registerOpen={registerOpen} setRegisterOpen={setRegisterOpen} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
