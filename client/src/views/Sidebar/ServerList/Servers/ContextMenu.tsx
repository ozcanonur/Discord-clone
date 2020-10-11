import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import OutsideClickHandler from 'react-outside-click-handler';
import qs from 'qs';

import { selectServerName, clearMessages } from '../../../../actions/react';
import { deleteServer } from '../../../../actions/socket';
import indexStyles from '../styles/index';
import ConfirmationModal from '../../../../components/ConfirmationModal';
import ChannelCreateModal from '../../ChannelList/Channels/ChannelCreateModal';

const useStyles = makeStyles(indexStyles);

interface Props {
  server: Server;
  anchorEl: any;
  setAnchorEl: any;
}

const ContextMenu = ({ server, anchorEl, setAnchorEl }: Props) => {
  const classes = useStyles();

  const { name }: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [createChannelModalOpen, setCreateChannelModalOpen] = useState(false);
  const servers = useSelector((state: RootState) => state.servers);
  const selectedServerName = useSelector((state: RootState) => state.selectedServerName);

  const selectedServer = servers.find((server) => server.name === selectedServerName) || {
    _id: '',
    name: '',
    channels: [],
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const deleteServerOnClick = (serverName: string) => {
    dispatch(deleteServer(name, serverName));
    dispatch(clearMessages());
    dispatch(selectServerName('Default'));
    setAnchorEl(null);
  };

  return (
    <>
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
            onClick={() => setCreateChannelModalOpen(true)}
          >
            Create Channel Here
          </MenuItem>
          <MenuItem
            classes={{ root: classes.menuItem }}
            disableGutters
            disabled={server.name === 'Default' || server.name === 'Games'}
            onClick={() => setDeleteModalOpen(true)}
          >
            Delete Server
          </MenuItem>
        </Menu>
      </OutsideClickHandler>
      <ConfirmationModal
        modalOpen={deleteModalOpen}
        setModalOpen={setDeleteModalOpen}
        itemName={server.name}
        confirmAction={() => deleteServerOnClick(server.name)}
      />
      <ChannelCreateModal
        modalOpen={createChannelModalOpen}
        setModalOpen={setCreateChannelModalOpen}
        selectedServer={selectedServer}
      />
    </>
  );
};

export default ContextMenu;
