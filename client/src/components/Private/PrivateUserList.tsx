import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import partition from 'lodash/partition';

import PrivateUser from './PrivateUser';
import Footer from '../Channels/Footer';
import SearchModal from '../Main/Header/SearchModal';
import privateUserListStyles from './styles/privateUserList';

const useStyles = makeStyles(privateUserListStyles);

const PrivateUserList = () => {
  const classes = useStyles();

  const privateUsers = useSelector((state: RootState) => state.privateUsers);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const [friends, otherUsers] = partition(privateUsers, { isFriend: true });

  const toggleSearchModal = () => {
    setSearchModalOpen(!searchModalOpen);
  };

  return (
    <div className={classes.container}>
      <SearchModal modalOpen={searchModalOpen} setModalOpen={setSearchModalOpen} />
      <div className={classes.heading} onClick={toggleSearchModal}>
        <div className={classes.headingText}>Search</div>
      </div>
      <div className={classes.list}>
        <div className={classes.subContainer}>
          <div className={classes.titleContainer}>
            <EmojiPeopleIcon className={classes.usersIcon} />
            <div className={classes.usersText}>{`Friends (${friends.length})`}</div>
          </div>
          <div className={classes.directMessages}>Direct messages</div>
          <div className={classes.userList}>
            {friends.map(({ name }, key) => (
              <PrivateUser key={key} username={name} isFriend />
            ))}
          </div>
        </div>
        <div className={`${classes.subContainer} ${classes.otherSubContainer}`}>
          <div className={classes.titleContainer}>
            <GroupRoundedIcon className={classes.usersIcon} />
            <div className={classes.usersText}>{`Other users (${otherUsers.length})`}</div>
          </div>
          <div className={classes.directMessages}>Direct messages</div>
          <div className={classes.userList}>
            {otherUsers.map(({ name }, key) => (
              <PrivateUser key={key} username={name} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivateUserList;
