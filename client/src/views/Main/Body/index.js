import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Chat from './Chat/index';
import ActiveUsers from './ActiveUsers';

const useStyles = makeStyles({
  chatContainer: {
    backgroundColor: '#36393f',
    color: 'white',
    fontWeight: 1000,
    flexGrow: 1,
    display: 'flex',
    height: 0, // for stopping overflow, needs more work
  },
});

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
