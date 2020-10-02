import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Friend from './Friend';
import Footer from '../Sidebar/ChannelList/Footer';
import friendListStyles from './styles/friendList';

const useStyles = makeStyles(friendListStyles);

const FriendList = () => {
  const classes = useStyles();

  const friends = useSelector((state) => state.friends);

  return (
    <div className={classes.container}>
      <div className={classes.subContainer}>
        <div className={classes.heading}>
          <div className={classes.headingText}>Start a conversation</div>
        </div>
        <div className={classes.titleContainer}>
          <EmojiPeopleIcon className={classes.friendsIcon} />
          <div className={classes.friendsText}>Friends</div>
          <EmojiPeopleIcon className={classes.friendsIcon} style={{ visibility: 'hidden' }} />
        </div>
        <div className={classes.friendList}>
          <div className={classes.directMessages}>Direct messages</div>
          {friends.map((friend, key) => (
            <Friend key={key} friendName={friend.name} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FriendList;
