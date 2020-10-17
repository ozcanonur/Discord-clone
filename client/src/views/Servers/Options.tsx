import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ExploreRoundedIcon from '@material-ui/icons/ExploreRounded';
import Add from '@material-ui/icons/Add';
import PeopleAlt from '@material-ui/icons/PeopleAlt';

import { selectServerName, selectChannel, clearMessages } from '../../actions/react';
import { selectChannel as selectChannelIo } from '../../actions/socket';
import ServerIcon from '../../components/ServerIcon';
import indexStyles from './styles/index';
import ServerModal from './Modals/ServerModal';
import ExploreModal from './Modals/ExploreModal';

const useStyles = makeStyles(indexStyles);

const Options = () => {
  const classes = useStyles();

  const servers = useSelector((state: RootState) => state.servers);
  const [addServerModalOpen, setAddServerModalOpen] = useState(false);
  const [exploreModalOpen, setExploreModalOpen] = useState(false);

  const dispatch = useDispatch();
  const selectServerOnClick = (serverName: string) => {
    dispatch(clearMessages());
    dispatch(selectServerName(serverName));
    if (serverName !== 'private') {
      const server = servers.find((server: Server) => server.name === serverName);
      if (server && server.channels.length > 0) {
        const firstChannel = server.channels[0];
        dispatch(selectChannel(firstChannel));
        dispatch(selectChannelIo(firstChannel));
      }
    }
  };

  return (
    <List className={classes.list}>
      <ListItem disableGutters className={classes.listItem}>
        <NavLink to='/private'>
          <ServerIcon
            onClick={() => selectServerOnClick('private')}
            privateRoute
            name='Friends / Private Messages'
          >
            <PeopleAlt style={{ color: '#dcddde' }} />
          </ServerIcon>
        </NavLink>
      </ListItem>
      <ListItem disableGutters className={classes.listItem}>
        <ServerIcon
          onClick={() => setAddServerModalOpen(true)}
          privateRoute={false}
          isOption={true}
          name='Add / Join Server'
        >
          <Add />
        </ServerIcon>
      </ListItem>
      <ListItem disableGutters className={classes.listItem}>
        <ServerIcon
          onClick={() => setExploreModalOpen(true)}
          privateRoute={false}
          isOption={true}
          name='Explore Servers'
        >
          <ExploreRoundedIcon />
        </ServerIcon>
      </ListItem>
      <ServerModal modalOpen={addServerModalOpen} setModalOpen={setAddServerModalOpen} />
      <ExploreModal modalOpen={exploreModalOpen} setModalOpen={setExploreModalOpen} />
    </List>
  );
};

export default Options;
