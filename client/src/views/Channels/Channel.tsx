import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { ReactComponent as PinLogo } from '../../assets/office.svg';
import { selectChannel } from '../../actions/react';
import {
  selectChannel as selectChannelIo,
  selectVoiceChannel as selectVoiceChannelIo,
} from '../../actions/socket';
import channelsStyles from './styles/channels';
import ContextMenu from './ContextMenu';

import User from './User';

const useStyles = makeStyles(channelsStyles);

interface ChannelProps {
  channel: Channel;
  isVoice: boolean;
}

const Channel = ({ channel, isVoice }: ChannelProps) => {
  const classes = useStyles();

  const { name } = useSelector((state: RootState) => state.user);
  const selectedChannel = useSelector((state: RootState) => state.selectedChannel);
  const notifications = useSelector((state: RootState) => state.notifications);

  const pinNotification = notifications.find(
    (notification) => notification.type === 'pin' && notification.channelId === channel._id
  );

  const dispatch = useDispatch();
  const selectChannelOnClick = (channel: Channel) => {
    if (isVoice) {
      console.log(channel);
      // WOOP actually don't select channel, for testing now
      dispatch(selectChannel(channel));
      dispatch(selectVoiceChannelIo(name, channel));
    } else {
      dispatch(selectChannel(channel));
      dispatch(selectChannelIo(name, channel));
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openContextMenuOnClick = (e: any) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <div onContextMenu={(e) => openContextMenuOnClick(e)} style={{ width: '100%' }}>
        <ListItem
          button
          onClick={() => selectChannelOnClick(channel)}
          selected={selectedChannel.name === channel.name}
          classes={{ selected: classes.channelSelected, root: classes.channel }}
          disableGutters
        >
          <ListItemIcon style={{ minWidth: '3.5rem' }}>
            {channel.voice ? (
              <VolumeUp className={classes.icon} />
            ) : (
              <div className={classes.icon}>#</div>
            )}
          </ListItemIcon>
          <ListItemText primary={channel.name} className={classes.text} />
          {pinNotification ? (
            <PinLogo
              style={{
                height: '1.5rem',
                fill: 'rgb(220,221,222)',
              }}
            />
          ) : null}
        </ListItem>
        <ContextMenu channel={channel} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      </div>
      {isVoice && selectedChannel.voiceUsers.length > 0 ? (
        <div
          style={{ paddingLeft: '3rem', display: 'flex', flexDirection: 'column', width: '100%' }}
        >
          {selectedChannel.voiceUsers.map((u, key) => (
            <User key={key} name={u} />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default Channel;
