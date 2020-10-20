import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Options from './Options';
import Servers from './Servers';
import indexStyles from './styles/index';

const useStyles = makeStyles(indexStyles);

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
