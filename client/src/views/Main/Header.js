import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CustomButton from 'components/Button';
import Notifications from '@material-ui/icons/Notifications';
import Room from '@material-ui/icons/Room';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import SearchModal from 'components/SearchModal';
import { toggleActiveUsers, clearNotification } from 'redux/actions/react';
import GitHubIcon from '@material-ui/icons/GitHub';
import headerStyles from './styles/header';
import PinnedMessages from './PinnedMessages';

const useStyles = makeStyles(headerStyles);

const Header = () => {
  const classes = useStyles();

  const selectedChannel = useSelector((state) => state.selectedChannel);
  const userNotification = useSelector((state) => state.userNotification);
  const activeUsersOpen = useSelector((state) => state.activeUsersOpen);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);

  const dispatch = useDispatch();
  const toggleActiveUsersOnClick = () => {
    dispatch(toggleActiveUsers());
  };

  const handleNotificationClick = () => {
    dispatch(clearNotification());
  };

  const notificationTooltipText = userNotification.hasNotification
    ? `You have a new message from ${userNotification.from}!`
    : 'No notifications';

  return (
    <>
      <div className={classes.headerContainer}>
        <div className={classes.titleContainer}>
          <div className={classes.titleIcon}>{selectedChannel.name ? '#' : null}</div>
          <div className={classes.titleText}>{selectedChannel.name}</div>
        </div>
        <div className={classes.search} onClick={() => setSearchModalOpen(!searchModalOpen)}>
          <div className={classes.searchText}>Search</div>
        </div>
        <div className={classes.optionsContainer}>
          <CustomButton
            onClick={handleNotificationClick}
            tooltipText={notificationTooltipText}
            marginRight
          >
            <Notifications style={{ position: 'relative' }} />
            {userNotification.hasNotification ? (
              <div className={classes.notificationAlert} />
            ) : null}
          </CustomButton>
          <CustomButton
            tooltipText='Pinned Messages'
            marginRight
            onClick={() => setPinOpen(!pinOpen)}
            style={{ backgroundColor: pinOpen ? 'rgba(220, 221, 222, 0.2)' : 'inherit' }}
          >
            <Room />
          </CustomButton>
          <PinnedMessages pinOpen={pinOpen} />
          <CustomButton
            onClick={toggleActiveUsersOnClick}
            style={{
              backgroundColor: activeUsersOpen ? 'rgba(220,221,222,0.2)' : 'inherit',
            }}
            tooltipText='Toggle Active Users'
            marginRight
          >
            <PeopleAlt />
          </CustomButton>
          <CustomButton
            onClick={() => window.open('https://github.com/ozcanonur/Discord-clone', '_blank')}
            tooltipText='GitHub'
          >
            <GitHubIcon />
          </CustomButton>
        </div>
      </div>
      <SearchModal modalOpen={searchModalOpen} setModalOpen={setSearchModalOpen} />
    </>
  );
};

export default Header;
