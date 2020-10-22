import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItem from '@material-ui/core/ListItem';

import ContextMenu from './ContextMenu';
import ServerIcon from './ServerIcon';
import { selectServerName, selectChannel, clearMessages } from '../../actions/react';
import { selectChannel as selectChannelIo } from '../../actions/socket';
import serverStyles from './styles/server';

interface Props {
  server: Server;
}

const useStyles = makeStyles(serverStyles);

const Server = ({ server }: Props) => {
  const classes = useStyles();

  const selectedServerName = useSelector((state: RootState) => state.selectedServerName);

  const history = useHistory();
  const dispatch = useDispatch();

  const selectFirstChannelInServer = (server: Server) => {
    const firstChannel = server.channels[0];
    dispatch(selectChannel(firstChannel));
    dispatch(selectChannelIo(firstChannel));
  };

  const selectServerOnClick = (server: Server) => {
    // Don't reselect the same server
    if (selectedServerName === server.name) return;
    // Clear the messages in case
    dispatch(clearMessages());
    dispatch(selectServerName(server.name));
    // Select the first channel if we can
    if (server.channels.length > 0) selectFirstChannelInServer(server);
    else dispatch(selectChannel({ _id: '', name: '', isVoice: false, voiceUsers: [] }));
    // Change route if coming from /private
    if (history.location.pathname === '/private') history.push('/main');
  };

  const [anchorEl, setAnchorEl] = useState<any>(null);
  const openContextMenuOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  return (
    <div onContextMenu={(e) => openContextMenuOnClick(e)}>
      <ListItem disableGutters className={classes.listItem}>
        <div>
          <ServerIcon
            onClick={() => selectServerOnClick(server)}
            privateRoute={false}
            name={server.name}
          >
            {server.name}
          </ServerIcon>
        </div>
      </ListItem>
      <ContextMenu server={server} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </div>
  );
};

export default Server;
