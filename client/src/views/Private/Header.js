import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import CustomButton from 'components/Button';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import GitHubIcon from '@material-ui/icons/GitHub';
import { selectTabInPrivate } from 'redux/actions/react';

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
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
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
    marginLeft: '2rem',
  },
  friendButtonContainer: {
    marginLeft: '3rem',
  },
  friendButton: {
    backgroundColor: 'transparent',
    color: 'rgb(220,221,222)',
    fontSize: '1.5rem',
    fontWeight: 1000,
    fontFamily: 'Lato, sans-serif',
    textTransform: 'capitalize',
    marginLeft: '2rem',
    boxShadow: 'none',

    '&:hover': {
      color: '#36393f',
    },
  },
  friendButtonAdd: {
    fontSize: '1.5rem',
    fontWeight: 1000,
    fontFamily: 'Lato, sans-serif',
    textTransform: 'capitalize',
    marginLeft: '2rem',
    color: 'white',
    boxShadow: 'none',

    '&:hover': {
      backgroundColor: '#2c8a5f',
    },
  },
  optionsContainer: {
    display: 'flex',
  },
});

const Header = () => {
  const classes = useStyles();

  const selectedTabInPrivateName = useSelector((state) => state.selectedTabInPrivate);

  const dispatch = useDispatch();
  const selectTabInPrivateOnClick = (tabName) => {
    dispatch(selectTabInPrivate(tabName));
  };

  const gitHubOnClick = () => {
    window.open('https://github.com/ozcanonur/Discord-clone', '_blank');
  };

  return (
    <div className={classes.headerContainer}>
      <div className={classes.statusContainer}>
        <EmojiPeopleIcon className={classes.friendsIcon} />
        <div className={classes.friendsText}>Friends</div>
        <div className={classes.friendButtonContainer}>
          <Button
            variant='contained'
            className={classes.friendButton}
            onClick={() => selectTabInPrivateOnClick('Chat')}
            style={{
              backgroundColor:
                selectedTabInPrivateName === 'Chat' ? 'rgb(220,221,222)' : 'transparent',
              color: selectedTabInPrivateName === 'Chat' ? '#36393f' : 'rgb(220,221,222)',
            }}
          >
            Chat
          </Button>
          <Button
            variant='contained'
            className={classes.friendButton}
            onClick={() => selectTabInPrivateOnClick('AddFriend')}
            style={{
              backgroundColor:
                selectedTabInPrivateName === 'AddFriend' ? 'rgb(220,221,222)' : 'transparent',
              color: selectedTabInPrivateName === 'AddFriend' ? '#36393f' : 'rgb(220,221,222)',
            }}
          >
            Add Friend
          </Button>
        </div>
      </div>
      <div className={classes.optionsContainer}>
        <CustomButton onClick={gitHubOnClick}>
          <GitHubIcon />
        </CustomButton>
      </div>
    </div>
  );
};

export default Header;
