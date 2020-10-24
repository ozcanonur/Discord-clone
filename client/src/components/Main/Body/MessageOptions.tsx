import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

import { ReactComponent as PinLogo } from 'assets/office.svg';
import { deleteMessage, createPin } from 'actions/socket';
import messageOptionsStyles from '../styles/messageOptions';

const useStyles = makeStyles(messageOptionsStyles);

interface Props {
  message: Message;
  disablePin?: boolean;
}

const MessageOptions = ({ message, disablePin }: Props) => {
  const classes = useStyles();

  const { name } = useSelector((state: RootState) => state.user);
  const selectedChannel = useSelector((state: RootState) => state.selectedChannel);

  const dispatch = useDispatch();

  const deleteMessageOnClick = () => {
    dispatch(deleteMessage(message));
  };

  const pinMessageOnClick = () => {
    dispatch(createPin(message, selectedChannel));
  };

  return (
    <div className={classes.container}>
      {message.username === name ? (
        <Tooltip
          enterDelay={0}
          placement='top'
          title='Delete message'
          classes={{ tooltip: classes.notificationTooltip }}
        >
          <DeleteForeverRoundedIcon className={classes.optionIcon} onClick={deleteMessageOnClick} />
        </Tooltip>
      ) : null}
      {!disablePin ? (
        <Tooltip
          enterDelay={0}
          placement='top'
          title='Pin message'
          classes={{ tooltip: classes.notificationTooltip }}
        >
          <PinLogo
            className={`${classes.optionIcon} ${classes.pinLogo}`}
            onClick={pinMessageOnClick}
          />
        </Tooltip>
      ) : null}
    </div>
  );
};

export default MessageOptions;
