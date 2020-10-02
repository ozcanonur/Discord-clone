/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Message from 'components/Message';
import Input from 'components/Input';
import chatStyles from './styles/chat';

const useStyles = makeStyles(chatStyles);

const Chat = () => {
  const classes = useStyles();

  const messages = useSelector((state) => state.messages);
  const selectedFriend = useSelector((state) => state.selectedFriend);

  // Scroll messages to bottom on change
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={classes.chat}>
      {selectedFriend !== '' ? (
        <>
          <div className={classes.stretch} />
          <List className={classes.messages}>
            {messages.map((message, key) => (
              <ListItem key={key} ref={scrollRef} disableGutters className={classes.listItem}>
                <Message key={key} message={message} />
              </ListItem>
            ))}
          </List>
          <Input />
        </>
      ) : (
        <div className={classes.warning}>Select a friend to chat!</div>
      )}
    </div>
  );
};

export default Chat;
