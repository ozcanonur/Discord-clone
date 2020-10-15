import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MicRoundedIcon from '@material-ui/icons/MicRounded';
import MicOffRoundedIcon from '@material-ui/icons/MicOffRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import VolumeOffRoundedIcon from '@material-ui/icons/VolumeOffRounded';
import { ReactComponent as DiscordIcon } from '../../assets/discordIcon.svg';

import Button from '../../components/Button';
import footerStyles from './styles/footer';

const useStyles = makeStyles(footerStyles);

const Footer = () => {
  const classes = useStyles();

  const { name } = useSelector((state: RootState) => state.user);
  const [micOpen, setMicOpen] = useState(true);
  const [soundOpen, setSoundOpen] = useState(true);

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
        <Button onClick={() => setMicOpen(!micOpen)}>
          {micOpen ? <MicRoundedIcon /> : <MicOffRoundedIcon />}
        </Button>
        <Button onClick={() => setSoundOpen(!soundOpen)}>
          {soundOpen ? <VolumeUpRoundedIcon /> : <VolumeOffRoundedIcon />}
        </Button>
      </div>
    </div>
  );
};

export default Footer;
