import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ExploreRoundedIcon from '@material-ui/icons/ExploreRounded';
import Add from '@material-ui/icons/Add';
import PeopleAlt from '@material-ui/icons/PeopleAlt';

import ServerIcon from './ServerIcon';
import ServerModal from './Modals/ServerModalsIndex';
import ExploreModal from './Modals/ExploreModal';
import { selectServerName, clearMessages, selectPrivateUser } from '../../actions/react';
import optionsStyles from './styles/options';

const useStyles = makeStyles(optionsStyles);

const Options = () => {
  const classes = useStyles();

  const [addServerModalOpen, setAddServerModalOpen] = useState(false);
  const [exploreModalOpen, setExploreModalOpen] = useState(false);

  const dispatch = useDispatch();
  const selectPrivateRouteOnClick = () => {
    dispatch(clearMessages());
    dispatch(selectServerName('private'));
    dispatch(selectPrivateUser(''));
  };

  const openAddServerModal = () => {
    setAddServerModalOpen(true);
  };

  const openExploreModal = () => {
    setExploreModalOpen(true);
  };

  return (
    <List className={classes.list}>
      <ListItem disableGutters className={classes.listItem}>
        <NavLink to='/private'>
          <ServerIcon
            onClick={selectPrivateRouteOnClick}
            privateRoute
            name='Friends / Private Messages'
          >
            <PeopleAlt className={classes.friendsIcon} />
          </ServerIcon>
        </NavLink>
      </ListItem>
      <ListItem disableGutters className={classes.listItem}>
        <ServerIcon
          onClick={openAddServerModal}
          privateRoute={false}
          isOption={true}
          name='Add / Join Server'
        >
          <Add />
        </ServerIcon>
      </ListItem>
      <ListItem disableGutters className={classes.listItem}>
        <ServerIcon
          onClick={openExploreModal}
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
