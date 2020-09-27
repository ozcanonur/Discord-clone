import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ActiveUser from 'components/ActiveUser';

const useStyles = makeStyles({
  activeUsers: {
    width: '27rem',
    backgroundColor: 'rgb(47,49,54)',
    padding: '3rem',
  },
  usersStatus: {
    color: 'rgb(142,146,151)',
    fontSize: '1.3rem',
  },
});

const ActiveUsers = () => {
  const classes = useStyles();

  return (
    <div className={classes.activeUsers}>
      <div className={classes.usersStatus}>ONLINE &ndash; 1</div>
      <ActiveUser name='Onur' />
      <ActiveUser name='Rachel' />
    </div>
  );
};

export default ActiveUsers;
