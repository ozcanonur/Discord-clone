import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  body: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 1000,
    padding: '2rem',
    flexGrow: 1,
  },
});

const Body = () => {
  const classes = useStyles();

  return <div className={classes.body}>Body</div>;
};

export default Body;
