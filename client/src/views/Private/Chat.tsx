import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import { deleteMessage } from '../../actions/socket';
import qs from 'qs';
import InfiniteScroll from 'react-infinite-scroll-component';

import Message from '../../components/Message';
import Input from '../../components/Input';
import chatStyles from './styles/chat';
import { ReactComponent as Loading } from '../../spinner.svg';

const useStyles = makeStyles(chatStyles);

const Chat = () => {
  const classes = useStyles();

  const { name }: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const messages = useSelector((state: RootState) => state.messages);
  const selectedFriend = useSelector((state: RootState) => state.selectedFriend);
  const [shownMessagesCount, setShownMessagesCount] = useState(15);

  // Scroll messages to bottom on change
  const scrollRef = useRef<any>(null);
  useEffect(() => {
    // Cleanup, reset count to 15
    setShownMessagesCount(15);
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);

  const dispatch = useDispatch();
  const deleteMessageOnClick = (message: Message) => {
    dispatch(deleteMessage(name, message));
  };

  const fetchMoreData = () => {
    if (messages.length > shownMessagesCount) {
      setTimeout(() => {
        const additionalCount = Math.min(15, messages.length - shownMessagesCount);
        setShownMessagesCount(shownMessagesCount + additionalCount);
      }, 1000);
    }
  };

  return (
    <div className={classes.container}>
      {selectedFriend === '' ? (
        <div className={classes.warning}>Select a friend to chat!</div>
      ) : (
        <div className={classes.chat}>
          <InfiniteScroll
            dataLength={shownMessagesCount}
            next={fetchMoreData}
            className={classes.infiniteScroll}
            height={window.innerHeight > 850 ? '80vh' : '75vh'}
            inverse={true}
            hasMore={messages.length > shownMessagesCount}
            endMessage={<h4 className={classes.endMessage}>End</h4>}
            loader={
              <div className={classes.loading}>
                <Loading style={{ height: '10rem' }} />
              </div>
            }
          >
            {messages.slice(0, shownMessagesCount).map((message: Message, key) => (
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
          <Input />
          <div ref={scrollRef} />
        </div>
      )}
    </div>
  );
};

export default Chat;
