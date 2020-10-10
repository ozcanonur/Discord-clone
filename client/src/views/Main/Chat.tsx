/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Message from '../../components/Message';
import MessageOptions from './MessageOptions';
import Input from '../../components/Input';
import chatStyles from './styles/chat';
import { ReactComponent as Loading } from '../../spinner.svg';

const useStyles = makeStyles(chatStyles);

let scrollPosition;

const Chat = () => {
  const classes = useStyles();

  const messages = useSelector((state: RootState) => state.messages);
  const selectedChannel = useSelector((state: RootState) => state.selectedChannel);
  const selectedServerName = useSelector((state: RootState) => state.selectedServerName);
  const [shownMessagesCount, setShownMessagesCount] = useState(15);
  const [loading, setLoading] = useState(false);

  const anotherRef = useRef<any>(null);

  // Scroll messages to bottom on change
  const scrollRef = useRef<any>(null);
  useEffect(() => {
    // Cleanup, reset count to 15
    // setShownMessagesCount(15);
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);

  const handleScrollTop = (e: any) => {
    scrollPosition = e.target.scrollTop;
    // console.log(scrollPosition);
    // console.log(messages.length, shownMessagesCount);
    if (scrollPosition === 0 && messages.length > shownMessagesCount) {
      setLoading(true);
      setTimeout(() => {
        const additionalCount = Math.min(15, messages.length - shownMessagesCount);
        setShownMessagesCount(shownMessagesCount + additionalCount);
        if (anotherRef.current) {
          console.log(anotherRef.current);
          anotherRef.current.scrollIntoView({ behaviour: 'smooth' });
        }
        setLoading(false);
      }, 200);
    }
  };

  return (
    <div className={classes.container} onScroll={(e) => handleScrollTop(e)}>
      {selectedServerName === '' ? (
        <div className={classes.warning}>Select a server!</div>
      ) : selectedChannel.name === '' ? (
        <div className={classes.warning}>Select a channel!</div>
      ) : (
        <div className={classes.chat}>
          {loading ? (
            <div className={classes.loading}>
              <Loading style={{ height: '10rem' }} />
            </div>
          ) : null}
          <List className={classes.messages}>
            {messages.slice(0, shownMessagesCount).map((message, key) => (
              <ListItem key={key} disableGutters className={classes.listItem}>
                <Message message={message} />
                <MessageOptions message={message} />
              </ListItem>
            ))}
          </List>
          <Input />
          <div ref={scrollRef} />
        </div>
      )}
    </div>
  );
};

export default Chat;
