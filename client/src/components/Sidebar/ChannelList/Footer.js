import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import IconButton from '@material-ui/core/IconButton';
import Mic from '@material-ui/icons/Mic';
import Headset from '@material-ui/icons/Headset';
import Settings from '@material-ui/icons/Settings';

const useStyles = makeStyles({
  footer: {
    height: '5vh',
    color: 'white',
    padding: '1rem',
    display: 'flex',
    backgroundColor: 'rgb(41,43,47)',
    alignItems: 'center',
  },
  icon: {
    display: 'inline-block',
    backgroundColor: '#3CB371',
    borderRadius: '50%',
    padding: '1.5rem',
    width: '1.5rem',
    height: '1.5rem',
  },
  user: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '2rem',
  },
  userName: {
    fontSize: '1.5rem',
    fontWeight: 1000,
  },
  userId: {
    fontSize: '1rem',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '3rem',
  },
  button: {
    color: 'white',
  },
  buttonIcon: {
    fontSize: '2rem',
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <div className={classes.icon} />
      <div className={classes.user}>
        <div className={classes.userName}>Onur</div>
        <div className={classes.userId}>#5421</div>
      </div>
      <div className={classes.buttons}>
        <IconButton className={classes.button}>
          <Mic className={classes.buttonIcon} />
        </IconButton>
        <IconButton className={classes.button}>
          <Headset className={classes.buttonIcon} />
        </IconButton>
        <IconButton className={classes.button}>
          <Settings className={classes.buttonIcon} />
        </IconButton>
      </div>
    </div>
  );
};

export default Footer;
