import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import qs from 'qs';

import { selectFriendChannel as selectFriendChannelIo } from '../../actions/socket';
import {
  selectFriendChannel,
  selectFriend,
  selectTabInPrivate,
  clearPrivateNotification,
} from '../../actions/react';
import friendStyles from './styles/friend';

const useStyles = makeStyles(friendStyles);

interface Props {
  friendName: string;
}

const Friend = ({ friendName }: Props) => {
  const classes = useStyles();

  const { name }: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const selectedFriend = useSelector((state: RootState) => state.selectedFriend);

  const dispatch = useDispatch();
  const selectFriendChannelOnClick = (friendName: string) => {
    dispatch(selectFriendChannel(friendName));
    dispatch(selectFriendChannelIo(name, friendName));
    dispatch(selectFriend(friendName));
    dispatch(selectTabInPrivate('Chat'));
    dispatch(clearPrivateNotification());
  };

  return (
    <div
      className={classes.user}
      onClick={() => selectFriendChannelOnClick(friendName)}
      style={{ backgroundColor: selectedFriend === friendName ? 'rgb(64, 67, 74)' : 'inherit' }}
    >
      <div className={classes.iconContainer}>
        <AccountCircleRoundedIcon className={classes.icon} />
      </div>
      <div className={classes.username}>{friendName}</div>
    </div>
  );
};

export default Friend;
