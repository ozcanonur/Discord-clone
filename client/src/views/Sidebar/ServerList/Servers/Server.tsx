import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import ListItem from '@material-ui/core/ListItem';
import qs from 'qs';

import { selectServerName, selectChannel, clearMessages } from '../../../../actions/react';
import { selectChannel as selectChannelIo } from '../../../../actions/socket';
import ServerIcon from '../../../../components/ServerIcon';
import ContextMenu from './ContextMenu';
import indexStyles from '../styles/index';

const useStyles = makeStyles(indexStyles);

interface Props {
  server: Server;
}

const Server = ({ server }: Props) => {
  const classes = useStyles();

  const { name }: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  const dispatch = useDispatch();
  const selectServerOnClick = (server: Server) => {
    dispatch(clearMessages());
    dispatch(selectServerName(server.name));
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

  return (
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
      <ContextMenu server={server} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </div>
  );
};

export default Server;
