import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  chat: {
    height: '95vh',
    backgroundColor: '#36393f',
    color: 'white',
    fontSize: '2rem',
    padding: '1rem',
  },
});

const Chat = () => {
  const classes = useStyles();

  return <div className={classes.chat}>Chat</div>;
};

export default Chat;
