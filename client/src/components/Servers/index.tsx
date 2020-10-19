import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Options from './Options';
import Servers from './Servers';

const useStyles = makeStyles({
  list: {
    height: '100vh',
    backgroundColor: '#202225',
    color: 'white',
    fontSize: '2rem',
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: '0.8rem',
  },
});

const ServerList = () => {
  const classes = useStyles();

  return (
    <div className={classes.list}>
      <Options />
      <Servers />
    </div>
  );
};

export default ServerList;
