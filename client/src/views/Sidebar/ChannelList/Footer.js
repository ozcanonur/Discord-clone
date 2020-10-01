import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import qs from 'qs';

import Button from 'components/Button';
import Mic from '@material-ui/icons/Mic';
import Headset from '@material-ui/icons/Headset';
import Settings from '@material-ui/icons/Settings';

const useStyles = makeStyles({
  footer: {
    height: '6rem',
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
    marginLeft: '1.5rem',
  },
  userName: {
    fontSize: '1.5rem',
    fontWeight: 1000,
    color: 'rgb(220,221,222)',
  },
  userId: {
    fontSize: '1.1rem',
    color: 'rgb(185,187, 190)',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '2.5rem',
  },
});

const Footer = () => {
  const classes = useStyles();

  const { name } = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  return (
    <div className={classes.footer}>
      <div className={classes.icon} />
      <div className={classes.user}>
        <div className={classes.userName}>{name}</div>
        <div className={classes.userId}>#5421</div>
      </div>
      <div className={classes.buttons}>
        <Button>
          <Mic />
        </Button>
        <Button>
          <Headset />
        </Button>
        <Button>
          <Settings />
        </Button>
      </div>
    </div>
  );
};

export default Footer;
