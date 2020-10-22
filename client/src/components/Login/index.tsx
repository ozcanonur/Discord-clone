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
  const blob1 = generateBlob(2000, '#242424', 30);
  const blob2 = generateBlob(1300, '#36393f', 20);

  const blobs = document.getElementsByTagName('canvas');
  if (root) {
    while (blobs[0]) root.removeChild(blobs[0]);
    root.appendChild(blob1);
    root.appendChild(blob2);
  }

  return (
    <div id='container' className={classes.container}>
      <div className={classes.loginContainer}>
        {registerOpen ? (
          <Register registerOpen={registerOpen} setRegisterOpen={setRegisterOpen} blob={blob1} />
        ) : (
          <Login registerOpen={registerOpen} setRegisterOpen={setRegisterOpen} blob={blob1} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
