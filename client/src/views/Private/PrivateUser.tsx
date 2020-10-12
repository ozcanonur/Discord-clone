import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ReactComponent as DiscordIcon } from '../../assets/discordIcon.svg';
import AnnouncementRoundedIcon from '@material-ui/icons/AnnouncementRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import Button from '../../components/Button';
import qs from 'qs';

import {
  selectPrivateChannel as selectPrivateChannelIo,
  sendFriendRequest,
} from '../../actions/socket';
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
  isNotFriend?: boolean;
}

const PrivateUser = ({ username, isNotFriend }: Props) => {
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

  const addFriendOnClick = () => {
    dispatch(sendFriendRequest(name, username));
  };

  return (
    <div
      className={classes.user}
      onClick={() => selectPrivateChannelOnClick(username)}
      style={{
        backgroundColor: selectedPrivateUser === username ? '#40434a' : 'inherit',
      }}
    >
      <div className={classes.iconContainer}>
        <div style={{ display: 'flex', position: 'relative' }}>
          <DiscordIcon style={{ height: '2.4rem' }} />
        </div>
      </div>
      <div className={classes.username}>{username}</div>
      {isNotFriend ? (
        <Button onClick={addFriendOnClick} tooltipText='Add as friend' style={{ padding: 0 }}>
          <AddCircleRoundedIcon style={{ fontSize: '2rem' }} />
        </Button>
      ) : null}
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
