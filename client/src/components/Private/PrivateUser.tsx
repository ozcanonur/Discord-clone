import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ReactComponent as DiscordIcon } from '../../assets/discordIcon.svg';
import AnnouncementRoundedIcon from '@material-ui/icons/AnnouncementRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';

import Button from '../Misc/Button';
import {
  selectPrivateChannel as selectPrivateChannelIo,
  sendFriendRequest,
  removeFriend,
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
  isFriend?: boolean;
}

const PrivateUser = ({ username, isFriend }: Props) => {
  const classes = useStyles();

  const selectedPrivateUser = useSelector((state: RootState) => state.selectedPrivateUser);
  const notifications = useSelector((state: RootState) => state.notifications);

  const dispatch = useDispatch();

  const messageNotification = notifications.find(
    (notification) =>
      notification.type === 'private' &&
      notification.from === username &&
      selectedPrivateUser !== username
  );

  const addFriendOnClick = () => {
    dispatch(sendFriendRequest(username));
  };

  const removeFriendOnClick = () => {
    dispatch(removeFriend(username));
  };

  const selectPrivateChannelOnClick = () => {
    dispatch(selectPrivateChannel(username));
    dispatch(selectPrivateChannelIo(username));
    dispatch(selectPrivateUser(username));
    dispatch(selectTabInPrivate('Chat'));
    dispatch(clearPrivateNotification());
  };

  return (
    <div
      className={classes.user}
      onClick={selectPrivateChannelOnClick}
      style={{
        backgroundColor: selectedPrivateUser === username ? '#40434a' : 'inherit',
      }}
    >
      <div className={classes.iconContainer}>
        <div className={classes.discordIconContainer}>
          <DiscordIcon className={classes.discordIcon} />
        </div>
      </div>
      <div className={classes.username}>{username}</div>
      {isFriend ? (
        <Button onClick={removeFriendOnClick} tooltipText='Remove friend' style={{ padding: 0 }}>
          <RemoveCircleRoundedIcon className={classes.icon} />
        </Button>
      ) : (
        <Button onClick={addFriendOnClick} tooltipText='Add friend' style={{ padding: 0 }}>
          <AddCircleRoundedIcon className={classes.icon} />
        </Button>
      )}
      {messageNotification ? (
        <AnnouncementRoundedIcon className={classes.messageNotification} />
      ) : null}
    </div>
  );
};

export default PrivateUser;
