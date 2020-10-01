import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import ActiveUser from 'components/ActiveUser';

const useStyles = makeStyles({
  container: {
    height: '100vh',
    backgroundColor: 'rgb(47,49,54)',
    color: 'white',
    fontSize: '2rem',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    backgroundColor: 'rgb(32,34,37)',
    padding: '1rem',
    height: '6rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    fontSize: '1.6rem',
    color: 'rgb(220,221,222)',
    opacity: 0.7,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '2rem',
    paddingBottom: 0,
  },
  friendsIcon: {
    fontSize: '3rem',
    color: 'rgb(220,221,222)',
    opacity: 0.7,
  },
  friendsText: {
    fontSize: '1.5rem',
    fontWeight: 1000,
    color: 'rgb(220,221,222)',
    marginLeft: '1rem',
  },
  friendList: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
  },
  directMessages: {
    fontSize: '1.3rem',
    color: 'rgb(220,221,222)',
    opacity: 0.7,
    textTransform: 'uppercase',
  },
});

const FriendList = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <div className={classes.headingText}>Start a conversation</div>
      </div>
      <div className={classes.titleContainer}>
        <EmojiPeopleIcon className={classes.friendsIcon} />
        <div className={classes.friendsText}>Friends</div>
      </div>
      <div className={classes.friendList}>
        <div className={classes.directMessages}>Direct messages</div>
        <ActiveUser name='Onur' />
        <ActiveUser name='Mahmut' />
        <ActiveUser name='Komeneyare' />
      </div>
    </div>
  );
};

export default FriendList;
