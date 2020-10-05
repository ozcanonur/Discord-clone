import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Header from './Header/index';
import Chat from './Chat';
import indexStyles from './styles/index';
import ActiveUsers from './ActiveUsers';

const useStyles = makeStyles(indexStyles);

const Main = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Header className={classes.header} />
      <div className={classes.chatContainer}>
        <Chat className={classes.chat} />
        <ActiveUsers />
      </div>
    </div>
  );
};

export default Main;
