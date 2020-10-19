import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import OutsideClickHandler from 'react-outside-click-handler';

import { selectServerName, clearMessages, selectChannel } from '../../actions/react';
import { deleteServer, leaveServer, selectChannel as selectChannelIo } from '../../actions/socket';
import ConfirmationModal from '../Misc/ConfirmationModal';
import ChannelCreateModal from '../Channels/Body/ChannelCreateModal';
import contextMenuStyles from './styles/contextMenu';
import { ensure } from '../../util';

const useStyles = makeStyles(contextMenuStyles);

interface Props {
  server: Server;
  anchorEl: any;
  setAnchorEl: any;
}

const ContextMenu = ({ server, anchorEl, setAnchorEl }: Props) => {
  const classes = useStyles();

  const { name, id } = useSelector((state: RootState) => state.user);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [createChannelModalOpen, setCreateChannelModalOpen] = useState(false);
  const servers = useSelector((state: RootState) => state.servers);
  const selectedServerName = useSelector((state: RootState) => state.selectedServerName);

  const selectedServer = servers.find((server) => server.name === selectedServerName) || {
    _id: '',
    name: '',
    channels: [],
    admin: '',
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openCreateChannelModal = () => {
    setCreateChannelModalOpen(true);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const dispatch = useDispatch();

  const deleteServerOnClick = () => {
    dispatch(deleteServer(name, server.name));
    dispatch(clearMessages());
    dispatch(selectServerName('Default'));
    setAnchorEl(null);
  };

  const stepBackToDefaultServer = () => {
    const defaultServer = ensure(servers.find((server) => server.name === 'Default'));
    const firstChannel = defaultServer.channels[0];
    dispatch(selectServerName(defaultServer.name));
    dispatch(selectChannel(firstChannel));
    dispatch(selectChannelIo(firstChannel));
  };

  const leaveServerOnClick = () => {
    if (server.name === 'Default') return console.log(`You can't leave the default server`);
    dispatch(leaveServer(server.name));
    // If the user was on the server deleted, step back to default server and channel
    if (selectedServerName === server.name) stepBackToDefaultServer();
  };

  return (
    <OutsideClickHandler onOutsideClick={handleClose}>
      <Menu
        id={server.name}
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
          onClick={openCreateChannelModal}
          disabled={selectedServer.admin !== id}
        >
          Create Channel Here
        </MenuItem>
        <MenuItem
          classes={{ root: classes.menuItem }}
          disableGutters
          onClick={leaveServerOnClick}
          disabled={server.name === 'Default'}
        >
          Leave Server
        </MenuItem>
        <MenuItem
          classes={{ root: classes.menuItemDelete }}
          disableGutters
          disabled={selectedServer.admin !== id}
          onClick={openDeleteModal}
        >
          Delete Server
        </MenuItem>
      </Menu>
      <ConfirmationModal
        modalOpen={deleteModalOpen}
        setModalOpen={setDeleteModalOpen}
        itemName={server.name}
        confirmAction={deleteServerOnClick}
      />
      <ChannelCreateModal
        modalOpen={createChannelModalOpen}
        setModalOpen={setCreateChannelModalOpen}
        selectedServer={selectedServer}
      />
    </OutsideClickHandler>
  );
};

export default ContextMenu;
