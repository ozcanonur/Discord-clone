import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import activeUsersStyles from './styles/activeUsers';
import ActiveUser from '../../components/ActiveUser';

const useStyles = makeStyles(activeUsersStyles);

const ActiveUsers = () => {
  const classes = useStyles();

  const users = useSelector((state) => state.activeUsers);
  const usernames = users.map((user) => user.name);
  const activeUsersOpen = useSelector((state) => state.activeUsersOpen);

  return (
    <Fade in={activeUsersOpen} mountOnEnter unmountOnExit>
      <List className={classes.activeUsers}>
        <ListItem disableGutters className={classes.usersStatus}>
          {`Online - ${users.length}`}
        </ListItem>
        {usernames.map((username, key) => (
          <ListItem key={key} disableGutters className={classes.listItem}>
            <ActiveUser name={username} />
          </ListItem>
        ))}
      </List>
    </Fade>
  );
};

export default ActiveUsers;
