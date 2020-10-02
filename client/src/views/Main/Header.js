import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from 'components/Button';

import Notifications from '@material-ui/icons/Notifications';
import Room from '@material-ui/icons/Room';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import Inbox from '@material-ui/icons/Inbox';
import Help from '@material-ui/icons/Help';
import { toggleActiveUsers } from 'redux/actions/react';

const useStyles = makeStyles({
  headerContainer: {
    height: '6rem',
    backgroundColor: '#36393f',
    color: 'white',
    fontSize: '2rem',
    padding: '1rem  2rem',
    borderBottom: '2px solid rgb(32,34,37)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  titleIcon: {
    fontSize: '2rem',
    color: 'rgb(220,221,222)',
  },
  titleText: {
    marginLeft: '1rem',
    fontSize: '1.5rem',
    fontWeight: 1000,
    color: 'rgb(220,221,222)',
  },
  optionsContainer: {
    display: 'flex',
  },
});

const Header = () => {
  const classes = useStyles();
  const selectedChannel = useSelector((state) => state.selectedChannel);

  const dispatch = useDispatch();
  const toggleActiveUsersOnClick = () => {
    dispatch(toggleActiveUsers());
  };

  const activeUsersOpen = useSelector((state) => state.activeUsersOpen);

  return (
    <div className={classes.headerContainer}>
      <div className={classes.titleContainer}>
        <div className={classes.titleIcon}>#</div>
        <div className={classes.titleText}>{selectedChannel.name}</div>
      </div>
      <div className={classes.optionsContainer}>
        <Button>
          <Notifications />
        </Button>
        <Button>
          <Room />
        </Button>
        <Button
          onClick={toggleActiveUsersOnClick}
          style={{
            backgroundColor: activeUsersOpen ? 'rgba(220,221,222,0.2)' : 'inherit',
          }}
        >
          <PeopleAlt />
        </Button>
        <Button>
          <Inbox />
        </Button>
        <Button>
          <Help />
        </Button>
      </div>
    </div>
  );
};

export default Header;
