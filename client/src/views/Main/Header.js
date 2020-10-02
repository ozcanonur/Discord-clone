import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from 'components/Button';
import Notifications from '@material-ui/icons/Notifications';
import Room from '@material-ui/icons/Room';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import { toggleActiveUsers, clearNotification } from 'redux/actions/react';
import Tooltip from '@material-ui/core/Tooltip';
import GitHubIcon from '@material-ui/icons/GitHub';

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
  notificationAlert: {
    position: 'absolute',
    backgroundColor: 'red',
    bottom: '20%',
    right: '20%',
    borderRadius: '50%',
    height: '1rem',
    width: '1rem',
  },
  notificationTooltip: {
    backgroundColor: 'rgb(32,34,37)',
    color: 'rgb(220,221,222)',
    fontSize: '1.5rem',
    fontWeight: 500,
    textAlign: 'center',
  },
});

const Header = () => {
  const classes = useStyles();
  const selectedChannel = useSelector((state) => state.selectedChannel);
  const userNotification = useSelector((state) => state.userNotification);
  const activeUsersOpen = useSelector((state) => state.activeUsersOpen);

  const dispatch = useDispatch();
  const toggleActiveUsersOnClick = () => {
    dispatch(toggleActiveUsers());
  };

  const handleNotificationClick = () => {
    dispatch(clearNotification());
  };

  const gitHubOnClick = () => {
    window.open('https://github.com/ozcanonur/Discord-clone', '_blank');
  };

  return (
    <div className={classes.headerContainer}>
      <div className={classes.titleContainer}>
        <div className={classes.titleIcon}>#</div>
        <div className={classes.titleText}>{selectedChannel.name}</div>
      </div>
      <div className={classes.optionsContainer}>
        <Tooltip
          title={
            userNotification.hasNotification
              ? `You have a new message from ${userNotification.from}!`
              : ''
          }
          classes={{ tooltip: classes.notificationTooltip }}
        >
          <div style={{ marginRight: '2rem' }}>
            <Button onClick={handleNotificationClick}>
              <Notifications style={{ position: 'relative' }} />
              {userNotification.hasNotification ? (
                <div className={classes.notificationAlert} />
              ) : null}
            </Button>
          </div>
        </Tooltip>
        <Button style={{ marginRight: '2rem' }}>
          <Room />
        </Button>
        <Button
          onClick={toggleActiveUsersOnClick}
          style={{
            backgroundColor: activeUsersOpen ? 'rgba(220,221,222,0.2)' : 'inherit',
            marginRight: '2rem',
          }}
        >
          <PeopleAlt />
        </Button>
        <Button onClick={gitHubOnClick}>
          <GitHubIcon />
        </Button>
      </div>
    </div>
  );
};

export default Header;
