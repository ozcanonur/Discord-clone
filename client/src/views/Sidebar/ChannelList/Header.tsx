import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';

import headerStyles from './styles/header';

const useStyles = makeStyles(headerStyles);

const Header = () => {
  const classes = useStyles();

  const selectedServerName = useSelector((state: RootState) => state.selectedServerName);

  return (
    <div className={classes.header}>
      <div className={classes.serverName}>{selectedServerName}</div>
    </div>
  );
};

export default Header;
