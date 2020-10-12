import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import serverCardStyles from '../../styles/serverCard';
import qs from 'qs';

import { joinServer, selectChannel as selectChannelIo } from '../../../../../actions/socket';
import { selectServerName, selectChannel } from '../../../../../actions/react';

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
  };
  setModalOpen: (x: boolean) => void;
}

const ServerCard = ({ res, setModalOpen }: Props) => {
  const classes = useStyles();

  const { serverName, onlineUsers, totalUsers, channelCount, messageCount, img, description } = res;
  const { name }: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  const dispatch = useDispatch();
  const joinServerOnClick = () => {
    dispatch(joinServer(name, serverName));
    dispatch(selectServerName(serverName));
    dispatch(selectChannel({ _id: '', name: '', voice: false }));
    setModalOpen(false);
  };

  return (
    <div className={classes.container} onClick={joinServerOnClick}>
      <div className={classes.imgContainer}>
        <img src={img} className={classes.img} />
      </div>
      <div className={classes.bodyContainer}>
        <div className={classes.title}>{serverName}</div>
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
