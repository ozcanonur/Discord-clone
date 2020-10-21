/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { login } from '../../actions/react';
import { disconnect } from '../../actions/socket';
import Login from './Login';
import Register from './Register';
import loginStyles from './styles/login';
import { generateBlob } from './blob';

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
  if (root) {
    root.appendChild(generateBlob(3000, '#242424', 50));
    root.appendChild(generateBlob(2000, '#36393f', 33));
    root.appendChild(generateBlob(1000, '#dadbdc', 16));
  }

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
