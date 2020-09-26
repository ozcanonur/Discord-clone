import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Server from './Server';

const useStyles = makeStyles({
  serverList: {
    height: '100vh',
    backgroundColor: 'rgb(32,34,37)',
    color: 'white',
    fontSize: '2rem',
    overflow: 'hidden',
    padding: '0.8rem',
  },
});

const ServerList = () => {
  const classes = useStyles();

  return (
    <div className={classes.serverList}>
      <Server />
      <Server />
      <Server />
      <Server />
    </div>
  );
};

export default ServerList;
