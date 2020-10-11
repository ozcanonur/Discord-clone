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

import { selectServerName, selectChannel, clearMessages } from '../../../../actions/react';
import { selectChannel as selectChannelIo } from '../../../../actions/socket';
import ServerIcon from '../../../../components/ServerIcon';
import indexStyles from '../styles/index';
import ServerModal from './Modals/ServerModal';

const useStyles = makeStyles(indexStyles);

const SecondaryButtons = () => {
  const classes = useStyles();

  const { name }: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const servers = useSelector((state: RootState) => state.servers);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const selectServerOnClick = (serverName: string) => {
    dispatch(clearMessages());
    dispatch(selectServerName(serverName));
    if (serverName !== 'private') {
      const server = servers.find((server: Server) => server.name === serverName);
      if (server && server.channels.length > 0) {
        const firstChannel = server.channels[0];
        dispatch(selectChannel(firstChannel));
        dispatch(selectChannelIo(name, firstChannel));
      }
    }
  };

  return (
    <>
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
      <ServerModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
};

export default SecondaryButtons;