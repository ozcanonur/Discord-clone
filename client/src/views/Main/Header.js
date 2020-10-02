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
import headerStyles from './styles/header';

const useStyles = makeStyles(headerStyles);

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
              : `You don't have any notifications`
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
