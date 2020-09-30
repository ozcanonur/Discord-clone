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

  console.log(messages);
  return (
    <div className={classes.messages}>
      {messages.map((message, key) => {
        const user = message.user.name;
        const messageText = message.message;
        return <Message key={key} username={user} text={messageText} />;
      })}
    </div>
  );
};

export default Messages;
