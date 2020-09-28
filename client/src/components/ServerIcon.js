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
    alignItems: 'center',
    transition: 'background-color .3s',
    fontSize: '1.7rem',
    fontWeight: 600,
    textAlign: 'center',

    '& > svg': {
      fontSize: '3rem',
      color: '#3CB371',
    },

    '&:hover': {
      backgroundColor: 'rgb(114,137,218)',
      borderRadius: '40%',

      '& > *': {
        color: 'white',
      },
    },
  },
});

const Server = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.serverContainer}>
      <div className={classes.server}>{children}</div>
    </div>
  );
};

export default Server;
