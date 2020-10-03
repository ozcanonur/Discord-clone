import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import activeUserStyles from './styles/activeUser';

const useStyles = makeStyles(activeUserStyles);

const ActiveUser = ({ name }) => {
  const classes = useStyles();

  return (
    <div className={classes.user}>
      <div className={classes.iconContainer}>
        <AccountCircleRoundedIcon className={classes.icon} />
      </div>
      <div className={classes.username}>{name}</div>
    </div>
  );
};

export default ActiveUser;
