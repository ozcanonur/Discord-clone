import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

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
  user: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '1rem',
    cursor: 'pointer',
    padding: '0.8rem',
    '&:hover': {
      backgroundColor: 'rgb(64, 67, 74)',
    },
  },
  icon: {
    display: 'inline-block',
    backgroundColor: '#3CB371',
    borderRadius: '50%',
    padding: '1.5rem',
    width: '1.5rem',
    height: '1.5rem',
  },
  username: {
    fontSize: '1.5rem',
    marginLeft: '1rem',
  },
});

const ActiveUsers = () => {
  const classes = useStyles();

  return (
    <div className={classes.activeUsers}>
      <div className={classes.usersStatus}>ONLINE &ndash; 1</div>
      <div className={classes.user}>
        <div className={classes.icon} />
        <div className={classes.username}>Onur</div>
      </div>
      <div className={classes.user}>
        <div className={classes.icon} />
        <div className={classes.username}>Rachel</div>
      </div>
    </div>
  );
};

export default ActiveUsers;
