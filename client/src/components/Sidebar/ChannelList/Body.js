import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  body: {
    height: '90vh',
    color: 'white',
    fontSize: '2rem',
    padding: '1rem',
  },
});

const Body = () => {
  const classes = useStyles();

  return <div className={classes.body}>Body</div>;
};

export default Body;
