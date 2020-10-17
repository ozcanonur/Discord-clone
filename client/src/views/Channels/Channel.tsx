import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { ReactComponent as PinLogo } from '../../assets/office.svg';

import { selectChannel } from '../../actions/react';
import { selectChannel as selectChannelIo } from '../../actions/socket';
import channelsStyles from './styles/channels';
import ContextMenu from './ContextMenu';
import useSound from 'use-sound';
import leaveSound from '../../assets/discord-leave.mp3';
import Peer from 'peerjs';

const useStyles = makeStyles(channelsStyles);

interface ChannelProps {
  channel: Channel;
  isVoice: boolean;
  selectedServer: Server;
}

const Channel = ({ channel }: ChannelProps) => {
  const classes = useStyles();

  const { name } = useSelector((state: RootState) => state.user);
  const selectedChannel = useSelector((state: RootState) => state.selectedChannel);
  const notifications = useSelector((state: RootState) => state.notifications);
  const peer: Peer = useSelector((state: RootState) => state.peer);
  const [playLeaveSound] = useSound(leaveSound);

  const pinNotification = notifications.find(
    (notification) => notification.type === 'pin' && notification.channelId === channel._id
  );

  const dispatch = useDispatch();
  const selectChannelOnClick = (channel: Channel) => {
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
    dispatch(selectChannelIo(name, channel));
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openContextMenuOnClick = (e: any) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  return (
    <div onContextMenu={(e) => openContextMenuOnClick(e)} style={{ width: '100%' }}>
      <ListItem
        button
        onClick={() => selectChannelOnClick(channel)}
        selected={selectedChannel.name === channel.name}
        classes={{ selected: classes.channelSelected, root: classes.channel }}
        disableGutters
      >
        <ListItemIcon className={classes.listItemIcon}>
          <VolumeUp className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary={channel.name} className={classes.text} />
        {pinNotification ? <PinLogo className={classes.pinLogo} /> : null}
      </ListItem>
      <ContextMenu channel={channel} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </div>
  );
};

export default Channel;
