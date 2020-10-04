import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import qs from 'qs';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import activeUserStyles from './styles/activeUser';

const useStyles = makeStyles(activeUserStyles);

const ActiveUser = ({ name }) => {
  const classes = useStyles();

  const user = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  return (
    <div
      className={classes.user}
      style={{ backgroundColor: user.name === name ? 'rgb(64, 67, 74)' : 'inherit' }}
    >
      <div className={classes.iconContainer}>
        <AccountCircleRoundedIcon className={classes.icon} />
      </div>
      <div className={classes.username}>{name}</div>
    </div>
  );
};

export default ActiveUser;
