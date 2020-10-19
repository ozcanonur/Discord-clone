import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Peer from 'peerjs';
import useSound from 'use-sound';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ChannelContextMenu from './ChannelContextMenu';
import { selectChannel } from '../../../actions/react';
import { selectChannel as selectChannelIo } from '../../../actions/socket';
import { ReactComponent as PinLogo } from '../../../assets/office.svg';
import leaveSound from '../../../assets/discord-leave.mp3';

import channelsStyles from '../styles/channels';

const useStyles = makeStyles(channelsStyles);

interface ChannelProps {
  channel: Channel;
  isVoice: boolean | undefined;
  selectedServer: Server;
}

const Channel = ({ channel }: ChannelProps) => {
  const classes = useStyles();

  const selectedChannel = useSelector((state: RootState) => state.selectedChannel);
  const notifications = useSelector((state: RootState) => state.notifications);
  const peer: Peer = useSelector((state: RootState) => state.peer);
  const [playLeaveSound] = useSound(leaveSound);

  const pinNotification = notifications.find(
    (notification) => notification.type === 'pin' && notification.channelId === channel._id
  );

  const dispatch = useDispatch();

  const selectChannelOnClick = () => {
    // If previous channel was a voice channel
    if (selectedChannel.isVoice) {
      playLeaveSound();
      // Destroy the peer instance
      peer.destroy();
      // Remove all audio html elements
      const audios = document.getElementsByTagName('audio');
      while (audios[0]) {
        audios[0].parentNode?.removeChild(audios[0]);
      }
    }
    dispatch(selectChannel(channel));
    dispatch(selectChannelIo(channel));
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openContextMenu = (e: any) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  return (
    <div className={classes.channelContainer} onContextMenu={(e) => openContextMenu(e)}>
      <ListItem
        button
        onClick={selectChannelOnClick}
        selected={selectedChannel.name === channel.name}
        classes={{ selected: classes.channelSelected, root: classes.channel }}
        disableGutters
      >
        <ListItemIcon className={classes.listItemIcon}>
          <div className={classes.icon}>#</div>
        </ListItemIcon>
        <ListItemText primary={channel.name} className={classes.text} />
        {pinNotification ? <PinLogo className={classes.pinLogo} /> : null}
      </ListItem>
      <ChannelContextMenu channel={channel} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </div>
  );
};

export default Channel;
