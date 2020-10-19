import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ServerIcon from './ServerIcon';
import ContextMenu from './ContextMenu';
import { selectServerName, selectChannel, clearMessages } from '../../actions/react';
import { selectChannel as selectChannelIo } from '../../actions/socket';
import serversStyles from './styles/servers';

const useStyles = makeStyles(serversStyles);

const Servers = () => {
  const classes = useStyles();

  const servers = useSelector((state: RootState) => state.servers);

  const history = useHistory();
  const dispatch = useDispatch();

  const selectFirstChannelInServer = (server: Server) => {
    const firstChannel = server.channels[0];
    dispatch(selectChannel(firstChannel));
    dispatch(selectChannelIo(firstChannel));
  };

  const selectServerOnClick = (server: Server) => {
    // Clear the messages in case
    dispatch(clearMessages());
    dispatch(selectServerName(server.name));
    // Select the first channel if we can
    if (server.channels.length > 0) selectFirstChannelInServer(server);
    else dispatch(selectChannel({ _id: '', name: '', isVoice: false, voiceUsers: [] }));
    // Change route if coming from /private
    if (history.location.pathname === '/private') history.push('/main');
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openContextMenuOnClick = (e: any) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  return (
    <List className={classes.list}>
      {servers.map((server: Server, key) => (
        <div key={key} onContextMenu={(e) => openContextMenuOnClick(e)}>
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
      ))}
    </List>
  );
};

export default Servers;
