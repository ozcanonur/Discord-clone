import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import CustomButton from 'components/Button';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Inbox from '@material-ui/icons/Inbox';
import Help from '@material-ui/icons/Help';

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
    marginLeft: '1rem',
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
    backgroundColor: 'rgb(67,181,129)',
    color: 'white',

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

  return (
    <div className={classes.headerContainer}>
      <div className={classes.statusContainer}>
        <EmojiPeopleIcon className={classes.friendsIcon} />
        <div className={classes.friendsText}>Friends</div>
        <div className={classes.friendButtonContainer}>
          <Button variant='contained' className={classes.friendButton}>
            Online
          </Button>
          <Button variant='contained' className={classes.friendButton}>
            Pending
          </Button>
          <Button variant='contained' className={classes.friendButtonAdd}>
            Add Friend
          </Button>
        </div>
      </div>
      <div className={classes.optionsContainer}>
        <CustomButton>
          <Inbox />
        </CustomButton>
        <CustomButton>
          <Help />
        </CustomButton>
      </div>
    </div>
  );
};

export default Header;
