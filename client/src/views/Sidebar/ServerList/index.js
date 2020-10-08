import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Add from '@material-ui/icons/Add';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import qs from 'qs';

import { selectServerName, selectFriend, selectChannel } from '../../../actions/react';
import { selectChannel as selectChannelIo } from '../../../actions/socket';
import ServerIcon from '../../../components/ServerIcon';
import ServerModal from './ServerModal';
import indexStyles from './styles/index';

const useStyles = makeStyles(indexStyles);

const ServerList = () => {
  const classes = useStyles();

  const { name } = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const [modalOpen, setModalOpen] = useState(false);
  const servers = useSelector((state) => state.servers);

  const dispatch = useDispatch();
  const selectServerOnClick = (serverName) => {
    // Select the server
    dispatch(selectServerName(serverName));
    dispatch(selectFriend(''));
    // Select the first channel if at main route
    if (serverName !== 'private') {
      const server = servers.find((server) => server.name === serverName);
      const firstChannel = server.channels[0];
      dispatch(selectChannel(firstChannel));
      dispatch(selectChannelIo(name, firstChannel));
    }
  };

  return (
    <>
      <div className={classes.serverList}>
        <List className={classes.list}>
          <ListItem disableGutters className={classes.listItem}>
            <NavLink to={`/private?name=${name}`}>
              <Tooltip
                title='Friends / Private Messages'
                arrow
                placement='right'
                enterDelay={0}
                TransitionComponent={Zoom}
                classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
              >
                <div>
                  <ServerIcon onClick={() => selectServerOnClick('private')} privateRoute>
                    <PeopleAlt style={{ color: 'rgb(220,221,222)' }} />
                  </ServerIcon>
                </div>
              </Tooltip>
            </NavLink>
          </ListItem>
          <ListItem disableGutters className={classes.listItem}>
            <Tooltip
              title='Add / Join Server'
              arrow
              placement='right'
              enterDelay={0}
              classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
              TransitionComponent={Zoom}
            >
              <div>
                <ServerIcon onClick={() => setModalOpen(true)} privateRoute={false}>
                  <Add />
                </ServerIcon>
              </div>
            </Tooltip>
          </ListItem>
        </List>
        <List className={classes.list}>
          {servers.map((server, key) => (
            <NavLink key={key} to={`/main?name=${name}`} style={{ textDecoration: 'none' }}>
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
                    <ServerIcon
                      onClick={() => selectServerOnClick(server.name)}
                      privateRoute={false}
                    >
                      {server.name}
                    </ServerIcon>
                  </div>
                </Tooltip>
              </ListItem>
            </NavLink>
          ))}
        </List>
      </div>
      <ServerModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
};

export default ServerList;
