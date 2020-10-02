import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ActiveUser from 'components/ActiveUser';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles({
  activeUsers: {
    width: '27rem',
    backgroundColor: 'rgb(47,49,54)',
    padding: '3rem',
  },
  usersStatus: {
    color: 'rgb(142,146,151)',
    fontSize: '1.3rem',
  },
});

const ActiveUsers = () => {
  const classes = useStyles();

  const users = useSelector((state) => state.activeUsers);
  const usernames = users.map((user) => user.name);
  const activeUsersOpen = useSelector((state) => state.activeUsersOpen);

  return (
    <Fade in={activeUsersOpen}>
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
