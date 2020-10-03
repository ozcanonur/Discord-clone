import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ActiveUser from 'components/ActiveUser';
import Fade from '@material-ui/core/Fade';
import activeUsersStyles from './styles/activeUsers';

const useStyles = makeStyles(activeUsersStyles);

const ActiveUsers = () => {
  const classes = useStyles();

  const users = useSelector((state) => state.activeUsers);
  const usernames = users.map((user) => user.name);
  const activeUsersOpen = useSelector((state) => state.activeUsersOpen);

  return (
    <Fade in={activeUsersOpen} mountOnEnter unmountOnExit>
      <div className={classes.activeUsers}>
        <div className={classes.usersStatus}>{`Online - ${users.length}`}</div>
        {usernames.map((username, key) => (
          <ActiveUser key={key} name={username} />
        ))}
      </div>
    </Fade>
  );
};

export default ActiveUsers;
