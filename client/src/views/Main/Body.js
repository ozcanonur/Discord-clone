import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Chat from './Chat';
import ActiveUsers from './ActiveUsers';
import bodyStyles from './styles/body';

const useStyles = makeStyles(bodyStyles);

const ChatIndex = () => {
  const classes = useStyles();

  return (
    <div className={classes.chatContainer}>
      <Chat />
      <ActiveUsers />
    </div>
  );
};

export default ChatIndex;
