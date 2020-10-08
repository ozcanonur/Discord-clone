import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import { deleteMessage } from '../../actions/socket';
import qs from 'qs';

import Message from '../../components/Message';
import Input from '../../components/Input';
import chatStyles from './styles/chat';

const useStyles = makeStyles(chatStyles);

const Chat = () => {
  const classes = useStyles();

  const { name }: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const messages = useSelector((state: RootState) => state.messages);
  const selectedFriend = useSelector((state: RootState) => state.selectedFriend);

  // Scroll messages to bottom on change
  const scrollRef = useRef<any>(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);

  const dispatch = useDispatch();
  const deleteMessageOnClick = (message: Message) => {
    dispatch(deleteMessage(name, message));
  };

  return (
    <div className={classes.container}>
      <div className={classes.chat}>
        {selectedFriend !== '' ? (
          <>
            <List className={classes.messages}>
              {messages.map((message: Message, key) => (
                <ListItem key={key} ref={scrollRef} disableGutters className={classes.listItem}>
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
            </List>
            <Input />
          </>
        ) : (
          <div className={classes.warning}>Select a friend to chat!</div>
        )}
      </div>
    </div>
  );
};

export default Chat;
