/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItem from '@material-ui/core/ListItem';
import InfiniteScroll from 'react-infinite-scroll-component';

import Message from './Message';
import MessageOptions from './MessageOptions';
import Input from './Input';
import { ReactComponent as Loading } from '../../../assets/spinner.svg';
import chatStyles from '../styles/chat';

const useStyles = makeStyles(chatStyles);

const Chat = () => {
  const classes = useStyles();

  const { name } = useSelector((state: RootState) => state.user);
  const messages = useSelector((state: RootState) => state.messages);
  const selectedChannel = useSelector((state: RootState) => state.selectedChannel);
  const selectedServerName = useSelector((state: RootState) => state.selectedServerName);
  const [shownMessagesCount, setShownMessagesCount] = useState(20);

  const shownMessages = messages.slice(0, shownMessagesCount);

  // Scroll messages to bottom on change
  const scrollDownRef = useRef<any>(null);
  useEffect(() => {
    if (scrollDownRef.current && messages.length > 0 && messages[0].username === name)
      scrollDownRef.current.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (scrollDownRef.current) scrollDownRef.current.scrollIntoView({ behaviour: 'smooth' });
    // Cleanup, reset count to 20
    setShownMessagesCount(20);
  }, [selectedChannel]);

  const fetchMoreData = () => {
    setTimeout(() => {
      const additionalCount = Math.min(20, messages.length - shownMessagesCount);
      setShownMessagesCount(shownMessagesCount + additionalCount);
    }, 1000);
  };

  return (
    <div className={classes.container}>
      {selectedServerName === '' ? (
        <div className={classes.warning}>Select a server</div>
      ) : selectedChannel.name === '' ? (
        <div className={classes.warning}>Select a channel</div>
      ) : selectedChannel.isVoice ? (
        <div className={classes.warning}>{`You are in # ${selectedChannel.name} (voice)`}</div>
      ) : (
        <div className={classes.chat}>
          <div id='scrollableDiv' className={classes.scrollableDiv}>
            <InfiniteScroll
              dataLength={shownMessagesCount}
              next={fetchMoreData}
              className={classes.infiniteScroll}
              inverse
              hasMore={messages.length > shownMessagesCount}
              endMessage={
                <h4
                  className={classes.endMessage}
                >{`This is the start of the # ${selectedChannel.name} channel.`}</h4>
              }
              loader={
                <div className={classes.loadingContainer}>
                  <Loading className={classes.loading} />
                </div>
              }
              scrollableTarget='scrollableDiv'
            >
              <div ref={scrollDownRef} />
              {shownMessages.map((message, key) => (
                <ListItem key={key} disableGutters className={classes.listItem}>
                  <Message message={message} />
                  <div className={classes.messageOptionsContainer}>
                    <MessageOptions message={message} />
                  </div>
                </ListItem>
              ))}
            </InfiniteScroll>
          </div>
          <Input />
        </div>
      )}
    </div>
  );
};

export default Chat;
