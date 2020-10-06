import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMessage } from 'redux/actions/socket';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import qs from 'qs';
import Zoom from '@material-ui/core/Zoom';
import ListItem from '@material-ui/core/ListItem';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RoomIcon from '@material-ui/icons/Room';
import Message from 'components/Message';
import Tooltip from '@material-ui/core/Tooltip';
import Input from 'components/Input';
import chatStyles from './styles/chat';

const useStyles = makeStyles(chatStyles);

const Chat = () => {
  const classes = useStyles();

  const { name } = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const messages = useSelector((state) => state.messages);

  // Scroll messages to bottom on change
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);

  const dispatch = useDispatch();
  const deleteMessageOnClick = (message) => {
    dispatch(deleteMessage(name, message));
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
                  TransitionComponent={Zoom}
                  classes={{ tooltip: classes.notificationTooltip }}
                >
                  <RoomIcon className={classes.optionIcon} style={{ marginRight: '0.5rem' }} />
                </Tooltip>
                <Tooltip
                  enterDelay={0}
                  placement='top'
                  title='Delete message'
                  TransitionComponent={Zoom}
                  classes={{ tooltip: classes.notificationTooltip }}
                >
                  <DeleteForeverIcon
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
