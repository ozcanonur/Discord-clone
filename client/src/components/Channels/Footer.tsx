import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MicRoundedIcon from '@material-ui/icons/MicRounded';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import MicOffRoundedIcon from '@material-ui/icons/MicOffRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import VolumeOffRoundedIcon from '@material-ui/icons/VolumeOffRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { ReactComponent as DiscordIcon } from '../../assets/discordIcon.svg';
import Button from '../Misc/Button';
import footerStyles from './styles/footer';

const useStyles = makeStyles(footerStyles);

const Footer = () => {
  const classes = useStyles();

  const { name, id } = useSelector((state: RootState) => state.user);
  const [micOpen, setMicOpen] = useState(true);
  const [soundOpen, setSoundOpen] = useState(true);

  const history = useHistory();

  const logoutOnClick = async () => {
    try {
      await axios.post('/logout', {}, { withCredentials: true });
      history.push('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const toggleMic = () => {
    // @ts-ignore
    const streams = window.streams;
    if (streams) {
      streams.forEach((stream: MediaStream) => {
        stream.getAudioTracks()[0].enabled = !micOpen;
      });
    }
    setMicOpen(!micOpen);
  };

  const toggleSound = () => {
    const audios = document.getElementsByTagName('audio');
    for (let audio of audios) {
      audio.muted = soundOpen;
    }

    setSoundOpen(!soundOpen);
  };

  return (
    <div className={classes.container}>
      <div className={classes.iconContainer}>
        <div className={classes.discordIconContainer}>
          <DiscordIcon className={classes.discordIcon} />
          <div className={classes.onlineCircle} />
        </div>
      </div>
      <div className={classes.user}>
        <div className={classes.userName}>{name}</div>
        <div className={classes.userId}>{`#${id?.slice(-5)}`}</div>
      </div>
      <div className={classes.buttons}>
        <Tooltip
          enterDelay={0}
          title={micOpen ? 'Mute' : 'Unmute'}
          TransitionComponent={Zoom}
          classes={{ tooltip: classes.notificationTooltip }}
        >
          <div>
            <Button onClick={toggleMic}>
              {micOpen ? <MicRoundedIcon /> : <MicOffRoundedIcon />}
            </Button>
          </div>
        </Tooltip>
        <Tooltip
          enterDelay={0}
          title={micOpen ? 'Deafen' : 'Undeafen'}
          TransitionComponent={Zoom}
          classes={{ tooltip: classes.notificationTooltip }}
        >
          <div>
            <Button onClick={toggleSound}>
              {soundOpen ? <VolumeUpRoundedIcon /> : <VolumeOffRoundedIcon />}
            </Button>
          </div>
        </Tooltip>
        <Tooltip
          enterDelay={0}
          title='Log out'
          TransitionComponent={Zoom}
          classes={{ tooltip: classes.notificationTooltip }}
        >
          <div>
            <Button onClick={logoutOnClick}>
              <ExitToAppIcon />
            </Button>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Footer;
