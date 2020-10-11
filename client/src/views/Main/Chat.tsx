/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItem from '@material-ui/core/ListItem';
import InfiniteScroll from 'react-infinite-scroll-component';

import Message from '../../components/Message';
import MessageOptions from './MessageOptions';
import Input from '../../components/Input';
import chatStyles from './styles/chat';
import { ReactComponent as Loading } from '../../assets/spinner.svg';

const useStyles = makeStyles(chatStyles);

const Chat = () => {
  const classes = useStyles();

  const messages = useSelector((state: RootState) => state.messages);
  const selectedChannel = useSelector((state: RootState) => state.selectedChannel);
  const selectedServerName = useSelector((state: RootState) => state.selectedServerName);
  const [shownMessagesCount, setShownMessagesCount] = useState(15);

  // Scroll messages to bottom on change
  const scrollRef = useRef<any>(null);
  useEffect(() => {
    // Cleanup, reset count to 15
    setShownMessagesCount(15);
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);

  const fetchMoreData = () => {
    setTimeout(() => {
      const additionalCount = Math.min(15, messages.length - shownMessagesCount);
      setShownMessagesCount(shownMessagesCount + additionalCount);
    }, 1000);
  };

  const endMessage =
    messages.length === 0
      ? `This is the start of the # ${selectedChannel.name} channel.`
      : `End of the # ${selectedChannel.name} channel.`;

  return (
    <div className={classes.container}>
      {selectedServerName === '' ? (
        <div className={classes.warning}>Select a server</div>
      ) : selectedChannel.name === '' ? (
        <div className={classes.warning}>Select a channel</div>
      ) : (
        <div className={classes.chat}>
          <InfiniteScroll
            dataLength={shownMessagesCount}
            next={fetchMoreData}
            className={classes.infiniteScroll}
            height={window.innerHeight > 850 ? '80vh' : '75vh'}
            inverse={true}
            hasMore={messages.length > shownMessagesCount}
            endMessage={<h4 className={classes.endMessage}>{endMessage}</h4>}
            loader={
              <div className={classes.loading}>
                <Loading style={{ height: '10rem' }} />
              </div>
            }
          >
            {messages.slice(0, shownMessagesCount).map((message, key) => (
              <ListItem key={key} disableGutters className={classes.listItem}>
                <Message message={message} />
                <MessageOptions message={message} />
              </ListItem>
            ))}
          </InfiniteScroll>
          <Input />
          <div ref={scrollRef} />
        </div>
      )}
    </div>
  );
};

export default Chat;
