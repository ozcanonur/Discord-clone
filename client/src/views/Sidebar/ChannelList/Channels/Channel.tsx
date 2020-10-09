import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VolumeUp from '@material-ui/icons/VolumeUp';
import Forum from '@material-ui/icons/Forum';
import { ReactComponent as PinLogo } from '../../../../office.svg';
import qs from 'qs';

import { selectChannel } from '../../../../actions/react';
import { selectChannel as selectChannelIo, deleteChannel } from '../../../../actions/socket';
import channelsStyles from '../styles/channels';
import ContextMenu from './ContextMenu';

const useStyles = makeStyles(channelsStyles);

interface ChannelProps {
  channel: Channel;
}

const Channel = ({ channel }: ChannelProps) => {
  const classes = useStyles();

  const { name }: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  const selectedChannel = useSelector((state: RootState) => state.selectedChannel);
  const notifications = useSelector((state: RootState) => state.notifications);

  const pinNotification = notifications.find(
    (notification) => notification.type === 'pin' && notification.channelId === channel._id
  );

  const dispatch = useDispatch();
  const selectChannelOnClick = (channel: Channel) => {
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
        <ListItemIcon>
          {channel.voice ? (
            <VolumeUp className={classes.icon} />
          ) : (
            <Forum className={classes.icon} />
          )}
        </ListItemIcon>
        <ListItemText primary={channel.name} className={classes.text} />
        {pinNotification ? (
          <PinLogo
            style={{
              height: '1.5rem',
              fill: 'rgba(255, 0,0, 0.3)',
            }}
          />
        ) : null}
      </ListItem>
      <ContextMenu channel={channel} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </div>
  );
};

export default Channel;
