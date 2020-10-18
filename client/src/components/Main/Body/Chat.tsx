/* eslint-disable no-nested-ternary */
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

  const messages = useSelector((state: RootState) => state.messages);
  const selectedChannel = useSelector((state: RootState) => state.selectedChannel);
  const selectedServerName = useSelector((state: RootState) => state.selectedServerName);
  const [shownMessagesCount, setShownMessagesCount] = useState(15);

  const shownMessages = messages.slice(0, shownMessagesCount);

  // Scroll messages to bottom on change
  const scrollDownRef = useRef<any>(null);
  useEffect(() => {
    if (scrollDownRef.current) scrollDownRef.current.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // if (scrollDownRef.current) scrollDownRef.current.scrollIntoView({ behaviour: 'smooth' });
    // Cleanup, reset count to 15
    setShownMessagesCount(15);
  }, [selectedChannel]);

  const fetchMoreData = () => {
    setTimeout(() => {
      const additionalCount = Math.min(15, messages.length - shownMessagesCount);
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
          <div
            id='scrollableDiv'
            style={{
              height: '100%',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column-reverse',
              marginBottom: '1rem',
            }}
          >
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
                <div className={classes.loading}>
                  <Loading style={{ height: '10rem' }} />
                </div>
              }
              scrollableTarget='scrollableDiv'
            >
              <div ref={scrollDownRef} />
              {shownMessages.map((message, key) => (
                <ListItem key={key} disableGutters className={classes.listItem}>
                  <Message message={message} />
                  <MessageOptions message={message} />
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
