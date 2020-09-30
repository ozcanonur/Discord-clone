import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Input from './Input';
import Messages from './Messages';

const useStyles = makeStyles({
  chat: {
    flexGrow: 1,
    padding: '2rem',
    fontSize: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
  },
});

const Chat = () => {
  const classes = useStyles();
  const selectedChannelName = useSelector((state) => state.selectedChannelName);

  return (
    <div className={classes.chat}>
      {selectedChannelName !== '' ? (
        <>
          <Messages />
          <Input />
        </>
      ) : null}
    </div>
  );
};

export default Chat;
