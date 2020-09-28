import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Message from 'components/Message';

const useStyles = makeStyles({
  messages: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom: '1rem',
    overflowY: 'auto',
  },
});

const Messages = () => {
  const classes = useStyles();
  const messages = useSelector((state) => state.messages);

  return (
    <div className={classes.messages}>
      {messages.map(({ username, text }, key) => (
        <Message key={key} username={username} text={text} />
      ))}
    </div>
  );
};

export default Messages;
