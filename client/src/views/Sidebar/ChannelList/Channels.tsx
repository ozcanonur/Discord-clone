/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VolumeUp from '@material-ui/icons/VolumeUp';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Forum from '@material-ui/icons/Forum';
import Add from '@material-ui/icons/Add';
import Room from '@material-ui/icons/Room';
import IconButton from '@material-ui/core/IconButton';
import qs from 'qs';

import { selectChannel } from '../../../actions/react';
import { selectChannel as selectChannelIo } from '../../../actions/socket';
import ChannelCreateModal from './ChannelCreateModal';
import channelsStyles from './styles/channels';

const useStyles = makeStyles(channelsStyles);

interface Props {
  channels: Channel[];
  voice: boolean;
}

const Channels = ({ channels, voice }: Props) => {
  const classes = useStyles();

  const { name }: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const servers = useSelector((state: RootState) => state.servers);
  const selectedServerName = useSelector((state: RootState) => state.selectedServerName);
  const selectedChannel = useSelector((state: RootState) => state.selectedChannel);
  const notifications = useSelector((state: RootState) => state.notifications);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const selectChannelOnClick = (channel: Channel) => {
    dispatch(selectChannel(channel));
    dispatch(selectChannelIo(name, channel));
  };

  const selectedServer = servers.find((server) => server.name === selectedServerName) || {
    channels: [],
  };

  return (
    <>
      <div className={classes.category}>
        <div className={classes.categoryDescription}>
          <IconButton className={classes.iconButton}>
            <KeyboardArrowRight className={classes.categoryIcon} />
          </IconButton>
          <div className={classes.categoryText}>{voice ? 'Voice channels' : 'Text channels'}</div>
          <IconButton className={classes.iconButton} onClick={() => setModalOpen(true)}>
            <Add className={classes.categoryIcon} />
          </IconButton>
        </div>
        <ChannelCreateModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          selectedServer={selectedServer}
        />
        {channels.length > 0 ? (
          <List className={classes.channelList}>
            {channels.map((channel: Channel, key: number) => {
              const pinNotification = notifications.find(
                (notification) =>
                  notification.type === 'pin' && notification.channelId === channel._id
              );
              return (
                <ListItem
                  key={key}
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
                  {pinNotification ? <Room style={{ color: 'rgba(255, 0,0, 0.3)' }} /> : null}
                </ListItem>
              );
            })}
          </List>
        ) : null}
      </div>
    </>
  );
};

export default Channels;
