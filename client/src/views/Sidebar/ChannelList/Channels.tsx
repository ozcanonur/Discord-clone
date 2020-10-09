import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VolumeUp from '@material-ui/icons/VolumeUp';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import OutsideClickHandler from 'react-outside-click-handler';
import Forum from '@material-ui/icons/Forum';
import Add from '@material-ui/icons/Add';
import { ReactComponent as PinLogo } from '../../../office.svg';
import IconButton from '@material-ui/core/IconButton';
import qs from 'qs';

import { selectChannel, clearMessages } from '../../../actions/react';
import { selectChannel as selectChannelIo, deleteChannel } from '../../../actions/socket';
import ChannelCreateModal from './ChannelCreateModal';
import channelsStyles from './styles/channels';
import ConfirmationModal from '../../../components/ConfirmationModal';

const useStyles = makeStyles(channelsStyles);

interface ChannelProps {
  channel: Channel;
}

const Channel = ({ channel }: ChannelProps) => {
  const classes = useStyles();

  const { name }: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const selectedChannel = useSelector((state: RootState) => state.selectedChannel);
  const notifications = useSelector((state: RootState) => state.notifications);
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteChannelOnClick = (channelId: string) => {
    dispatch(deleteChannel(name, channelId));
    dispatch(clearMessages());
    setAnchorEl(null);
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
        <OutsideClickHandler onOutsideClick={handleClose}>
          <Menu
            id={channel.name}
            classes={{ paper: classes.menuPaper, list: classes.menuList }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            getContentAnchorEl={null}
          >
            <MenuItem
              classes={{ root: classes.menuItem }}
              disableGutters
              onClick={() => setModalOpen(true)}
            >
              Delete Channel
            </MenuItem>
          </Menu>
        </OutsideClickHandler>
      </div>
      <ConfirmationModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        itemName={channel.name}
        confirmAction={() => deleteChannelOnClick(channel._id)}
      />
    </>
  );
};

interface Props {
  channels: Channel[];
  voice: boolean;
}

const Channels = ({ channels, voice }: Props) => {
  const classes = useStyles();

  const servers = useSelector((state: RootState) => state.servers);
  const selectedServerName = useSelector((state: RootState) => state.selectedServerName);
  const [modalOpen, setModalOpen] = useState(false);

  const selectedServer = servers.find((server) => server.name === selectedServerName) || {
    _id: '',
    name: '',
    channels: [],
  };

  return (
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
          {channels.map((channel: Channel, key: number) => (
            <Channel key={key} channel={channel} />
          ))}
        </List>
      ) : null}
    </div>
  );
};

export default Channels;
