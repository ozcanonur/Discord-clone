/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Message from 'components/Message';
import Input from './Input';

const useStyles = makeStyles({
  chat: {
    flexGrow: 1,
    padding: '2rem',
    fontSize: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
  },
  warning: {
    margin: 'auto auto',
    fontSize: '2rem',
    color: 'rgb(220,221,222)',
  },
  messages: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom: '1rem',
    overflowY: 'auto',
  },
});

const Chat = () => {
  const classes = useStyles();

  const selectedServerName = useSelector((state) => state.selectedServerName);
  const selectedChannel = useSelector((state) => state.selectedChannel);
  const messages = useSelector((state) => state.messages);

  return (
    <div className={classes.chat}>
      {selectedServerName === '' ? (
        <div className={classes.warning}>Select a server</div>
      ) : !selectedChannel.name ? (
        <div className={classes.warning}>Select a channel</div>
      ) : !selectedChannel.voice ? (
        <>
          <div className={classes.messages}>
            {messages.map((message, key) => (
              <Message key={key} message={message} />
            ))}
          </div>
          <Input />
        </>
      ) : null}
    </div>
  );
};

export default Chat;
