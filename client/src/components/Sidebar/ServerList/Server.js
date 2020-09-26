import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  serverContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    cursor: 'pointer',
  },
  server: {
    backgroundColor: 'rgb(54,57,63)',
    borderRadius: '50%',
    width: '5rem',
    height: '5rem',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    transition: 'background-color .3s',

    '&:hover': {
      backgroundColor: 'rgb(114,137,218)',
      transform: 'scale(1.05)',
      borderRadius: '40%',
    },
  },
  serverText: {
    transform: 'translateY(23%)',
  },
});

const Server = () => {
  const classes = useStyles();

  return (
    <div className={classes.serverContainer}>
      <div className={classes.server}>
        <p className={classes.serverText}>sv</p>
      </div>
    </div>
  );
};

export default Server;
