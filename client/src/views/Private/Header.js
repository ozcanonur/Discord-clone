import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import CustomButton from 'components/Button';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import GitHubIcon from '@material-ui/icons/GitHub';
import { selectTabInPrivate } from 'redux/actions/react';
import headerStyles from './styles/header';

const useStyles = makeStyles(headerStyles);

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
