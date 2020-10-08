import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

import Friend from './Friend';
import Footer from '../Sidebar/ChannelList/Footer';
import friendListStyles from './styles/friendList';
import SearchModal from '../../components/SearchModal';

const useStyles = makeStyles(friendListStyles);

const FriendList = () => {
  const classes = useStyles();

  const friends = useSelector((state) => state.friends);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.subContainer}>
        <div className={classes.heading} onClick={() => setSearchModalOpen(!searchModalOpen)}>
          <div className={classes.headingText}>Search</div>
        </div>
        <div className={classes.titleContainer}>
          <EmojiPeopleIcon className={classes.friendsIcon} />
          <div className={classes.friendsText}>Friends</div>
          <EmojiPeopleIcon className={classes.friendsIcon} style={{ visibility: 'hidden' }} />
        </div>
        <div className={classes.friendList}>
          <div className={classes.directMessages}>Direct messages</div>
          {friends.map((friend, key) => (
            <Friend key={key} friendName={friend} />
          ))}
        </div>
      </div>
      <SearchModal modalOpen={searchModalOpen} setModalOpen={setSearchModalOpen} />
      <Footer />
    </div>
  );
};

export default FriendList;
