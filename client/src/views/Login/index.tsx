import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { createStyles } from '@material-ui/core';

import Login from './Login';
import Register from './Register';

const useStyles = makeStyles(
  createStyles({
    container: {
      width: '100%',
      height: '100%',
      padding: '10% 38%',
      backgroundColor: '#202225',
    },
  })
);

const LoginPage = () => {
  const classes = useStyles();

  const [registerOpen, setRegisterOpen] = useState(false);

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
