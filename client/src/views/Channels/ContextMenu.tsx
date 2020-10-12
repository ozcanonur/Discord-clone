import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import OutsideClickHandler from 'react-outside-click-handler';
import qs from 'qs';

import { clearMessages } from '../../actions/react';
import { deleteChannel } from '../../actions/socket';
import channelsStyles from './styles/channels';
import ConfirmationModal from '../../components/ConfirmationModal';

const useStyles = makeStyles(channelsStyles);

interface Props {
  channel: Channel;
  anchorEl: any;
  setAnchorEl: any;
}

const ContextMenu = ({ channel, anchorEl, setAnchorEl }: Props) => {
  const classes = useStyles();

  const { name }: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const selectedServerName = useSelector((state: RootState) => state.selectedServerName);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const deleteChannelOnClick = (channelId: string) => {
    dispatch(deleteChannel(name, channelId));
    dispatch(clearMessages());
    setAnchorEl(null);
  };

  return (
    <>
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
            disabled={selectedServerName === 'Default' || selectedServerName === 'Games'}
          >
            Delete Channel
          </MenuItem>
        </Menu>
      </OutsideClickHandler>
      <ConfirmationModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        itemName={channel.name}
        confirmAction={() => deleteChannelOnClick(channel._id)}
      />
    </>
  );
};

export default ContextMenu;
