import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
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
    color: 'rgb(220,221,222)',
  },
});

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
