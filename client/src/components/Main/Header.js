import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import Notifications from '@material-ui/icons/Notifications';
import Room from '@material-ui/icons/Room';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
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
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  titleIcon: {
    fontSize: '2rem',
  },
  titleText: {
    marginLeft: '1rem',
    fontSize: '1.5rem',
    fontWeight: 1000,
  },
  optionsContainer: {
    display: 'flex',
  },
  button: {
    color: 'rgb(220,221,222)',
  },
  buttonIcon: {
    fontSize: '2rem',
  },
  input: {},
});

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.headerContainer}>
      <div className={classes.titleContainer}>
        <div className={classes.titleIcon}>#</div>
        <div className={classes.titleText}>general</div>
      </div>
      <div className={classes.optionsContainer}>
        <IconButton className={classes.button}>
          <Notifications className={classes.buttonIcon} />
        </IconButton>
        <IconButton className={classes.button}>
          <Room className={classes.buttonIcon} />
        </IconButton>
        <IconButton className={classes.button}>
          <PeopleAlt className={classes.buttonIcon} />
        </IconButton>
        <IconButton className={classes.button}>
          <Inbox className={classes.buttonIcon} />
        </IconButton>
        <IconButton className={classes.button}>
          <Help className={classes.buttonIcon} style={{ color: '#3CB371' }} />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
