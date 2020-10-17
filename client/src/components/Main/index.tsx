import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Header from './Header/Header';
import Chat from './Body/Chat';
import indexStyles from './styles/index';
import ActiveUsers from './Body/ActiveUsers';

const useStyles = makeStyles(indexStyles);

const Main = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.chatContainer}>
        <Chat />
        <ActiveUsers />
      </div>
    </div>
  );
};

export default Main;
