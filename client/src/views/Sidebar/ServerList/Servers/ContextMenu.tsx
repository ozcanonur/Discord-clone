import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import OutsideClickHandler from 'react-outside-click-handler';
import qs from 'qs';

import { selectServerName, clearMessages } from '../../../../actions/react';
import { deleteServer } from '../../../../actions/socket';
import indexStyles from '../styles/index';
import ConfirmationModal from '../../../../components/ConfirmationModal';

const useStyles = makeStyles(indexStyles);

interface Props {
  server: Server;
  anchorEl: any;
  setAnchorEl: any;
}

const ContextMenu = ({ server, anchorEl, setAnchorEl }: Props) => {
  const classes = useStyles();

  const { name }: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const [modalOpen, setModalOpen] = useState(false);

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
          <MenuItem classes={{ root: classes.menuItem }} disableGutters>
            Create Channel Here
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
      <ConfirmationModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        itemName={server.name}
        confirmAction={() => deleteServerOnClick(server.name)}
      />
    </>
  );
};

export default ContextMenu;
