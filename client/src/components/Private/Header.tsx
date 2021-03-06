import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import GitHubIcon from '@material-ui/icons/GitHub';
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';

import CustomButton from '../Misc/Button';
import headerStyles from './styles/header';
import { selectTabInPrivate, toggleActiveUsers } from 'actions/react';

const useStyles = makeStyles(headerStyles);

const Header = () => {
  const classes = useStyles();

  const selectedTabInPrivateName = useSelector((state: RootState) => state.selectedTabInPrivate);
  const activeUsersOpen = useSelector((state: RootState) => state.activeUsersOpen);

  const dispatch = useDispatch();

  const toggleActiveUsersOnClick = () => {
    dispatch(toggleActiveUsers());
  };

  const selectChatTab = () => {
    dispatch(selectTabInPrivate('Chat'));
  };

  const selectAddFriendTab = () => {
    dispatch(selectTabInPrivate('AddFriend'));
  };

  const chatTabStyles = {
    backgroundColor: selectedTabInPrivateName === 'Chat' ? '#dcddde' : 'transparent',
    color: selectedTabInPrivateName === 'Chat' ? '#36393f' : '#dcddde',
    border: selectedTabInPrivateName === 'Chat' ? '3px solid transparent' : '3px solid #202225',
  };

  const addFriendTabStyles = {
    backgroundColor: selectedTabInPrivateName === 'AddFriend' ? '#dcddde' : 'transparent',
    color: selectedTabInPrivateName === 'AddFriend' ? '#36393f' : '#43b581',
    border:
      selectedTabInPrivateName === 'AddFriend' ? '3px solid transparent' : '3px solid #43b581',
  };

  const openGithub = () => {
    window.open('https://github.com/ozcanonur/Discord-clone', '_blank');
  };

  return (
    <div className={classes.container}>
      <div className={classes.statusContainer}>
        <QuestionAnswerRoundedIcon className={classes.friendsIcon} />
        <div className={classes.friendsText}>Private Messages</div>
        <div className={classes.friendButtonContainer}>
          <Button
            variant='contained'
            className={classes.friendButton}
            onClick={selectChatTab}
            style={{
              backgroundColor: chatTabStyles.backgroundColor,
              color: chatTabStyles.color,
              border: chatTabStyles.border,
            }}
          >
            Chat
          </Button>
          <Button
            variant='contained'
            className={classes.friendButton}
            onClick={selectAddFriendTab}
            style={{
              backgroundColor: addFriendTabStyles.backgroundColor,
              color: addFriendTabStyles.color,
              border: addFriendTabStyles.border,
            }}
          >
            Add Friend
          </Button>
        </div>
      </div>
      <div className={classes.optionsContainer}>
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

        <CustomButton onClick={openGithub} tooltipText='GitHub'>
          <GitHubIcon />
        </CustomButton>
      </div>
    </div>
  );
};

export default Header;
