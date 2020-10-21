import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import OutsideClickHandler from 'react-outside-click-handler';

import { clearMessages, selectChannel } from '../../../actions/react';
import { deleteChannel, selectChannel as selectChannelIo } from '../../../actions/socket';
import channelsStyles from '../styles/channels';
import ConfirmationModal from '../../Misc/ConfirmationModal';

const useStyles = makeStyles(channelsStyles);

interface Props {
  channel: Channel;
  anchorEl: any;
  setAnchorEl: any;
}

const ChannelContextMenu = ({ channel, anchorEl, setAnchorEl }: Props) => {
  const classes = useStyles();

  const { id } = useSelector((state: RootState) => state.user);
  const servers = useSelector((state: RootState) => state.servers);
  const selectedServerName = useSelector((state: RootState) => state.selectedServerName);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  const selectedServer = servers.find((server) => server.name === selectedServerName) || {
    _id: '',
    name: '',
    channels: [],
    admin: '',
  };

  const deleteChannelOnClick = () => {
    dispatch(deleteChannel(channel._id));
    dispatch(clearMessages());
    const fallbackChannel = selectedServer.channels[0] || {
      _id: '',
      name: '',
      isVoice: false,
      voiceUsers: [],
    };
    dispatch(selectChannel(fallbackChannel));
    dispatch(selectChannelIo(fallbackChannel));
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openConfirmationModal = () => {
    setModalOpen(true);
  };

  return (
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
          onClick={openConfirmationModal}
          disabled={selectedServer.admin !== id}
        >
          Delete Channel
        </MenuItem>
      </Menu>
      <ConfirmationModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        itemName={channel.name}
        confirmAction={deleteChannelOnClick}
      />
    </OutsideClickHandler>
  );
};

export default ChannelContextMenu;
