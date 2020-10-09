import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import OutsideClickHandler from 'react-outside-click-handler';
import ListItem from '@material-ui/core/ListItem';
import qs from 'qs';

import { selectServerName, selectChannel, clearMessages } from '../../../actions/react';
import { selectChannel as selectChannelIo, deleteServer } from '../../../actions/socket';
import ServerIcon from '../../../components/ServerIcon';
import indexStyles from './styles/index';
import ConfirmationModal from '../../../components/ConfirmationModal';

const useStyles = makeStyles(indexStyles);

interface Props {
  server: Server;
}

const ServerItem = ({ server }: Props) => {
  const classes = useStyles();

  const { name }: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const selectServerOnClick = (server: Server) => {
    // Clear the messages first
    dispatch(clearMessages());
    // Select the server
    dispatch(selectServerName(server.name));
    // Select the first channel if at main route
    if (server.channels.length > 0) {
      const firstChannel = server.channels[0];
      dispatch(selectChannel(firstChannel));
      dispatch(selectChannelIo(name, firstChannel));
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openContextMenuOnClick = (e: any) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteServerOnClick = (serverName: string) => {
    dispatch(deleteServer(name, serverName));
    setAnchorEl(null);
  };

  return (
    <>
      <div onContextMenu={(e) => openContextMenuOnClick(e)}>
        <NavLink to={`/main?name=${name}`} style={{ textDecoration: 'none' }}>
          <ListItem disableGutters className={classes.listItem}>
            <Tooltip
              title={server.name}
              arrow
              placement='right'
              enterDelay={0}
              TransitionComponent={Zoom}
              classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
            >
              <div>
                <ServerIcon onClick={() => selectServerOnClick(server)} privateRoute={false}>
                  {server.name}
                </ServerIcon>
              </div>
            </Tooltip>
          </ListItem>
        </NavLink>
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
            <MenuItem classes={{ root: classes.menuItem }} disableGutters>
              Create Channel
            </MenuItem>
            <MenuItem
              classes={{ root: classes.menuItem }}
              disableGutters
              disabled={server.name === 'Default' || server.name === 'Games'}
              onClick={() => setModalOpen(true)}
            >
              Delete Server
            </MenuItem>
          </Menu>
        </OutsideClickHandler>
      </div>
      <ConfirmationModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        itemName={server.name}
        confirmAction={() => deleteServerOnClick(server.name)}
      />
    </>
  );
};

const Servers = () => {
  const classes = useStyles();

  const servers = useSelector((state: RootState) => state.servers);

  return (
    <List className={classes.list}>
      {servers.map((server, key) => (
        <ServerItem key={key} server={server} />
      ))}
    </List>
  );
};

export default Servers;
