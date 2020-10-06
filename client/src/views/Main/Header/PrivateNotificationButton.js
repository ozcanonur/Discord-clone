import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CustomButton from 'components/Button';
import Notifications from '@material-ui/icons/Notifications';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { clearPrivateNotification } from 'redux/actions/react';
import headerStyles from '../styles/header';

const useStyles = makeStyles(headerStyles);

const PrivateNotificationButton = () => {
  const classes = useStyles();

  const notifications = useSelector((state) => state.notifications);

  const dispatch = useDispatch();
  const privateMessageNotificationOnClick = () => {
    dispatch(clearPrivateNotification());
  };

  const privateMessageNotifications = notifications
    .filter((notification) => notification.type === 'private')
    .map((notification) => `You have a new message from ${notification.from}!\n`);

  return (
    <CustomButton
      onClick={privateMessageNotificationOnClick}
      tooltipText={
        privateMessageNotifications.length > 0 ? (
          <List>
            {privateMessageNotifications.map((e, key) => (
              <ListItem key={key} disableGutters>
                {e}
              </ListItem>
            ))}
          </List>
        ) : (
          'No notifications'
        )
      }
      marginRight
    >
      <Notifications style={{ position: 'relative' }} />
      {privateMessageNotifications.length > 0 ? (
        <div className={classes.notificationAlert} />
      ) : null}
    </CustomButton>
  );
};

export default PrivateNotificationButton;