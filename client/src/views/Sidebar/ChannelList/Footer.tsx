import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Mic from '@material-ui/icons/Mic';
import Headset from '@material-ui/icons/Headset';
import Settings from '@material-ui/icons/Settings';
import { ReactComponent as DiscordIcon } from '../../../assets/discordIcon.svg';
import qs from 'qs';

import Button from '../../../components/Button';
import footerStyles from './styles/footer';

const useStyles = makeStyles(footerStyles);

const Footer = () => {
  const classes = useStyles();

  const { name }: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  return (
    <div className={classes.footer}>
      <div className={classes.iconContainer}>
        <div style={{ display: 'flex', position: 'relative' }}>
          <DiscordIcon style={{ height: '2.4rem' }} />
          <div className={classes.onlineCircle} />
        </div>
      </div>
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
