import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import OutsideClickHandler from 'react-outside-click-handler';

import PinnedMessages from './PinnedMessages';
import CustomButton from 'components/Misc/Button';
import { clearPinNotification } from 'actions/react';
import { ReactComponent as PinLogo } from 'assets/office.svg';
import headerStyles from '../styles/header';

const useStyles = makeStyles(headerStyles);

const PinnedMessagesButton = () => {
  const classes = useStyles();

  const selectedChannel = useSelector((state: RootState) => state.selectedChannel);
  const notifications = useSelector((state: RootState) => state.notifications);

  const [pinOpen, setPinOpen] = useState(false);

  const dispatch = useDispatch();
  const pinNotification = notifications.find(
    (notification: Notification) =>
      notification.type === 'pin' && notification.channelId === selectedChannel._id
  );

  const closePins = () => {
    setPinOpen(false);
  };

  const togglePins = () => {
    setPinOpen(!pinOpen);
    dispatch(clearPinNotification(selectedChannel));
  };

  return (
    <>
      <CustomButton
        tooltipText='Pinned Messages'
        marginRight
        onClick={togglePins}
        style={{ backgroundColor: pinOpen ? 'rgba(220, 221, 222, 0.2)' : 'inherit' }}
      >
        <PinLogo className={classes.pinLogo} />
        {pinNotification ? <div className={classes.notificationAlert} /> : null}
      </CustomButton>
      <OutsideClickHandler onOutsideClick={closePins}>
        <PinnedMessages pinOpen={pinOpen} />
      </OutsideClickHandler>
    </>
  );
};

export default PinnedMessagesButton;
