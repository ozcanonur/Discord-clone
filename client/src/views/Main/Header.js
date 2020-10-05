import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SearchModal from 'components/SearchModal';
import headerStyles from './styles/header';
import PinnedMessagesButton from './Header/PinnedMessagesButton';
import PrivateNotificationButton from './Header/PrivateNotificationButton';
import ActiveUsersButton from './Header/ActiveUsersButton';
import GithubButton from './Header/GithubButton';

const useStyles = makeStyles(headerStyles);

const Header = () => {
  const classes = useStyles();

  const selectedChannel = useSelector((state) => state.selectedChannel);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

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
          <PrivateNotificationButton />
          <PinnedMessagesButton />
          <ActiveUsersButton />
          <GithubButton />
        </div>
      </div>
      <SearchModal modalOpen={searchModalOpen} setModalOpen={setSearchModalOpen} />
    </>
  );
};

export default Header;
