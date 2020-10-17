import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

import { ReactComponent as PinLogo } from '../../../assets/office.svg';
import { deleteMessage, createPin } from '../../../actions/socket';
import chatStyles from '../styles/chat';

const useStyles = makeStyles(chatStyles);

interface Props {
  message: Message;
}

const MessageOptions = ({ message }: Props) => {
  const classes = useStyles();

  const { name } = useSelector((state: RootState) => state.user);
  const selectedChannel = useSelector((state: RootState) => state.selectedChannel);

  const dispatch = useDispatch();
  const deleteMessageOnClick = (message: Message) => {
    dispatch(deleteMessage(message));
  };

  const pinMessageOnClick = (message: Message) => {
    dispatch(createPin(message, selectedChannel));
  };

  return (
    <div className={classes.messageOptions}>
      <Tooltip
        enterDelay={0}
        placement='top'
        title='Pin message'
        classes={{ tooltip: classes.notificationTooltip }}
      >
        <PinLogo
          className={classes.optionIcon}
          style={{ marginRight: '0.5rem', height: '2rem', fill: '#dcddde' }}
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
  );
};

export default MessageOptions;
