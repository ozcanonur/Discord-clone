import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';

import serverIconStyles from './styles/serverIcon';

const useStyles = makeStyles(serverIconStyles);

const ServerIcon = ({ children, onClick, style, privateRoute }) => {
  const shortenServerName = (name) => name.split(' ').map((word) => word.slice(0, 1));

  const selectedServerName = useSelector((state) => state.selectedServerName);
  const isSelected =
    selectedServerName === children || (privateRoute && selectedServerName === 'private');

  const classes = useStyles(isSelected);

  return (
    <div onClick={onClick} className={classes.serverContainer}>
      <div className={classes.server} style={style}>
        {typeof children === 'string' ? shortenServerName(children) : children}
      </div>
    </div>
  );
};

export default ServerIcon;
