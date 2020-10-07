import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import IconButton from '@material-ui/core/IconButton';

import headerStyles from './styles/header';

const useStyles = makeStyles(headerStyles);

const Header = () => {
  const classes = useStyles();

  const selectedServerName = useSelector((state) => state.selectedServerName);

  return (
    <div className={classes.header}>
      <div className={classes.serverName}>{selectedServerName}</div>
      <IconButton className={classes.iconButton}>
        <KeyboardArrowDown className={classes.item} />
      </IconButton>
    </div>
  );
};

export default Header;
