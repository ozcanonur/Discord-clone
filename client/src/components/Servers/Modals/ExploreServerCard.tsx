import React from 'react';
import { useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import axios from 'axios';

import { joinServer } from '../../../actions/socket';
import { selectServerName, selectChannel, addPinNotifications } from '../../../actions/react';
import serverCardStyles from '../styles/serverCard';

const useStyles = makeStyles(serverCardStyles);

interface Props {
  res: {
    serverName: string;
    onlineUsers: number;
    totalUsers: number;
    channelCount: number;
    messageCount: number;
    img: string;
    description: string;
    subscribed: boolean;
  };
  setModalOpen: (x: boolean) => void;
}

const ExploreServerCard = ({ res, setModalOpen }: Props) => {
  const classes = useStyles();

  const {
    serverName,
    onlineUsers,
    totalUsers,
    channelCount,
    messageCount,
    img,
    description,
    subscribed,
  } = res;

  const dispatch = useDispatch();

  // Get pin notifications if any exists on the channels
  const getPinNotifications = async () => {
    const response = await axios.get('/channelIds', {
      params: { serverName },
      withCredentials: true,
    });

    dispatch(addPinNotifications('pin', response.data));
  };

  const joinServerOnClick = async () => {
    dispatch(joinServer(serverName));
    dispatch(selectServerName(serverName));
    dispatch(selectChannel({ _id: '', name: '', isVoice: false, voiceUsers: [] }));
    setModalOpen(false);

    await getPinNotifications();
  };

  return (
    <div
      className={classes.container}
      onClick={joinServerOnClick}
      style={{ border: subscribed ? '2px solid green' : 'none' }}
    >
      <div className={classes.imgContainer}>
        <img src={img} className={classes.img} alt='server' />
      </div>
      <div className={classes.bodyContainer}>
        <div className={classes.title}>
          <span>{serverName}</span>
          {subscribed ? (
            <span className={classes.subscribedText}>(Already in this server)</span>
          ) : null}
        </div>
        <div className={classes.description}>{description}</div>
        <div className={classes.footer}>
          <div className={classes.online}>
            <div className={classes.smallIcon} />
            <div>{`${onlineUsers} Online, ${totalUsers} Members`}</div>
          </div>
          <div className={classes.messageCount}>
            <div className={classes.smallIcon2} />
            <div>{`${channelCount} Channels, ${messageCount} Messages`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreServerCard;
