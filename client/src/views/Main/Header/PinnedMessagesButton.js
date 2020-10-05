import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CustomButton from 'components/Button';
import Room from '@material-ui/icons/Room';
import { clearPinNotification } from 'redux/actions/react';
import headerStyles from '../styles/header';
import PinnedMessages from '../PinnedMessages';

const useStyles = makeStyles(headerStyles);

const PinnedMessagesButton = () => {
  const classes = useStyles();

  const selectedChannel = useSelector((state) => state.selectedChannel);
  const notifications = useSelector((state) => state.notifications);

  const [pinOpen, setPinOpen] = useState(false);

  const dispatch = useDispatch();
  const pinNotification = notifications.find(
    (notification) =>
      notification.type === 'pin' && notification.channel._id === selectedChannel._id
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
        <Room />
        {pinNotification ? <div className={classes.notificationAlert} /> : null}
      </CustomButton>
      <PinnedMessages pinOpen={pinOpen} />
    </>
  );
};

export default PinnedMessagesButton;
