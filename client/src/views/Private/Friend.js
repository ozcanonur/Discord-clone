import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFriendChannel, selectFriend, selectTabInPrivate } from 'redux/actions/react';
import { selectFriendChannel as selectFriendChannelIo } from 'redux/actions/socket';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import makeStyles from '@material-ui/core/styles/makeStyles';
import qs from 'qs';
import friendStyles from './styles/friend';

const useStyles = makeStyles(friendStyles);

const Friend = ({ friendName }) => {
  const classes = useStyles();

  const selectedFriend = useSelector((state) => state.selectedFriend);

  const { name } = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  const dispatch = useDispatch();
  const selectFriendChannelOnClick = (friendName) => {
    dispatch(selectFriendChannel(friendName));
    dispatch(selectFriendChannelIo(name, friendName));
    dispatch(selectFriend(friendName));
    dispatch(selectTabInPrivate('Chat'));
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
