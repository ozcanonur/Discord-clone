import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import AnnouncementRoundedIcon from '@material-ui/icons/AnnouncementRounded';
import qs from 'qs';

import { selectPrivateChannel as selectPrivateChannelIo } from '../../actions/socket';
import {
  selectPrivateChannel,
  selectPrivateUser,
  selectTabInPrivate,
  clearPrivateNotification,
} from '../../actions/react';
import privateUserStyles from './styles/privateUser';

const useStyles = makeStyles(privateUserStyles);

interface Props {
  username: string;
}

const PrivateUser = ({ username }: Props) => {
  const classes = useStyles();

  const { name }: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const selectedPrivateUser = useSelector((state: RootState) => state.selectedPrivateUser);
  const notifications = useSelector((state: RootState) => state.notifications);

  const dispatch = useDispatch();
  const selectPrivateChannelOnClick = (username: string) => {
    dispatch(selectPrivateChannel(username));
    dispatch(selectPrivateChannelIo(name, username));
    dispatch(selectPrivateUser(username));
    dispatch(selectTabInPrivate('Chat'));
    dispatch(clearPrivateNotification());
  };

  const messageNotification = notifications.find(
    (notification) =>
      notification.type === 'private' &&
      notification.from === username &&
      selectedPrivateUser !== username
  );

  return (
    <div
      className={classes.user}
      onClick={() => selectPrivateChannelOnClick(username)}
      style={{
        backgroundColor: selectedPrivateUser === username ? 'rgb(64, 67, 74)' : 'inherit',
      }}
    >
      <div className={classes.iconContainer}>
        <AccountCircleRoundedIcon className={classes.icon} />
      </div>
      <div className={classes.username}>{username}</div>
      {messageNotification ? (
        <AnnouncementRoundedIcon
          style={{
            height: '1.5rem',
            fill: 'rgba(220,221,222)',
          }}
        />
      ) : null}
    </div>
  );
};

export default PrivateUser;