import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import indexStyles from './styles/index';
import SecondaryButtons from './Options';
import Servers from './Servers';

const useStyles = makeStyles(indexStyles);

const ServerList = () => {
  const classes = useStyles();

  return (
    <div className={classes.serverList}>
      <SecondaryButtons />
      <Servers />
    </div>
  );
};

export default ServerList;