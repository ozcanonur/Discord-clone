import React from 'react';
import { useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import serverCardStyles from '../styles/serverCard';
import axios from 'axios';

import { joinServer } from '../../../actions/socket';
import { selectServerName, selectChannel, addPinNotification } from '../../../actions/react';

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

const ServerCard = ({ res, setModalOpen }: Props) => {
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
  const joinServerOnClick = async () => {
    dispatch(joinServer(serverName));
    dispatch(selectServerName(serverName));
    dispatch(selectChannel({ _id: '', name: '', isVoice: false, voiceUsers: [] }));
    setModalOpen(false);

    const response = await axios.get('/channelIds', {
      params: { serverName },
    });

    response.data.forEach((id: string) => {
      dispatch(addPinNotification('pin', id));
    });
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

export default ServerCard;
