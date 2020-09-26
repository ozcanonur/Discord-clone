import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  header: {
    height: '5vh',
    backgroundColor: '#36393f',
    color: 'white',
    fontSize: '2rem',
    padding: '1rem',
    borderBottom: '2px solid rgb(32,34,37)',
  },
});

const Header = () => {
  const classes = useStyles();

  return <div className={classes.header}>Header</div>;
};

export default Header;
