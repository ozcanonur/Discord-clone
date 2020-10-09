/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import { ReactComponent as PinLogo } from '../../office.svg';
import qs from 'qs';

import Message from '../../components/Message';
import Input from '../../components/Input';
import chatStyles from './styles/chat';
import { deleteMessage, createPin } from '../../actions/socket';

const useStyles = makeStyles(chatStyles);

const Chat = () => {
  const classes = useStyles();

  const { name }: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const messages = useSelector((state: RootState) => state.messages);
  const selectedChannel = useSelector((state: RootState) => state.selectedChannel);
  const selectedServerName = useSelector((state: RootState) => state.selectedServerName);

  // Scroll messages to bottom on change
  const scrollRef = useRef<any>(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);

  const dispatch = useDispatch();
  const deleteMessageOnClick = (message: Message) => {
    dispatch(deleteMessage(name, message));
  };

  const pinMessageOnClick = (message: Message) => {
    dispatch(createPin(message.username, message.message, selectedChannel));
  };

  return (
    <div className={classes.container}>
      {selectedServerName === '' ? (
        <div className={classes.warning}>Select a server!</div>
      ) : selectedChannel.name === '' ? (
        <div className={classes.warning}>Select a channel!</div>
      ) : (
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
                    <PinLogo
                      className={classes.optionIcon}
                      style={{ marginRight: '0.5rem', height: '2rem', fill: 'rgb(220,221,222)' }}
                      onClick={() => pinMessageOnClick(message)}
                    />
                  </Tooltip>
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
        </div>
      )}
    </div>
  );
};

export default Chat;
