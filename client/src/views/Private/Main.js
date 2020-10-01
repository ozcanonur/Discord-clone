import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Header from './Header';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  header: {
    flexGrow: 1,
  },
});

const Main = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Header className={classes.header} />
    </div>
  );
};

export default Main;
