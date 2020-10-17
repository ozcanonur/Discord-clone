import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';

import PrivateUser from './PrivateUser';
import Footer from '../Channels/Footer';
import SearchModal from '../Main/Header/SearchModal';
import privateUserListStyles from './styles/privateUserList';

const useStyles = makeStyles(privateUserListStyles);

const PrivateUserList = () => {
  const classes = useStyles();

  const privateUsers = useSelector((state: RootState) => state.privateUsers);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const friends = privateUsers.filter((user) => user.isFriend);
  const otherUsers = privateUsers.filter((user) => !user.isFriend);

  return (
    <div className={classes.container}>
      <div className={classes.subContainer} style={{ maxHeight: '50vh' }}>
        <div className={classes.heading} onClick={() => setSearchModalOpen(!searchModalOpen)}>
          <div className={classes.headingText}>Search</div>
        </div>
        <div className={classes.titleContainer}>
          <EmojiPeopleIcon className={classes.usersIcon} />
          <div className={classes.usersText}>{`Friends (${friends.length})`}</div>
          <EmojiPeopleIcon className={classes.usersIcon} style={{ visibility: 'hidden' }} />
        </div>
        <div className={classes.userList}>
          <div className={classes.directMessages}>Direct messages</div>
          {friends.map(({ name }, key: number) => (
            <PrivateUser key={key} username={name} />
          ))}
        </div>
      </div>
      <div className={classes.subContainer} style={{ borderTop: '4px solid #202225' }}>
        <div className={classes.titleContainer}>
          <GroupRoundedIcon className={classes.usersIcon} />
          <div className={classes.usersText}>{`Other users (${otherUsers.length})`}</div>
          <GroupRoundedIcon className={classes.usersIcon} style={{ visibility: 'hidden' }} />
        </div>
        <div className={classes.userList}>
          <div className={classes.directMessages}>Direct messages</div>
          {otherUsers.map(({ name }, key: number) => (
            <PrivateUser key={key} username={name} isNotFriend />
          ))}
        </div>
      </div>
      <SearchModal modalOpen={searchModalOpen} setModalOpen={setSearchModalOpen} />
      <Footer />
    </div>
  );
};

export default PrivateUserList;
