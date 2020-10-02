import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import activeUserStyles from './styles/activeUser';

const useStyles = makeStyles(activeUserStyles);

const ActiveUser = ({ name }) => {
  const classes = useStyles();

  return (
    <div className={classes.user}>
      <div className={classes.icon} />
      <div className={classes.username}>{name}</div>
    </div>
  );
};

export default ActiveUser;
