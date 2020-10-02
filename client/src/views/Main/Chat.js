/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Message from 'components/Message';
import Input from 'components/Input';
import chatStyles from './styles/chat';

const useStyles = makeStyles(chatStyles);

const Chat = () => {
  const classes = useStyles();

  const selectedServerName = useSelector((state) => state.selectedServerName);
  const selectedChannel = useSelector((state) => state.selectedChannel);
  const messages = useSelector((state) => state.messages);

  // Scroll messages to bottom on change
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={classes.chat}>
      {selectedServerName === '' ? (
        <div className={classes.warning}>Select a server</div>
      ) : !selectedChannel.name ? (
        <div className={classes.warning}>Select a channel</div>
      ) : !selectedChannel.voice ? (
        <>
          <List className={classes.messages}>
            {messages.map((message, key) => (
              <ListItem key={key} ref={scrollRef} disableGutters className={classes.listItem}>
                <Message key={key} message={message} />
              </ListItem>
            ))}
          </List>
          <Input />
        </>
      ) : null}
    </div>
  );
};

export default Chat;
