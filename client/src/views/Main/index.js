import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Header from './Header';
import Chat from './Body';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  header: {
    flexGrow: 1,
  },
  chat: {
    flexGrow: 2,
  },
});

const Main = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Header className={classes.header} />
      <Chat className={classes.chat} />
    </div>
  );
};

export default Main;
