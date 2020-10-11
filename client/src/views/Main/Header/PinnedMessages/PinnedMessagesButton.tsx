import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ReactComponent as PinLogo } from '../../../../assets/office.svg';

import PinnedMessages from './PinnedMessages';
import CustomButton from '../../../../components/Button';
import { clearPinNotification } from '../../../../actions/react';
import headerStyles from '../../styles/header';

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

  return (
    <>
      <CustomButton
        tooltipText='Pinned Messages'
        marginRight
        onClick={() => {
          setPinOpen(!pinOpen);
          dispatch(clearPinNotification(selectedChannel));
        }}
        style={{ backgroundColor: pinOpen ? 'rgba(220, 221, 222, 0.2)' : 'inherit' }}
      >
        <PinLogo style={{ fill: 'rgb(220,221,222)', height: '2rem' }} />
        {pinNotification ? <div className={classes.notificationAlert} /> : null}
      </CustomButton>
      <PinnedMessages pinOpen={pinOpen} />
    </>
  );
};

export default PinnedMessagesButton;
