import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import qs from 'qs';

import { selectUserChannel as selectUserChannelIo } from '../../actions/socket';
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

  const dispatch = useDispatch();
  const selectPrivateChannelOnClick = (username: string) => {
    dispatch(selectPrivateChannel(username));
    dispatch(selectUserChannelIo(name, username));
    dispatch(selectPrivateUser(username));
    dispatch(selectTabInPrivate('Chat'));
    dispatch(clearPrivateNotification());
  };

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
    </div>
  );
};

export default PrivateUser;
