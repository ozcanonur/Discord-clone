import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import activeUsersStyles from '../styles/activeUsers';
import ActiveUser from './ActiveUser';

const useStyles = makeStyles(activeUsersStyles);

const ActiveUsers = () => {
  const classes = useStyles();

  const usernames = useSelector((state: RootState) => state.activeUsers);
  const activeUsersOpen = useSelector((state: RootState) => state.activeUsersOpen);

  return (
    <Fade in={activeUsersOpen} mountOnEnter unmountOnExit>
      <List className={classes.activeUsers}>
        <ListItem disableGutters className={classes.usersStatus}>
          {`Online - ${usernames.length}`}
        </ListItem>
        {usernames.map((username: string, key) => (
          <ListItem key={key} disableGutters className={classes.listItem}>
            <ActiveUser name={username} />
          </ListItem>
        ))}
      </List>
    </Fade>
  );
};

export default ActiveUsers;
