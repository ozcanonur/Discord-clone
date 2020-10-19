/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { login } from '../../actions/react';
import { disconnect } from '../../actions/socket';
import Login from './Login';
import Register from './Register';
import loginStyles from './styles/login';

const useStyles = makeStyles(loginStyles);

const LoginPage = () => {
  const classes = useStyles();

  const [registerOpen, setRegisterOpen] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(login(null, null));
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
