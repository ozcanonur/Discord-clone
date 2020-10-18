import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import InfiniteScroll from 'react-infinite-scroll-component';

import Message from '../Main/Body/Message';
import Input from '../Main/Body/Input';
import { ReactComponent as Loading } from '../../assets/spinner.svg';
import { deleteMessage } from '../../actions/socket';
import chatStyles from '../Main/styles/chat';

const useStyles = makeStyles(chatStyles);

const Chat = () => {
  const classes = useStyles();

  const { name } = useSelector((state: RootState) => state.user);
  const messages = useSelector((state: RootState) => state.messages);
  const selectedPrivateUser = useSelector((state: RootState) => state.selectedPrivateUser);
  const [shownMessagesCount, setShownMessagesCount] = useState(15);

  const shownMessages = messages.slice(0, shownMessagesCount);

  // Scroll messages to bottom on change
  const scrollRef = useRef<any>(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);

  // useEffect(() => {
  //   // Cleanup, reset count to 15
  //   setShownMessagesCount(15);
  // }, [selectedPrivateUser]);

  const dispatch = useDispatch();
  const deleteMessageOnClick = (message: Message) => {
    dispatch(deleteMessage(message));
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      const additionalCount = Math.min(15, messages.length - shownMessagesCount);
      setShownMessagesCount(shownMessagesCount + additionalCount);
    }, 1000);
  };

  return (
    <div className={classes.container}>
      {selectedPrivateUser === '' ? (
        <div className={classes.warning}>Select a user to chat!</div>
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
                >{`This is the start of the conversation with @${selectedPrivateUser}.`}</h4>
              }
              loader={
                <div className={classes.loading}>
                  <Loading style={{ height: '10rem' }} />
                </div>
              }
              scrollableTarget='scrollableDiv'
            >
              <div ref={scrollRef} />
              {shownMessages.map((message: Message, key) => (
                <ListItem key={key} disableGutters className={classes.listItem}>
                  <Message key={key} message={message} />
                  <div className={classes.messageOptions}>
                    {message.username === name ? (
                      <Tooltip
                        enterDelay={0}
                        placement='top'
                        title='Delete message'
                        classes={{ tooltip: classes.notificationTooltip }}
                      >
                        <DeleteForeverRoundedIcon
                          className={classes.optionIcon}
                          onClick={() => deleteMessageOnClick(message)}
                        />
                      </Tooltip>
                    ) : null}
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
