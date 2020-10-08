import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import qs from 'qs';

import Message from '../../components/Message';
import Input from '../../components/Input';
import chatStyles from './styles/chat';
import { deleteMessage, createPin } from '../../actions/socket';

const useStyles = makeStyles(chatStyles);

const Chat = () => {
  const classes = useStyles();

  const { name } = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const messages = useSelector((state) => state.messages);
  const selectedChannel = useSelector((state) => state.selectedChannel);

  // Scroll messages to bottom on change
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);

  const dispatch = useDispatch();
  const deleteMessageOnClick = (message) => {
    dispatch(deleteMessage(name, message));
  };

  const pinMessageOnClick = (message) => {
    dispatch(createPin(name, message.message, selectedChannel));
  };

  return (
    <div className={classes.container}>
      <div className={classes.chat}>
        <List className={classes.messages}>
          {messages.map((message, key) => (
            <ListItem key={key} ref={scrollRef} disableGutters className={classes.listItem}>
              <Message message={message} />
              <div className={classes.messageOptions}>
                <Tooltip
                  enterDelay={0}
                  placement='top'
                  title='Pin message'
                  classes={{ tooltip: classes.notificationTooltip }}
                >
                  <RoomRoundedIcon
                    className={classes.optionIcon}
                    style={{ marginRight: '0.5rem' }}
                    onClick={() => pinMessageOnClick(message)}
                  />
                </Tooltip>
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
              </div>
            </ListItem>
          ))}
        </List>
        <Input />
      </div>
    </div>
  );
};

export default Chat;
